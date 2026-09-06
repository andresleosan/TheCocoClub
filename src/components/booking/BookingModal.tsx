import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { StepServices } from './StepServices'
import { StepDateTime } from './StepDateTime'
import { BEVERAGE_UNDECIDED, StepClientInfo } from './StepClientInfo'
import type { ClientErrors } from './StepClientInfo'
import { StepConfirmation } from './StepConfirmation'
import { SERVICES_DATA } from '../../data/services'
import { STUDIO_INFO } from '../../data/studioInfo'
import { Booking, ServiceAddOn, ServiceItem } from '../../types'
import { addBooking, getStoredBookings } from '../../utils/storage'
import { formatDuration, formatPrice } from '../../utils/formatters'

/**
 * The booking flow — rebuilt as a REQUEST, because that is all it has ever been.
 *
 * `addBooking()` writes to the visitor's own localStorage. Nothing is sent anywhere. The only
 * thing that actually reaches the studio is the WhatsApp message composed on the last step, so
 * every heading, button and status here says request, asking, awaiting — never "confirmed",
 * "booked" or "registered", and new rows are written with status 'pending'.
 *
 * The dialog itself is now the shared Modal primitive. The hand-rolled overlay it replaces had
 * no role="dialog", no aria-modal, no Escape, no focus trap, no focus restore and no scroll
 * lock, and it rendered inline rather than through a portal. It also stacked three scroll
 * containers — max-h-72 on the treatments, max-h-48 on the add-ons, max-h-[68vh] on the body —
 * so a phone user scrolled a list inside a list inside a page. Modal scrolls once, in the body,
 * and keeps the header and the footer reachable at any height.
 */

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  preSelectedService?: ServiceItem | null
  onBookingCreated?: (booking: Booking) => void
}

type Step = 1 | 2 | 3 | 4

const STEPS: { id: Step; label: string }[] = [
  { id: 1, label: 'Treatment' },
  { id: 2, label: 'Day & time' },
  { id: 3, label: 'Details' },
]

/** The submit button lives in the modal footer, outside the form, and is tied to it by id. */
const FORM_ID = 'booking-request-form'

/** No I, O, 0 or 1 — a reference gets read out over the phone. */
const REFERENCE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

const randomToken = (length: number): string => {
  const values = new Uint32Array(length)
  const source = globalThis.crypto
  if (source?.getRandomValues) {
    source.getRandomValues(values)
  } else {
    for (let i = 0; i < length; i += 1) values[i] = Math.floor(Math.random() * 0xffffffff)
  }
  return Array.from(values, (value) => REFERENCE_ALPHABET[value % REFERENCE_ALPHABET.length]).join('')
}

/**
 * The old generator drew four random digits, which collide in practice long before the studio
 * runs out of clients — and two requests sharing a reference means the wrong appointment gets
 * discussed. Five unambiguous characters, checked against what is already stored.
 */
const createReference = (taken: ReadonlySet<string>): string => {
  const year = new Date().getFullYear()
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidate = `CC-${year}-${randomToken(5)}`
    if (!taken.has(candidate)) return candidate
  }
  return `CC-${year}-${Date.now().toString(36).toUpperCase()}`
}

/** `bk-${Date.now()}` repeats if two requests land in the same millisecond. */
const createId = (): string =>
  globalThis.crypto?.randomUUID ? `bk-${globalThis.crypto.randomUUID()}` : `bk-${Date.now().toString(36)}-${randomToken(6)}`

