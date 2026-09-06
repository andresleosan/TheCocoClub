/**
 * Operational and data-handling copy.
 *
 * The site collects a name, an email, a phone number and a free-text field that explicitly
 * invites health information ("sensitive cuticle areas", "heel pain"). Under Jersey's Data
 * Protection (Jersey) Law 2018 that is special-category personal data, and the site carried
 * no privacy notice of any kind. What follows is deliberately narrow: it describes only what
 * the code actually does, which is the one thing that can be stated without the owner's input.
 *
 * Anything the studio must decide for itself is marked `needsOwnerInput` and rendered as an
 * open question rather than an invented rule. Do not fill these in with plausible-sounding
 * terms — a cancellation policy that nobody agreed to is worse than an absent one.
 */

export interface PolicyNote {
  id: string
  /** Grouping label, shared with the Visiting section's own questions. */
  topic: string
  question: string
  answer: string
  /** True when the studio owner must supply or approve the wording before publishing. */
  needsOwnerInput?: boolean
}

/** Accurate as of the current build: there is no server, so nothing leaves the browser. */
export const DATA_NOTE: PolicyNote = {
  id: 'your-information',
  topic: 'Booking',
  question: 'What happens to the details I enter?',
  answer:
    'They stay on your device. This site has no server and no database: the booking form uses ' +
    'what you type to compose a WhatsApp message, which you then choose to send. Nothing is ' +
    'transmitted anywhere until you send it, and the studio only ever sees what is in that ' +
    'message. A copy of your request is kept in your own browser so you can look it up again, ' +
    'and clearing your browser data removes it.',
}

export const VISIT_NOTES: PolicyNote[] = [
  {
    id: 'how-booking-works',
    topic: 'Booking',
    question: 'How does booking work?',
    answer:
      'You choose a treatment and the time you would like, and the site prepares a message for ' +
      'you to send on WhatsApp. Deoana replies to confirm — until she does, the time is a ' +
      'request rather than a booking. It is a small studio with one pair of hands, so replies ' +
      'come between appointments rather than instantly.',
  },
  {
    id: 'arriving',
    topic: 'Your visit',
    question: 'What happens when I arrive?',
    answer:
      'The studio is private and takes one client at a time, so there is no waiting room and no ' +
      'overlap with anyone else. You will be offered something to drink, and the appointment is ' +
      'yours for its full length — nothing is rushed to fit someone else in.',
  },
  {
    id: 'cancellation',
    topic: 'Booking',
    question: 'What if I need to cancel or rearrange?',
    answer:
      'Message the studio on WhatsApp as early as you can and Deoana will find another time.',
    // The studio has not set a notice period, deposit or no-show rule. Inventing one would
    // create a term no client ever agreed to, so this stays deliberately soft until the
    // owner decides. See the note in the project README.
    needsOwnerInput: true,
  },
  {
    id: 'health',
    topic: 'Your visit',
    question: 'Should I mention a health condition?',
    answer:
      'Yes — tell the studio about anything relevant, such as diabetes, circulation problems, ' +
      'a skin condition or a recent injury, so the treatment can be adapted or a different one ' +
      'suggested. The studio offers expert nail and foot care; it is not a healthcare provider ' +
      'and does not diagnose or treat medical conditions. If something needs medical attention, ' +
      'Deoana will say so and suggest you see your GP.',
  },
]
