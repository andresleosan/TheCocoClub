import React, { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  CircleAlert,
  Clock,
  Download,
  MessageCircle,
  NotebookText,
  PoundSterling,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Logomark } from '../brand/BrandMarks'
import { StudioLock, useStudioLock } from './StudioLock'
import { StatsCard } from './StatsCard'
import { AddBookingModal, localIsoDate } from './AddBookingModal'
import { Booking, BookingStatus } from '../../types'
import { formatDateFriendly, formatDuration, formatPrice } from '../../utils/formatters'
import { addBooking, deleteBooking, saveBookings, updateBookingStatus } from '../../utils/storage'
import { INITIAL_BOOKINGS } from '../../data/initialBookings'
import { STUDIO_INFO } from '../../data/studioInfo'

/**
 * Deoana's diary. An internal tool, so it is deliberately plain: dense rows, real labels, no
 * decoration. Nothing in here is a marketing surface.
 *
 * It was the only dialog on the site with a sane height strategy, and still had no focus trap,
 * no Escape and no scroll lock — and the client-notes panel inside it was a bare div with a
 * "✕" character for a close button. All three dialogs now sit on the Modal primitive.
 *
 * The other repair is semantic. Statuses were painted in emerald, blue and amber — colours this
 * brand does not contain — and 'confirmed' was worded as though the site had booked something.
 * It has not: there is no backend, these rows live in this browser's localStorage, and the only
 * thing that ever reaches a client is a WhatsApp message somebody types. So 'confirmed' here
 * records that Deoana replied and agreed a time, and the wording says exactly that.
 */

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  bookings: Booking[]
  onBookingsChange: (bookings: Booking[]) => void
}

type DateFilter = 'upcoming' | 'today' | 'all'

/**
 * Status, in the brand's own six colours. Every pill carries its label as well as its colour —
 * the previous build asked an operator to tell amber from emerald at 11px and nothing else.
 */
const STATUS_META: Record<BookingStatus, { label: string; pill: string }> = {
  pending: { label: 'Awaiting reply', pill: 'border-oyster-400 bg-oyster-200 text-jacobean' },
  confirmed: { label: 'Confirmed by reply', pill: 'border-khaki-500 bg-khaki-100 text-khaki-700' },
  completed: { label: 'Completed', pill: 'border-jacobean bg-jacobean text-lace' },
  cancelled: { label: 'Cancelled', pill: 'border-redRobin-300 bg-redRobin-50 text-redRobin-800' },
}

const STATUS_ORDER: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled']

const DATE_FILTERS: { value: DateFilter; label: string }[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'today', label: 'Today' },
  { value: 'all', label: 'Everything' },
]

