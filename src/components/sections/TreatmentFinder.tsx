import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Plus, RotateCcw } from 'lucide-react'
import { SERVICES_DATA, SERVICE_ADDONS } from '../../data/services'
import { ServiceAddOn, ServiceItem } from '../../types'
import { STUDIO_INFO } from '../../data/studioInfo'
import { formatDuration, formatPrice } from '../../utils/formatters'

interface TreatmentFinderProps {
  onSelectService: (service: ServiceItem) => void
}

/**
 * A quiet helper for people who cannot tell nine treatments apart — which is most people.
 *
 * It replaces TreatmentQuiz, which was broken in four ways worth naming. Its `nail-art`
 * branch could never run (no option carried that id, so the art session was unreachable),
 * steps 2 and 3 had no way back except a reset that wiped every answer, the result printed
 * the service name twice, and it stamped a hardcoded "★ 5.0 Rating" onto every single
 * outcome — a review score the studio has never collected.
 *
 * This section deliberately stays below Treatments and Foot Health: no display headline, no
 * resting call to action. The one primary button appears only after three answers, because
 * by then the visitor has asked for it.
 */

type FocusId = 'natural' | 'length' | 'art' | 'feet'

interface Choice {
  id: string
  title: string
  detail: string
}

interface Question {
  /** Sits beside "Step n of 3" so progress is readable as words, not only as a filled bar. */
  label: string
  title: string
  hint: string
  choices: Choice[]
}

const FOCUS_QUESTION: Question = {
  label: 'The visit',
  title: 'What brings you in?',
  hint: 'Pick the closest one. Nothing here is binding.',
  choices: [
    { id: 'natural', title: 'My own nails', detail: 'Strength, shape, and a finish that stays put.' },
    { id: 'length', title: 'Length and shape', detail: 'A sculpted set, or one you already wear.' },
    { id: 'art', title: 'A design', detail: 'Hand-painted work, chrome, something for an occasion.' },
    { id: 'feet', title: 'My feet', detail: 'Hard skin, awkward toenails, or a pedicure that lasts.' },
  ],
}

/**
 * Questions two and three change with the answer to the first. The old quiz asked everyone
 * about their "desired aesthetic style", including the people who had come in about cracked
 * heels — so a third of its answers were collected and then ignored.
 */