const validateClient = (name: string, phone: string, email: string): ClientErrors => {
  const errors: ClientErrors = {}
  if (name.trim().length < 2) errors.name = 'Please tell the studio what to call you.'
  if (phone.replace(/\D/g, '').length < 7)
    errors.phone = 'A mobile number the studio can reply to.'
  if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = 'That address looks incomplete — correct it, or leave it blank.'
  return errors
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedService = null,
  onBookingCreated,
}) => {
  const [step, setStep] = useState<Step>(1)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    preSelectedService ?? SERVICES_DATA[0] ?? null,
  )
  const [selectedAddOns, setSelectedAddOns] = useState<ServiceAddOn[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [dateTimeError, setDateTimeError] = useState<string | null>(null)
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [beveragePreference, setBeveragePreference] = useState(BEVERAGE_UNDECIDED)
  const [notes, setNotes] = useState('')
  const [showClientErrors, setShowClientErrors] = useState(false)
  const [request, setRequest] = useState<Booking | null>(null)

  const headingId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (preSelectedService) setSelectedService(preSelectedService)
  }, [preSelectedService])

  // The step swaps the whole panel out. Without this the keyboard stays on the footer button
  // and a screen reader is never told what it is now looking at.
  useEffect(() => {
    if (isOpen) panelRef.current?.focus()
  }, [isOpen, step])

  const totalPrice =
    (selectedService?.price ?? 0) + selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)
  const totalDuration =
    (selectedService?.durationMinutes ?? 0) +
    selectedAddOns.reduce((sum, addon) => sum + addon.durationMinutes, 0)

  const clientErrors = useMemo(
    () => validateClient(clientName, clientPhone, clientEmail),
    [clientName, clientPhone, clientEmail],
  )

  const handleToggleAddOn = useCallback((addon: ServiceAddOn) => {
    setSelectedAddOns((current) =>
      current.some((a) => a.id === addon.id)
        ? current.filter((a) => a.id !== addon.id)
        : [...current, addon],
    )
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    // The dialog unmounts on close, so the rewind is never seen — and the next visitor to this
    // browser does not inherit a half-filled form belonging to somebody else.
    setStep(1)
    setSelectedService(preSelectedService ?? SERVICES_DATA[0] ?? null)
    setSelectedAddOns([])
    setSelectedDate('')
    setSelectedTimeSlot('')
    setDateTimeError(null)
    setClientName('')
    setClientPhone('')
    setClientEmail('')
    setBeveragePreference(BEVERAGE_UNDECIDED)
    setNotes('')
    setShowClientErrors(false)
    setRequest(null)
  }, [onClose, preSelectedService])

  /**
   * Every gate is checked here rather than by disabling the button. A disabled control tells
   * nobody what is missing, and it was the only thing standing between an empty form and a
   * submitted request.
   */
  const goNext = useCallback(() => {
    if (step === 1) {
      if (!selectedService) return
      setStep(2)
      return
    }
    if (step === 2) {
      if (!selectedDate || !selectedTimeSlot) {
        setDateTimeError('Choose a day, then a start time, to carry on.')
        return
      }
      setDateTimeError(null)
      setStep(3)
    }
  }, [step, selectedService, selectedDate, selectedTimeSlot])

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      setShowClientErrors(true)
      if (Object.keys(clientErrors).length > 0) return

      // Belt and braces: the earlier steps are re-checked, not assumed.
      if (!selectedService) {
        setStep(1)
        return
      }
      if (!selectedDate || !selectedTimeSlot) {
        setDateTimeError('Choose a day, then a start time, to carry on.')
        setStep(2)
        return
      }

      const taken = new Set(getStoredBookings().map((booking) => booking.referenceNumber))
      const newRequest: Booking = {
        id: createId(),
        referenceNumber: createReference(taken),
        createdAt: new Date().toISOString(),
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        addOns: selectedAddOns,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        totalPrice,
        totalDurationMinutes: totalDuration,
        beveragePreference:
          beveragePreference === BEVERAGE_UNDECIDED ? undefined : beveragePreference,
        notes: notes.trim() || undefined,
        // 'pending' is the truth: the studio has not seen this yet, and cannot until the
        // client sends the WhatsApp message on the next screen.
        status: 'pending',
        isPaid: false,
      }

      addBooking(newRequest)
      setRequest(newRequest)
      setStep(4)
      onBookingCreated?.(newRequest)
    },
    [
      clientErrors,
      selectedService,
      selectedDate,
      selectedTimeSlot,
      selectedAddOns,
      clientName,
      clientEmail,
      clientPhone,
      beveragePreference,
      notes,
      totalPrice,
      totalDuration,
      onBookingCreated,
    ],
  )

  const footer =
    step === 4 && request ? (
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="text-sm text-jacobean/70">
          Reference <span className="font-mono font-semibold text-jacobean">{request.referenceNumber}</span>
        </p>
        <button type="button" onClick={handleClose} className="u-btn-secondary w-full sm:w-auto">
          Close
        </button>
      </div>
    ) : (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-jacobean/70">
          <span className="sr-only">Studio price and length so far: </span>
          <span className="font-semibold text-jacobean">{formatPrice(totalPrice)}</span>
          <span aria-hidden="true" className="px-2 text-oyster-400">
            ·
          </span>
          {formatDuration(totalDuration)}
        </p>

        <div className="flex items-center gap-2">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((current) => (current - 1) as Step)}
              className="u-btn-secondary"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back
            </button>
          )}

          {step < 3 ? (
            <button type="button" onClick={goNext} className="u-btn-primary flex-1 sm:flex-none">
              Continue
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ) : (
            /* Was a second, differently-coloured primary — red where Continue was jacobean.
               Both are the same action in a client's head, so both look the same. */
            <button type="submit" form={FORM_ID} className="u-btn-primary flex-1 sm:flex-none">
              Review and send
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    )

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      title={step === 4 ? 'Your request' : 'Request an appointment'}
      subtitle={
        step === 4
          ? 'One step left — the message below is what reaches the studio.'
          : `With ${STUDIO_INFO.founder.split(' ')[0]} at ${STUDIO_INFO.address.street}. Nothing is held until the studio replies.`
      }
      footer={footer}
    >
      {step < 4 && (
        <nav
          aria-label="Request steps"
          className="sticky top-0 z-10 border-b border-oyster-300/70 bg-lace/95 px-6 py-3 backdrop-blur-sm sm:px-8"
        >
          <ol className="flex items-center">
            {STEPS.map(({ id, label }, index) => {
              const done = id < step
              const current = id === step

              const content = (
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                      current
                        ? 'bg-jacobean text-lace'
                        : done
                          ? 'bg-khaki-600 text-lace'
                          : 'border border-oyster-400 text-jacobean/70'
                    }`}
                  >
                    {done ? <Check className="h-3 w-3" strokeWidth={3} /> : id}
                  </span>
                  <span
                    className={`text-xs font-semibold ${current ? 'text-jacobean' : 'text-jacobean/70'}`}
                  >
                    {label}
                  </span>
                </span>
              )

              return (
                <li key={id} className="flex items-center">
                  {done ? (
                    <button
                      type="button"
                      onClick={() => setStep(id)}
                      className="rounded-full py-1 transition-opacity hover:opacity-70"
                    >
                      <span className="sr-only">Back to step {id}: </span>
                      {content}
                    </button>
                  ) : (
                    <span aria-current={current ? 'step' : undefined} className="py-1">
                      {content}
                    </span>
                  )}

                  {index < STEPS.length - 1 && (
                    <span aria-hidden="true" className="mx-2 h-px w-4 bg-oyster-300 sm:mx-4 sm:w-10" />
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      )}

      <div
        ref={panelRef}
        tabIndex={-1}
        role="group"
        aria-labelledby={step < 4 ? headingId : undefined}
        aria-label={step === 4 ? 'Your request' : undefined}
        className="outline-none"
      >
        {step === 1 && (
          <StepServices
            selectedService={selectedService}
            onSelectService={setSelectedService}
            selectedAddOns={selectedAddOns}
            onToggleAddOn={handleToggleAddOn}
            headingId={headingId}
          />
        )}

        {step === 2 && (
          <StepDateTime
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date)
              setDateTimeError(null)
            }}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={(slot) => {
              setSelectedTimeSlot(slot)
              setDateTimeError(null)
            }}
            treatmentDurationMinutes={totalDuration}
            error={dateTimeError}
            headingId={headingId}
          />
        )}

        {step === 3 && (
          /* noValidate: our messages sit next to the field and stay put, where the browser's
             own bubbles are unstyled and vanish on the next keystroke. handleSubmit re-checks
             everything regardless, so nothing rides on the attribute. */
          <form id={FORM_ID} onSubmit={handleSubmit} noValidate>
            <StepClientInfo
              clientName={clientName}
              onChangeName={setClientName}
              clientPhone={clientPhone}
              onChangePhone={setClientPhone}
              clientEmail={clientEmail}
              onChangeEmail={setClientEmail}
              beveragePreference={beveragePreference}
              onChangeBeverage={setBeveragePreference}
              notes={notes}
              onChangeNotes={setNotes}
              errors={showClientErrors ? clientErrors : {}}
              headingId={headingId}
            />
          </form>
        )}

        {step === 4 && request && <StepConfirmation booking={request} onClose={handleClose} />}
      </div>
    </Modal>
  )
}
