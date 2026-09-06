import React, { useId, useMemo, useState } from 'react'
import { Modal } from '../ui/Modal'
import { SERVICES_DATA, SERVICE_ADDONS } from '../../data/services'
import { STUDIO_INFO } from '../../data/studioInfo'
import { Booking, BookingStatus, ServiceAddOn } from '../../types'
import { formatDuration, formatPrice } from '../../utils/formatters'

/**
 * Writing a walk-in or a phone call into the diary by hand.
 *
 * Three things were wrong here and all three were data problems rather than styling ones:
 * the form had no scroll strategy at all (on a laptop the Save button sat below the fold with
 * no way to reach it), it invented an email address for anyone who did not give one
 * (`name@client.je` — a fabricated contact detail sitting in the export), and it hard-coded a
 * beverage line that is not one of the studio's actual options. Add-ons could not be entered,
 * so every manual row understated its own price and length.
 */

interface AddBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onAddBooking: (booking: Booking) => void
}

/**
 * Today in the studio's own calendar, not UTC.
 *
 * `new Date().toISOString().slice(0, 10)` — which both admin files used — reports the UTC day,
 * so through British Summer Time the portal called it tomorrow from 23:00 onwards and the
 * "Today" filter quietly showed the wrong diary. Lives here because AdminModal already imports
 * this module, and src/utils is not ours to add to.
 */
export const localIsoDate = (date = new Date()): string =>
  `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, '0')}-${`${date.getDate()}`.padStart(2, '0')}`

/** Wording, not jargon: 'confirmed' only ever means a human replied. */
const STATUS_CHOICES: { value: BookingStatus; label: string }[] = [
  { value: 'confirmed', label: 'Confirmed — I have agreed the time with them' },
  { value: 'pending', label: 'Awaiting reply — nothing agreed yet' },
  { value: 'completed', label: 'Completed — they have already been in' },
]