const BRANCHES: Record<FocusId, { situation: Question; finish: Question }> = {
  natural: {
    situation: {
      label: 'Condition',
      title: 'How are your nails at the moment?',
      hint: 'This decides whether the appointment starts with repair or with finish.',
      choices: [
        { id: 'weak', title: 'Thin, peeling or snapping', detail: 'They bend and catch, and break before they grow.' },
        { id: 'steady', title: 'Healthy enough', detail: 'The nails are fine. It is the polish that gives up first.' },
        { id: 'stripped', title: 'Just out of a set', detail: 'Ridged, soft or over-filed since the extensions came off.' },
      ],
    },
    finish: {
      label: 'Priority',
      title: 'And what matters most on the day?',
      hint: 'This shapes the finish and what is worth adding to it.',
      choices: [
        { id: 'wear', title: 'The longest wear you can give me', detail: 'As many weeks as possible out of one visit.' },
        { id: 'bare', title: 'Looking well with nothing on top', detail: 'Clean edges, buffed, no colour.' },
        { id: 'soft', title: 'A soft, glazed finish', detail: 'Nude, milky, or a pearl top.' },
      ],
    },
  },
  length: {
    situation: {
      label: 'Starting point',
      title: 'Where are you starting from?',
      hint: 'A set that has grown out is a different appointment from a new one.',
      choices: [
        { id: 'bare', title: 'Bare nails', detail: 'Nothing on them now — a full new set.' },
        { id: 'wearing', title: 'A set I already wear', detail: 'Grown out and due a rebalance.' },
        { id: 'short', title: 'Very short or bitten nails', detail: 'There is not much nail to build on yet.' },
      ],
    },
    finish: {
      label: 'The look',
      title: 'What should the set look like?',
      hint: 'The ombré work is sculpted differently, so this one genuinely changes the treatment.',
      choices: [
        { id: 'french', title: 'French or a soft ombré', detail: 'A sharp smile line, or a blush-to-white fade.' },
        { id: 'glazed', title: 'Nude, glazed or chrome', detail: 'Quiet colour under a pearl or mirror top.' },
        { id: 'colour', title: 'Proper colour', detail: 'Deep, saturated shades.' },
      ],
    },
  },
  art: {
    situation: {
      label: 'The canvas',
      title: 'What is the design going on?',
      hint: 'The art is the same either way. The base underneath it is not.',
      choices: [
        { id: 'own', title: 'My own nails', detail: 'No extensions. Art on the nails I have.' },
        { id: 'newset', title: 'A new set, built for it', detail: 'Length sculpted first, then the design.' },
        { id: 'wearing', title: 'A set I already wear', detail: 'Due an infill, and a new design with it.' },
      ],
    },
    finish: {
      label: 'How much',
      title: 'How much of it?',
      hint: 'Art is priced by how many nails it covers, so this is a real difference.',
      choices: [
        { id: 'accent', title: 'A couple of accent nails', detail: 'The rest kept quiet.' },
        { id: 'full', title: 'All ten', detail: 'One design running across the whole set.' },
        { id: 'occasion', title: 'Something for one occasion', detail: 'A wedding, a trip, a birthday.' },
      ],
    },
  },
  feet: {
    situation: {
      label: 'The trouble',
      title: 'What would you like sorted?',
      hint: `Deoana has spent ${STUDIO_INFO.experienceYears} years on feet. Say the awkward part.`,
      choices: [
        { id: 'hardskin', title: 'Hard skin and cracked heels', detail: 'They ache by the end of a day on your feet.' },
        { id: 'nails', title: 'Toenails that are hard to manage', detail: 'Thickened, uneven, or awkward to cut.' },
        { id: 'upkeep', title: 'Nothing wrong — just upkeep', detail: 'Keep everything comfortable and tidy.' },
      ],
    },
    finish: {
      label: 'Afterwards',
      title: 'And afterwards?',
      hint: 'Whether the toes take colour changes which pedicure this is.',
      choices: [
        { id: 'bare', title: 'Leave them bare', detail: 'No polish. Just comfortable.' },
        { id: 'polish', title: 'Gel polish on the toes', detail: 'Colour that holds through the season.' },
        { id: 'longest', title: 'Whatever lasts longest', detail: 'The most time between visits.' },
      ],
    },
  },
}

interface Match {
  serviceId: string
  addonId?: string
  why: string
}

/**
 * An empty `recommendedAddons` is the price list saying a treatment stands on its own, and it
 * is honoured here rather than second-guessed — the keratin repair appointment already
 * contains the warm paraffin wrap, so offering to sell it again would be nonsense.
 */
const resolveAddon = (service: ServiceItem, addonId?: string): ServiceAddOn | undefined => {
  if (!addonId || !service.recommendedAddons?.length) return undefined
  return SERVICE_ADDONS.find((item) => item.id === addonId)
}

/**
 * The matcher. Every one of the nine treatments is reachable from some path through it —
 * that was the point of rewriting rather than patching, since the art session previously
 * could not be reached at all.
 */