/** Quotes every field, so a comma or a line break in a client note cannot shift the columns. */
const csvCell = (value: string | number | undefined): string =>
  `"${String(value ?? '').replace(/"/g, '""')}"`

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onBookingsChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all')
  // A diary opens on what is coming, not on last month. The old default showed every row ever
  // stored, so the next appointment was buried under completed ones.
  const [dateFilter, setDateFilter] = useState<DateFilter>('upcoming')
  const [isAddOpen, setAddOpen] = useState(false)
  const [notesFor, setNotesFor] = useState<Booking | null>(null)

  // The diary is the one screen holding client names, numbers and treatment notes, and it was
  // reachable by anyone who opened the footer link on Deoana's device. See StudioLock for what
  // the passcode does and, more importantly, what it does not.
  const { unlocked, unlock } = useStudioLock(isOpen)

  const today = localIsoDate()

  // The portal's own dialogs are siblings in the same portal root, so closing the portal has to
  // close them too — otherwise a notes panel is left floating over the page with nothing behind it.
  useEffect(() => {
    if (isOpen) return
    setAddOpen(false)
    setNotesFor(null)
  }, [isOpen])

  const visible = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase()

    return bookings
      .filter((b) => {
        if (statusFilter !== 'all' && b.status !== statusFilter) return false
        if (dateFilter === 'today' && b.date !== today) return false
        if (dateFilter === 'upcoming' && b.date < today) return false
        if (!needle) return true
        return [b.clientName, b.clientPhone, b.referenceNumber, b.serviceName]
          .join(' ')
          .toLowerCase()
          .includes(needle)
      })
      .sort((a, b) => `${a.date} ${a.timeSlot}`.localeCompare(`${b.date} ${b.timeSlot}`))
  }, [bookings, searchQuery, statusFilter, dateFilter, today])

  /** Every figure below is counted from the rows themselves. Nothing here is a target or an estimate. */
  const diaryValue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalPrice, 0)
  const todayCount = bookings.filter((b) => b.date === today && b.status !== 'cancelled').length
  const awaitingCount = bookings.filter((b) => b.status === 'pending').length

  const handleStatusChange = (id: string, status: BookingStatus) =>
    onBookingsChange(updateBookingStatus(id, status))

  const handleDelete = (booking: Booking) => {
    const confirmed = window.confirm(
      `Remove ${booking.clientName} on ${formatDateFriendly(booking.date)} at ${booking.timeSlot}? This cannot be undone.`,
    )
    if (confirmed) onBookingsChange(deleteBooking(booking.id))
  }

  // Written through the store rather than spread onto the prop, so a row added while another
  // tab was open is not silently dropped.
  const handleAddBooking = (booking: Booking) => onBookingsChange(addBooking(booking))

  const handleRestoreDemo = () => {
    const confirmed = window.confirm(
      'Replace every row with the demonstration diary? Anything you have entered in this browser will be lost.',
    )
    if (confirmed) {
      saveBookings(INITIAL_BOOKINGS)
      onBookingsChange(INITIAL_BOOKINGS)
    }
  }

  /**
   * Exports what is on screen. Built as a Blob rather than a `data:` URI — the old export ran
   * the whole file through `encodeURI`, which leaves `#` intact, so any note containing one
   * truncated the download at that character.
   */
  const handleExportCsv = () => {
    const headers = [
      'Reference',
      'Client',
      'Phone',
      'Email',
      'Treatment',
      'Add-ons',
      'Date',
      'Time',
      'Price (GBP)',
      'Minutes',
      'Status',
      'To drink',
      'Notes',
    ]

    const rows = visible.map((b) =>
      [
        b.referenceNumber,
        b.clientName,
        b.clientPhone,
        b.clientEmail,
        b.serviceName,
        b.addOns.map((a) => a.name).join('; '),
        b.date,
        b.timeSlot,
        b.totalPrice,
        b.totalDurationMinutes,
        STATUS_META[b.status].label,
        b.beveragePreference,
        b.notes,
      ]
        .map(csvCell)
        .join(','),
    )

    // The BOM is what stops Excel mangling accented client names on open.
    const blob = new Blob([`\uFEFF${[headers.map(csvCell).join(','), ...rows].join('\r\n')}`], {
      type: 'text/csv;charset=utf-8',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `the-coco-club-diary-${today}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (isOpen && !unlocked) {
    return <StudioLock isOpen onClose={onClose} onUnlock={unlock} />
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Studio diary"
        subtitle="These rows live in this browser only. Marking one confirmed records that you replied on WhatsApp and agreed the time — the site cannot confirm anything by itself."
        size="xl"
        footer={
          <p className="text-[0.8125rem] text-jacobean/70">
            Showing {visible.length} of {bookings.length}{' '}
            {bookings.length === 1 ? 'request' : 'requests'} · {STUDIO_INFO.address.street},{' '}
            {STUDIO_INFO.address.city}
          </p>
        }
      >
        <div className="space-y-5 px-6 py-6">
          {/* Toolbar. The real Logomark, not the hand-typeset "CC" monogram in a gold serif that
              stood here before — there is no gold in this brand and the mark is not a letterform. */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-jacobean">
                <Logomark className="h-5 w-auto text-lace" />
              </span>
              <div>
                <p className="u-eyebrow text-redRobin-700">Studio portal</p>
                <p className="text-sm font-semibold text-jacobean">{STUDIO_INFO.name}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setAddOpen(true)}
                className="u-btn-primary u-btn-sm"
              >
                <Plus className="h-4 w-4" />
                Add to the diary
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                className="u-btn-secondary u-btn-sm"
                aria-label="Export the rows shown below as a CSV file"
              >
                <Download className="h-4 w-4" />
                Export
              </button>

              <button
                type="button"
                onClick={handleRestoreDemo}
                className="u-btn-secondary u-btn-sm"
                aria-label="Restore demo diary, replacing every row in this browser"
              >
                <RefreshCw className="h-4 w-4" />
                Restore demo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              label="In the diary"
              value={bookings.length}
              detail="Rows stored in this browser"
              icon={CalendarDays}
              tone="neutral"
            />
            <StatsCard
              label="Today"
              value={todayCount}
              detail={formatDateFriendly(today)}
              icon={Clock}
              tone="khaki"
            />
            <StatsCard
              label="Diary value"
              value={formatPrice(diaryValue)}
              detail="Every row except cancelled ones"
              icon={PoundSterling}
              tone="jacobean"
            />
            <StatsCard
              label="Awaiting reply"
              value={awaitingCount}
              detail="Nobody has answered these yet"
              icon={CircleAlert}
              tone="redRobin"
            />
          </div>

          {/* Filters. Every control here is labelled and keeps the global focus ring — the old
              selects used focus:outline-none with nothing put back in its place. */}
          <div className="flex flex-col gap-3 rounded-card border border-oyster-300 bg-pearlBush/40 p-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="lg:w-80">
              <label htmlFor="diary-search" className="u-label">
                Search
              </label>
              <div className="relative">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-jacobean/70"
                />
                <input
                  id="diary-search"
                  type="search"
                  placeholder="Name, phone, reference or treatment"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="u-field pl-10"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <div>
                <span id="diary-range-label" className="u-label">
                  Range
                </span>
                <div
                  role="group"
                  aria-labelledby="diary-range-label"
                  className="inline-flex rounded-xl border border-oyster-300 bg-lace p-1"
                >
                  {DATE_FILTERS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setDateFilter(option.value)}
                      aria-pressed={dateFilter === option.value}
                      className={`rounded-lg px-3 py-1.5 text-[0.8125rem] font-semibold transition-colors ${
                        dateFilter === option.value
                          ? 'bg-jacobean text-lace'
                          : 'text-jacobean/70 hover:bg-oyster-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="diary-status" className="u-label">
                  Status
                </label>
                <select
                  id="diary-status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | BookingStatus)}
                  className="u-field py-2.5"
                >
                  <option value="all">Any status</option>
                  {STATUS_ORDER.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_META[status].label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-card border border-dashed border-oyster-300 px-6 py-14 text-center">
              <CalendarDays aria-hidden="true" className="mx-auto h-7 w-7 text-khaki-500" />
              <p className="mt-3 text-sm font-semibold text-jacobean">Nothing here</p>
              <p className="mt-1 text-sm text-jacobean/70">
                {bookings.length === 0
                  ? 'The diary is empty. Add an appointment, or restore the demonstration rows.'
                  : 'No row matches this search and filter.'}
              </p>
            </div>
          ) : (
            /* One dense table rather than a card list: this gets read across a row, and the
               horizontal scroll is the honest way to keep the columns aligned on a phone. */
            <div className="overflow-x-auto rounded-card border border-oyster-300">
              <table className="w-full min-w-[56rem] border-collapse text-left text-sm text-jacobean">
                <thead className="bg-pearlBush/60 text-xs uppercase tracking-eyebrow text-jacobean/70">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Client
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Treatment
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      When
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Total
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-oyster-300/70 bg-lace">
                  {visible.map((booking) => (
                    <tr key={booking.id} className="align-top hover:bg-pearlBush/30">
                      <td className="px-4 py-3.5">
                        <p className="font-semibold leading-snug">{booking.clientName}</p>
                        <p className="text-[0.8125rem] text-jacobean/70">{booking.clientPhone}</p>
                        <p className="font-mono text-[0.8125rem] text-redRobin-700">
                          {booking.referenceNumber}
                        </p>
                      </td>

                      <td className="px-4 py-3.5">
                        <p className="leading-snug">{booking.serviceName}</p>
                        {booking.addOns.length > 0 && (
                          <p className="text-[0.8125rem] leading-snug text-khaki-700">
                            + {booking.addOns.map((a) => a.name).join(', ')}
                          </p>
                        )}
                        <p className="text-[0.8125rem] text-jacobean/65">
                          {formatDuration(booking.totalDurationMinutes)}
                        </p>
                      </td>

                      <td className="px-4 py-3.5">
                        {/* Friendly dates, not the raw YYYY-MM-DD the old table printed. */}
                        <p className="leading-snug">{formatDateFriendly(booking.date)}</p>
                        <p className="text-[0.8125rem] font-semibold text-jacobean/80">
                          {booking.timeSlot}
                          {booking.date === today && (
                            <span className="ml-2 rounded-full bg-khaki-100 px-2 py-0.5 text-xs font-semibold text-khaki-700">
                              Today
                            </span>
                          )}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 font-semibold">
                        {formatPrice(booking.totalPrice)}
                      </td>

                      <td className="px-4 py-3.5">
                        <label htmlFor={`status-${booking.id}`} className="sr-only">
                          Status for {booking.clientName}
                        </label>
                        <select
                          id={`status-${booking.id}`}
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(booking.id, e.target.value as BookingStatus)
                          }
                          className={`cursor-pointer rounded-full border px-3 py-1.5 text-[0.8125rem] font-semibold ${STATUS_META[booking.status].pill}`}
                        >
                          {STATUS_ORDER.map((status) => (
                            <option key={status} value={status}>
                              {STATUS_META[status].label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`https://wa.me/${booking.clientPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open WhatsApp with ${booking.clientName}`}
                            className="grid h-9 w-9 place-items-center rounded-lg text-khaki-700 transition-colors hover:bg-khaki-100"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>

                          <button
                            type="button"
                            onClick={() => setNotesFor(booking)}
                            aria-label={`Open notes for ${booking.clientName}`}
                            className="grid h-9 w-9 place-items-center rounded-lg text-jacobean/70 transition-colors hover:bg-oyster-200 hover:text-jacobean"
                          >
                            <NotebookText className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(booking)}
                            aria-label={`Remove ${booking.clientName} from the diary`}
                            className="grid h-9 w-9 place-items-center rounded-lg text-redRobin-700 transition-colors hover:bg-redRobin-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>

      <AddBookingModal
        isOpen={isOpen && isAddOpen}
        onClose={() => setAddOpen(false)}
        onAddBooking={handleAddBooking}
      />

      {/* Was a bare div with a "✕" glyph for a close button and no escape route at all. */}
      <Modal
        isOpen={isOpen && notesFor !== null}
        onClose={() => setNotesFor(null)}
        title={notesFor?.clientName ?? 'Client'}
        subtitle={notesFor ? `Reference ${notesFor.referenceNumber}` : undefined}
        size="sm"
      >
        {notesFor && (
          <dl className="space-y-4 px-6 py-6 text-sm">
            <div>
              <dt className="u-label">Appointment</dt>
              <dd>
                {formatDateFriendly(notesFor.date)} at {notesFor.timeSlot} ·{' '}
                {formatDuration(notesFor.totalDurationMinutes)} · {formatPrice(notesFor.totalPrice)}
              </dd>
            </div>

            <div>
              <dt className="u-label">To drink</dt>
              <dd className="rounded-xl border border-oyster-300 bg-pearlBush/40 px-3.5 py-3">
                {notesFor.beveragePreference || 'Not asked yet.'}
              </dd>
            </div>

            <div>
              <dt className="u-label">Notes</dt>
              {/* Multi-line history used to collapse into one paragraph — every visit ran together. */}
              <dd className="whitespace-pre-wrap rounded-xl border border-oyster-300 bg-pearlBush/40 px-3.5 py-3 leading-relaxed">
                {notesFor.notes || 'Nothing recorded.'}
              </dd>
            </div>

            <div>
              <dt className="u-label">Contact</dt>
              <dd className="space-y-1">
                <a
                  href={`tel:${notesFor.clientPhone.replace(/[^\d+]/g, '')}`}
                  className="block text-redRobin-700 underline underline-offset-4"
                >
                  {notesFor.clientPhone}
                </a>
                {notesFor.clientEmail ? (
                  <a
                    href={`mailto:${notesFor.clientEmail}`}
                    className="block break-all text-redRobin-700 underline underline-offset-4"
                  >
                    {notesFor.clientEmail}
                  </a>
                ) : (
                  <span className="block text-jacobean/65">No email given.</span>
                )}
              </dd>
            </div>

            <div>
              <dt className="u-label">Requested</dt>
              {/* createdAt is a full timestamp; the date part is what the formatter expects. */}
              <dd className="text-jacobean/70">
                {formatDateFriendly(notesFor.createdAt.slice(0, 10))}
              </dd>
            </div>
          </dl>
        )}
      </Modal>
    </>
  )
}
