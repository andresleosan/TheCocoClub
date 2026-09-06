import React from 'react'
import { AlertCircle, Lock } from 'lucide-react'
import { STUDIO_INFO } from '../../data/studioInfo'

/**
 * Step three — who is asking.
 *
 * The old fields were unlabelled: a styled `div` sat where a `<label>` should have been, with
 * no `htmlFor`, no `autoComplete` and no `inputMode`, so nothing could be autofilled and a
 * screen reader announced three anonymous text boxes. The beverage choices were `div onClick`
 * again, and validation existed only as a disabled button.
 *
 * Email is now optional. The studio replies on WhatsApp and the address was never used for
 * anything — asking for a detail you have no use for costs conversions and nothing else.
 */

export interface ClientErrors {
  name?: string
  phone?: string
  email?: string
}

interface StepClientInfoProps {
  clientName: string
  onChangeName: (value: string) => void
  clientPhone: string
  onChangePhone: (value: string) => void
  clientEmail: string
  onChangeEmail: (value: string) => void
  beveragePreference: string
  onChangeBeverage: (value: string) => void
  notes: string
  onChangeNotes: (value: string) => void
  /** Populated only once the client has tried to continue, so the panel isn't red on arrival. */
  errors: ClientErrors
  headingId: string
}

/** The honest default: nothing is chosen until the client chooses it. */
export const BEVERAGE_UNDECIDED = "I'll decide when I arrive"

const FieldError: React.FC<{ id: string; message?: string }> = ({ id, message }) =>
  message ? (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-sm text-redRobin-800">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  ) : null

export const StepClientInfo: React.FC<StepClientInfoProps> = ({
  clientName,
  onChangeName,
  clientPhone,
  onChangePhone,
  clientEmail,
  onChangeEmail,
  beveragePreference,
  onChangeBeverage,
  notes,
  onChangeNotes,
  errors,
  headingId,
}) => {
  const beverages = [BEVERAGE_UNDECIDED, ...STUDIO_INFO.beverageOptions]

  return (
    <div className="space-y-8 px-6 py-6 sm:px-8">
      <div>
        <h3 id={headingId} className="u-quote text-lg text-jacobean">
          Your details
        </h3>
        <p className="mt-1 text-sm text-jacobean/70">
          Deoana needs a name and a number to reply to. Everything else is optional.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="booking-name" className="u-label">
            Your name
          </label>
          <input
            id="booking-name"
            type="text"
            required
            autoComplete="name"
            value={clientName}
            onChange={(event) => onChangeName(event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
            className={`u-field ${errors.name ? 'u-field-error' : ''}`}
          />
          <FieldError id="booking-name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="booking-phone" className="u-label">
            Mobile number
          </label>
          <input
            id="booking-phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="07797 000000"
            value={clientPhone}
            onChange={(event) => onChangePhone(event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'booking-phone-error' : 'booking-phone-hint'}
            className={`u-field ${errors.phone ? 'u-field-error' : ''}`}
          />
          {errors.phone ? (
            <FieldError id="booking-phone-error" message={errors.phone} />
          ) : (
            <p id="booking-phone-hint" className="mt-1.5 text-sm text-jacobean/70">
              This is the number the studio replies to.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-email" className="u-label">
            Email <span className="font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="booking-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={clientEmail}
            onChange={(event) => onChangeEmail(event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'booking-email-error' : undefined}
            className={`u-field ${errors.email ? 'u-field-error' : ''}`}
          />
          <FieldError id="booking-email-error" message={errors.email} />
        </div>
      </div>

      <fieldset className="m-0 border-0 p-0">
        <legend className="u-eyebrow mb-1 text-khaki-700">Something to drink</legend>
        <p className="mb-3 text-sm text-jacobean/70">
          Offered on arrival, included in the appointment.
        </p>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {beverages.map((drink) => {
            const selected = beveragePreference === drink

            return (
              <label key={drink} className="block cursor-pointer">
                <input
                  type="radio"
                  name="booking-beverage"
                  value={drink}
                  checked={selected}
                  onChange={() => onChangeBeverage(drink)}
                  className="peer sr-only"
                />
                <span
                  className={`flex items-center gap-2.5 rounded-card border px-4 py-3 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-redRobin-700 ${
                    selected
                      ? 'border-jacobean bg-pearlBush/60 font-semibold text-jacobean'
                      : 'border-oyster-300/70 bg-lace text-jacobean/80 hover:border-oyster-400'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                      selected ? 'border-jacobean' : 'border-oyster-400'
                    }`}
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-jacobean" />}
                  </span>
                  {drink}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="booking-notes" className="u-label">
          Anything the studio should know <span className="font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          id="booking-notes"
          rows={3}
          value={notes}
          onChange={(event) => onChangeNotes(event.target.value)}
          placeholder="A shape you like, a nail that has broken, product you'd rather avoid, shoes that rub."
          className="u-field resize-y"
        />
      </div>

      <p className="flex items-start gap-2 rounded-card border border-oyster-300/60 bg-pearlBush/40 px-4 py-3 text-sm text-jacobean/75">
        <Lock className="mt-0.5 h-4 w-4 shrink-0 text-khaki-600" aria-hidden="true" />
        There is no account and no server here. What you type stays in this browser and travels
        only inside the WhatsApp message you send on the next step.
      </p>
    </div>
  )
}