const matchTreatment = (focus: FocusId, situation: string, finish: string): Match => {
  if (focus === 'feet') {
    if (situation === 'upkeep') {
      return {
        serviceId: 'srv-spa-pedicure-luxe',
        addonId: finish === 'polish' ? 'addon-chrome' : 'addon-paraffin',
        why:
          finish === 'bare'
            ? 'Nothing needs rescuing, so this is the unhurried version — soak, shaping and hard-skin work. Say when you send the request if you would rather skip the polish.'
            : 'Nothing needs rescuing, so this is the unhurried version — soak, shaping, hard-skin work, and gel polish, which holds on toes far longer than it does on hands.',
      }
    }

    const note =
      finish === 'polish'
        ? ' Mention the polish in your request and the studio will say what fits in the time.'
        : ''

    return situation === 'hardskin'
      ? {
          serviceId: 'srv-medical-podology',
          addonId: 'addon-callus-peel',
          why:
            'Hard skin and heel cracks are podology work rather than a spa pedicure. It comes back down properly, and the pressure points that built it get looked at, so walking stops being the sore part of the day.' +
            note,
        }
      : {
          serviceId: 'srv-medical-podology',
          addonId: 'addon-paraffin',
          why:
            `Thickened or uneven toenails need cutting back and reshaping with the right tools — the part of Deoana’s ${STUDIO_INFO.experienceYears} years of practice that an ordinary pedicure does not cover.` +
            note,
        }
  }

  if (focus === 'art') {
    // Art is priced by coverage, so the add-on tier is the honest half of this answer.
    const artAddon = finish === 'accent' ? 'addon-nailart-tier1' : 'addon-nailart-tier2'

    if (situation === 'own') {
      return {
        serviceId: 'srv-bespoke-nailart',
        why: 'The art session is booked as an appointment of its own, with nothing else scheduled into it, so the design gets the whole slot rather than the last twenty minutes of one.',
      }
    }

    return situation === 'newset'
      ? {
          serviceId: 'srv-acrylic-fullset',
          addonId: artAddon,
          why: 'A design needs a surface to sit on, so the appointment starts with a sculpted set and the art goes on top of it.',
        }
      : {
          serviceId: 'srv-acrylic-infill',
          addonId: artAddon,
          why: 'Your set is due a rebalance anyway. Doing the infill and the new design in one sitting is one appointment instead of two.',
        }
  }

  if (focus === 'length') {
    if (situation === 'wearing') {
      return {
        serviceId: 'srv-acrylic-infill',
        addonId:
          finish === 'french' ? 'addon-french' : finish === 'glazed' ? 'addon-chrome' : 'addon-nailart-tier1',
        why: 'A grown-out set wants rebalancing rather than replacing — the regrowth filled, the apex reset, and the finish changed if you want a different one.',
      }
    }

    if (finish === 'french') {
      return {
        serviceId: 'srv-ombre-babyboomer',
        addonId: 'addon-chrome',
        why: 'The fade is blended into the sculpt rather than painted on afterwards, which is what keeps it looking seamless three weeks later.',
      }
    }

    return {
      serviceId: 'srv-acrylic-fullset',
      addonId: finish === 'glazed' ? 'addon-chrome' : 'addon-nailart-tier1',
      why:
        situation === 'short'
          ? 'Sculpted on forms rather than glued onto plastic tips, so length can be built even where there is very little nail to work from.'
          : 'Sculpted on forms rather than glued onto plastic tips — the shape is cut to your hand instead of chosen out of a box.',
    }
  }

  if (situation === 'stripped') {
    return {
      serviceId: 'srv-ibx-paraffin-restoration',
      why: 'Nails fresh out of a set will not hold anything until they have recovered. This appointment is the keratin and warm paraffin work on its own — no extensions, no colour, just the repair.',
    }
  }

  if (situation === 'weak' || finish === 'wear') {
    return {
      serviceId: 'srv-biab-signature',
      addonId: finish === 'soft' ? 'addon-chrome' : 'addon-ibx',
      why:
        situation === 'weak'
          ? 'A builder gel overlay gives thin nails something to hold on to, so they grow past the length where they usually snap.'
          : 'Your nails do not need rescuing, so this one is purely about longevity — builder gel keeps its edge for weeks after ordinary polish has chipped.',
    }
  }

  return {
    serviceId: 'srv-russian-manicure',
    addonId: finish === 'soft' ? 'addon-chrome' : 'addon-ibx',
    why:
      finish === 'bare'
        ? 'Dry, waterless cuticle work is what makes bare nails look finished. Nothing goes on top; the tidiness is the treatment.'
        : 'Cleaning right to the cuticle first is what lets a soft nude sit flush against the skin instead of leaving a gap as it grows out.',
  }
}

interface Result {
  service: ServiceItem
  addon?: ServiceAddOn
  why: string
}