export const AddBookingModal: React.FC<AddBookingModalProps> = ({
  isOpen,
  onClose,
  onAddBooking,
}) => {
  const formId = useId()
  const fieldId = (name: string) => `${formId}-${name}`

  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [serviceId, setServiceId] = useState(SERVICES_DATA[0]?.id ?? '')
  const [addOnIds, setAddOnIds] = useState<string[]>([])
  const [date, setDate] = useState(localIsoDate())
  const [timeSlot, setTimeSlot] = useState(STUDIO_INFO.availableTimeSlots[0])
  const [beverage, setBeverage] = useState('')
  const [status, setStatus] = useState<BookingStatus>('confirmed')
  const [notes, setNotes] = useState('')

  const service = useMemo(
    () => SERVICES_DATA.find((s) => s.id === serviceId) ?? SERVICES_DATA[0],
    [serviceId],
  )

  const addOns = useMemo<ServiceAddOn[]>(
    () => SERVICE_ADDONS.filter((a) => addOnIds.includes(a.id)),
    [addOnIds],
  )

  const totalPrice = (service?.price ?? 0) + addOns.reduce((sum, a) => sum + a.price, 0)
  const totalDurationMinutes =
    (service?.durationMinutes ?? 0) + addOns.reduce((sum, a) => sum + a.durationMinutes, 0)

  const resetForm = () => {
    setClientName('')
    setClientPhone('')
    setClientEmail('')
    setServiceId(SERVICES_DATA[0]?.id ?? '')
    setAddOnIds([])
    setDate(localIsoDate())
    setTimeSlot(STUDIO_INFO.availableTimeSlots[0])
    setBeverage('')
    setStatus('confirmed')
    setNotes('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const toggleAddOn = (id: string) =>
    setAddOnIds((current) =>
      current.includes(id) ? current.filter((a) => a !== id) : [...current, id],
    )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!service || !clientName.trim() || !clientPhone.trim()) return

    onAddBooking({
      id: `bk-${Date.now()}`,
      // Timestamp-derived rather than random, so two entries made in the same minute can't
      // collide on a reference the client is expected to quote back.
      referenceNumber: `CC-${new Date().getFullYear()}-${Date.now().toString(36).slice(-4).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      clientName: clientName.trim(),
      // Empty when they did not give one. The old fallback minted an address that did not exist.
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      serviceId: service.id,
      serviceName: service.name,
      addOns,
      date,
      timeSlot,
      totalPrice,
      totalDurationMinutes,
      beveragePreference: beverage || undefined,
      notes: notes.trim() || undefined,
      status,
      isPaid: false,
    })

    resetForm()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add to the diary"
      subtitle="For a walk-in or a phone call. This is written to this browser only — it sends nothing to the client."
      size="md"
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-jacobean/70">
            {formatPrice(totalPrice)} · {formatDuration(totalDurationMinutes)}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={handleClose} className="u-btn-secondary u-btn-sm">
              Cancel
            </button>
            <button type="submit" form={formId} className="u-btn-primary u-btn-sm">
              Save to diary
            </button>
          </div>
        </div>
      }
    >
      {/* The submit button lives in the modal's sticky footer, so it reaches the form by id. */}
      <form id={formId} onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
        <div>
          <label htmlFor={fieldId('name')} className="u-label">
            Client name
          </label>
          <input
            id={fieldId('name')}
            type="text"
            required
            autoComplete="off"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="u-field"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId('phone')} className="u-label">
              Phone
            </label>
            <input
              id={fieldId('phone')}
              type="tel"
              required
              inputMode="tel"
              placeholder="+44 7797 000000"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="u-field"
            />
            <p className="mt-1.5 text-[0.8125rem] text-jacobean/70">
              With the country code, so the WhatsApp button works from the diary.
            </p>
          </div>

          <div>
            <label htmlFor={fieldId('email')} className="u-label">
              Email <span className="font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <input
              id={fieldId('email')}
              type="email"
              autoComplete="off"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="u-field"
            />
          </div>
        </div>

        <div>
          <label htmlFor={fieldId('service')} className="u-label">
            Treatment
          </label>
          <select
            id={fieldId('service')}
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="u-field"
          >
            {SERVICES_DATA.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {formatPrice(s.price)}, {formatDuration(s.durationMinutes)}
              </option>
            ))}
          </select>
        </div>

        {/* Add-ons were not enterable at all, so every manual row under-reported its own
            price and length — and the diary total with it. */}
        <fieldset>
          <legend className="u-label">Add-ons</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {SERVICE_ADDONS.map((addOn) => (
              <label
                key={addOn.id}
                className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-oyster-300 bg-lace px-3 py-2.5 text-sm text-jacobean transition-colors hover:border-khaki-500"
              >
                <input
                  type="checkbox"
                  checked={addOnIds.includes(addOn.id)}
                  onChange={() => toggleAddOn(addOn.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-khaki-600"
                />
                <span className="leading-snug">
                  {addOn.name}
                  <span className="block text-[0.8125rem] text-jacobean/70">
                    {formatPrice(addOn.price)} · {formatDuration(addOn.durationMinutes)}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId('date')} className="u-label">
              Date
            </label>
            <input
              id={fieldId('date')}
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="u-field"
            />
          </div>

          <div>
            <label htmlFor={fieldId('time')} className="u-label">
              Time
            </label>
            <select
              id={fieldId('time')}
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="u-field"
            >
              {STUDIO_INFO.availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId('beverage')} className="u-label">
              To drink <span className="font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <select
              id={fieldId('beverage')}
              value={beverage}
              onChange={(e) => setBeverage(e.target.value)}
              className="u-field"
            >
              <option value="">Not asked yet</option>
              {STUDIO_INFO.beverageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={fieldId('status')} className="u-label">
              Where it stands
            </label>
            <select
              id={fieldId('status')}
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              className="u-field"
            >
              {STATUS_CHOICES.map((choice) => (
                <option key={choice.value} value={choice.value}>
                  {choice.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={fieldId('notes')} className="u-label">
            Notes
          </label>
          <textarea
            id={fieldId('notes')}
            rows={3}
            placeholder="Shape, colour, anything to pick up next time."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="u-field resize-y"
          />
        </div>
      </form>
    </Modal>
  )
}
