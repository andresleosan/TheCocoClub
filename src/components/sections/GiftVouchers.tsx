import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Wordmark, Logomark } from '../brand/BrandMarks'
import { RibbonBand } from '../brand/Decor'
import { STUDIO_ADDRESS_LINE } from '../../data/studioInfo'
import { formatPrice } from '../../utils/formatters'
import { createWhatsAppVoucherLink } from '../../utils/whatsapp'

/**
 * A side offer, and it should read like one — this section sits after the treatments and
 * must not compete with them.
 *
 * What was here was the page's worst brand offence. The card was built entirely on an
 * invented gold-* scale that does not exist in this palette, its primary action was Tailwind
 * emerald on pure white, and it typeset "THE COCO CLUB" as letterspaced Italiana caps — the
 * exact opposite of the real wordmark's warm rounded script. It also minted a reference
 * number ("CC-GIFT-4821") for a voucher that nothing on this site is able to issue.
 *
 * The preview is now the studio's own lockup on a dark ground, which is how the brand guide
 * shows it. There is no sender field: WhatsApp already tells Deoana who is asking.
 */

const AMOUNTS = [50, 75, 100, 150]

/** The card has room for a line or two, not a letter. */
const MESSAGE_LIMIT = 140

export const GiftVouchers: React.FC = () => {
  const [amount, setAmount] = useState(AMOUNTS[1])
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')

  const forWhom = recipient.trim()
  const note = message.trim()
  const remaining = MESSAGE_LIMIT - message.length

  return (
    <section id="vouchers" className="u-section-tight bg-lace">
      <div className="u-container">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* The card mirrors the fields and carries no information of its own, so it stays
              out of the accessibility tree rather than reading every keystroke twice. */}
          <figure className="lg:col-span-5">
            <div
              aria-hidden="true"
              className="relative overflow-hidden rounded-panel bg-jacobean p-7 text-lace shadow-panel sm:p-9"
            >
              <RibbonBand edge="bottom" className="text-lace/10" />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <Wordmark className="h-auto w-36 text-lace sm:w-40" />
                  <span className="u-title text-3xl leading-none text-oyster-200">
                    {formatPrice(amount)}
                  </span>
                </div>

                <div className="mt-8 border-t border-lace/15 pt-5">
                  <p className="u-eyebrow text-oyster-400">For</p>
                  <p className="u-quote mt-1.5 text-xl leading-snug text-lace">
                    {forWhom || 'Someone you like a great deal'}
                  </p>

                  {note && (
                    <p className="mt-4 text-sm leading-relaxed text-oyster-300">“{note}”</p>
                  )}
                </div>

                <div className="mt-8 flex items-center gap-2.5 border-t border-lace/15 pt-5">
                  <Logomark className="h-5 w-auto shrink-0 text-oyster-400" />
                  <span className="text-xs text-oyster-400">{STUDIO_ADDRESS_LINE}</span>
                </div>
              </div>
            </div>

            <figcaption className="mt-3 text-center text-xs text-jacobean/70">
              A preview. Deoana writes the real one.
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <p className="u-eyebrow text-khaki-700">Gift vouchers</p>

            <h2 className="u-title mt-3 text-2xl text-jacobean sm:text-3xl">
              Give someone an unhurried afternoon
            </h2>

            <p className="mt-4 max-w-prose text-sm leading-relaxed text-jacobean/80 sm:text-base">
              Choose a value, add a name and a few words if you would like them on the card, and
              the details go to Deoana on WhatsApp. Nothing is paid for on this page — she
              confirms the amount, arranges payment and tells you how to collect it.
            </p>

            <div className="mt-8 space-y-6">
              <fieldset>
                <legend className="u-label">Voucher value</legend>

                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {AMOUNTS.map((value) => (
                    <label key={value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="voucher-amount"
                        value={value}
                        checked={amount === value}
                        onChange={() => setAmount(value)}
                        className="peer sr-only"
                      />
                      {/* The input is visually hidden, so the ring has to be carried by the
                          chip — never leave a keyboard user with no focus indicator. */}
                      <span
                        className="flex min-h-[2.75rem] items-center justify-center rounded-full border
                                   border-oyster-300 bg-lace text-sm font-semibold text-jacobean
                                   transition-colors hover:border-khaki-500
                                   peer-checked:border-jacobean peer-checked:bg-jacobean peer-checked:text-lace
                                   peer-focus-visible:outline peer-focus-visible:outline-2
                                   peer-focus-visible:outline-offset-2 peer-focus-visible:outline-redRobin"
                      >
                        {formatPrice(value)}
                      </span>
                    </label>
                  ))}
                </div>

                <p className="mt-2.5 text-xs text-jacobean/70">
                  Any other value can be arranged — just say so when you message.
                </p>
              </fieldset>

              <div>
                <label htmlFor="voucher-recipient" className="u-label">
                  Who is it for? <span className="font-normal normal-case">(optional)</span>
                </label>
                <input
                  id="voucher-recipient"
                  type="text"
                  value={recipient}
                  onChange={(event) => setRecipient(event.target.value)}
                  placeholder="Their name"
                  autoComplete="off"
                  className="u-field"
                />
              </div>

              <div>
                <label htmlFor="voucher-message" className="u-label">
                  A few words <span className="font-normal normal-case">(optional)</span>
                </label>
                {/* Was rows={2} around a 63-character default, so the note it invited never
                    fitted the box it was typed into. */}
                <textarea
                  id="voucher-message"
                  rows={4}
                  value={message}
                  maxLength={MESSAGE_LIMIT}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Happy birthday — your feet have earned this."
                  className="u-field resize-y"
                />
                <p className="mt-1.5 text-xs text-jacobean/70">
                  {remaining} {remaining === 1 ? 'character' : 'characters'} left.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href={createWhatsAppVoucherLink(amount, forWhom || undefined, note || undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="u-btn-primary w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" />
                Ask about a {formatPrice(amount)} voucher
              </a>

              <p className="mt-3 text-xs text-jacobean/70">
                This opens WhatsApp with your details written out. Sending it is a request —
                the studio replies to arrange the rest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