export const TreatmentFinder: React.FC<TreatmentFinderProps> = ({ onSelectService }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [focus, setFocus] = useState<FocusId | null>(null)
  const [situation, setSituation] = useState('')
  const [finish, setFinish] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const headingRef = useRef<HTMLHeadingElement>(null)
  const isFirstRender = useRef(true)

  /**
   * The button that advanced the step is unmounted by the time the next step paints, which
   * drops keyboard focus back to the top of the document. Moving it to the new heading is
   * the fix; the first render is skipped so the page does not scroll itself on load.
   */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step, result])

  const branch = focus ? BRANCHES[focus] : undefined
  const question = !branch || step === 1 ? FOCUS_QUESTION : step === 2 ? branch.situation : branch.finish
  const selectedId = step === 1 ? focus : step === 2 ? situation : finish

  const handleChoose = (choiceId: string) => {
    if (step === 1) {
      // Changing the first answer invalidates the two below it — those option ids belong to
      // a different branch entirely.
      if (choiceId !== focus) {
        setSituation('')
        setFinish('')
      }
      setFocus(choiceId as FocusId)
      setStep(2)
      return
    }

    if (step === 2) {
      if (choiceId !== situation) setFinish('')
      setSituation(choiceId)
      setStep(3)
      return
    }

    if (!focus) return
    setFinish(choiceId)

    const match = matchTreatment(focus, situation, choiceId)
    const service = SERVICES_DATA.find((item) => item.id === match.serviceId) ?? SERVICES_DATA[0]
    if (!service) return

    setResult({ service, addon: resolveAddon(service, match.addonId), why: match.why })
  }

  /** Answers are kept when stepping back, so the previous choice reads as still chosen. */
  const handleBack = () => {
    if (result) {
      setResult(null)
      return
    }
    setStep(step === 3 ? 2 : 1)
  }

  const handleRestart = () => {
    setStep(1)
    setFocus(null)
    setSituation('')
    setFinish('')
    setResult(null)
  }

  return (
    <section id="finder" className="u-section-tight bg-lace">
      <div className="u-container">
        <div className="mx-auto max-w-3xl">
          <header className="max-w-xl">
            <p className="u-eyebrow text-khaki-700">Treatment finder</p>
            {/* Fraunces italic rather than the display face on purpose: this is a spoken
                question in the studio's voice, and a titling headline here would put a
                supporting section on the same footing as Treatments. */}
            <h2 className="u-quote mt-3 text-2xl leading-snug text-jacobean sm:text-[1.75rem]">
              Not sure what you need?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-jacobean/75 sm:text-base">
              Three questions, and this will point at one treatment to start from. It is a
              suggestion, not a decision — Deoana talks it through with you before anything begins.
            </p>
          </header>

          <div className="u-card mt-8 p-5 sm:mt-10 sm:p-8">
            {/* Progress is carried by the words first. The bar only repeats what the line
                already says, so nothing depends on seeing the colour. */}
            <div className="mb-6 flex items-baseline justify-between gap-4 sm:mb-8">
              <p className="u-eyebrow text-jacobean/70">
                {result ? 'Suggestion' : `Step ${step} of 3`}
              </p>
              <p className="text-sm text-jacobean/70">{result ? 'Three of three answered' : question.label}</p>
            </div>

            <div aria-hidden="true" className="mb-7 h-px w-full bg-oyster-300/70 sm:mb-9">
              <div
                className="h-px bg-khaki-500 transition-[width] duration-300"
                style={{ width: `${result ? 100 : (step / 3) * 100}%` }}
              />
            </div>

            {/* The live region is the header rather than the whole step: announcing four
                option buttons and their descriptions on every change is unusable. */}
            <div aria-live="polite">
              <h3
                ref={headingRef}
                tabIndex={-1}
                id="finder-step-heading"
                className="text-lg font-semibold leading-snug text-jacobean focus-visible:outline-offset-4 sm:text-xl"
              >
                {result ? 'A good place to start' : question.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-jacobean/70">
                {result
                  ? 'Based on what you picked. Change any answer and it will change with you.'
                  : question.hint}
              </p>
            </div>

            {result ? (
              <div className="mt-6">
                <div className="rounded-card border border-oyster-300/70 bg-pearlBush/30 p-5 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                    {/* Once. The old result card printed the treatment name twice, in two
                        different sizes, one above the other. */}
                    <div>
                      <h4 className="text-base font-semibold leading-snug text-jacobean sm:text-lg">
                        {result.service.name}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-jacobean/70">
                        {result.service.shortDescription}
                      </p>
                    </div>
                    <p className="shrink-0 sm:text-right">
                      <span className="text-xl font-semibold text-redRobin-700">
                        {formatPrice(result.service.price)}
                      </span>
                      <span className="ml-2 text-sm text-jacobean/70 sm:ml-0 sm:block">
                        {formatDuration(result.service.durationMinutes)}
                      </span>
                    </p>
                  </div>

                  <p className="mt-5 border-t border-oyster-300/60 pt-5 text-sm leading-relaxed text-jacobean/80 sm:text-base">
                    {result.why}
                  </p>

                  {result.addon && (
                    <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-oyster-300/60 bg-lace px-4 py-3 text-sm leading-relaxed text-jacobean/80">
                      <Plus className="mt-0.5 h-4 w-4 shrink-0 text-khaki-500" />
                      <span>
                        {/* "Can be", not "often is" — nobody here counts how many people
                            take an add-on, so nobody here may imply it. */}
                        <span className="font-semibold text-jacobean">Can be added — </span>
                        {result.addon.name}, {formatPrice(result.addon.price)} and about{' '}
                        {formatDuration(result.addon.durationMinutes)} on top.
                      </span>
                    </p>
                  )}
                </div>

                {/* The section's only primary button, and it appears only once someone has
                    asked three questions of it — Treatments still owns the loud CTA. */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={() => onSelectService(result.service)}
                    className="u-btn-primary group w-full sm:w-auto"
                  >
                    Request this treatment
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <button
                      onClick={handleBack}
                      className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-medium text-jacobean/70 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin hover:decoration-redRobin"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Change my last answer
                    </button>
                    <button
                      onClick={handleRestart}
                      className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-medium text-jacobean/70 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin hover:decoration-redRobin"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Start again
                    </button>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-jacobean/70">
                  That opens the booking form. Nothing reaches the studio until you send the
                  WhatsApp message it prepares for you, and the studio confirms the time from there.
                </p>
              </div>
            ) : (
              <>
                <div
                  role="group"
                  aria-labelledby="finder-step-heading"
                  className={`mt-6 grid grid-cols-1 gap-3 ${
                    question.choices.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
                  }`}
                >
                  {question.choices.map((choice) => {
                    const isSelected = choice.id === selectedId
                    return (
                      <button
                        key={choice.id}
                        onClick={() => handleChoose(choice.id)}
                        aria-pressed={isSelected}
                        className={`group flex h-full flex-col rounded-card border p-4 text-left transition-colors sm:p-5 ${
                          isSelected
                            ? 'border-khaki-500 bg-pearlBush/50'
                            : 'border-oyster-300/70 bg-lace hover:border-khaki-500 hover:bg-pearlBush/30'
                        }`}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-base font-semibold leading-snug text-jacobean">
                            {choice.title}
                          </span>
                          {isSelected && <Check className="mt-0.5 h-4 w-4 shrink-0 text-khaki-600" />}
                        </span>
                        <span className="mt-1.5 text-sm leading-relaxed text-jacobean/70">
                          {choice.detail}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* The old quiz had no way back at all: once you were on step two the only
                    escape was a reset that wiped every answer you had given. */}
                {step > 1 && (
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <button
                      onClick={handleBack}
                      className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-medium text-jacobean/70 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin hover:decoration-redRobin"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to step {step - 1}
                    </button>
                    <button
                      onClick={handleRestart}
                      className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-medium text-jacobean/70 underline decoration-oyster-400 underline-offset-4 transition-colors hover:text-redRobin hover:decoration-redRobin"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Start again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
