import React, { useCallback, useEffect, useState } from 'react'
import { KeyRound, ShieldAlert } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Logomark } from '../brand/BrandMarks'

/**
 * A passcode in front of the studio diary.
 *
 * Be clear about what this is. It is NOT authentication, and it cannot be: the site has no
 * server, so any check it performs runs in the browser and the expected value ships inside the
 * JavaScript bundle. Anyone determined can read it.
 *
 * What it genuinely fixes is the realistic risk. Bookings live in `localStorage`, so the diary
 * only ever shows the rows belonging to the browser it is opened in — a client sees their own
 * request, not anyone else's. The device that actually holds a list of client names, phone
 * numbers, emails and health notes is Deoana's, and until now anyone who picked up her phone or
 * leaned over the counter could open that list from a link in the footer. A passcode stops that,
 * which is the threat that exists here.
 *
 * Set `VITE_STUDIO_PASSCODE` at build time to change it. Real protection — an account, a
 * session, data that is not readable on the device — needs a backend, and that is written down
 * as an open item in the README rather than pretended away here.
 */

const PASSCODE = import.meta.env.VITE_STUDIO_PASSCODE || 'lamotte'

/** Session, not local: closing the browser re-locks the diary on a shared or borrowed device. */
const UNLOCK_KEY = 'the_coco_club_portal_unlocked'

const readUnlocked = (): boolean => {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === 'yes'
  } catch {
    // Private mode or storage disabled: fail closed rather than open.
    return false
  }
}

export const useStudioLock = (isOpen: boolean) => {
  const [unlocked, setUnlocked] = useState(readUnlocked)

  // Re-read on each opening so a lock cleared in another tab is respected.
  useEffect(() => {
    if (isOpen) setUnlocked(readUnlocked())
  }, [isOpen])

  const unlock = useCallback(() => {
    try {
      sessionStorage.setItem(UNLOCK_KEY, 'yes')
    } catch {
      /* Unlocking still works for this render; it just will not survive a reload. */
    }
    setUnlocked(true)
  }, [])

  return { unlocked, unlock }
}

interface StudioLockProps {
  isOpen: boolean
  onClose: () => void
  onUnlock: () => void
}

export const StudioLock: React.FC<StudioLockProps> = ({ isOpen, onClose, onUnlock }) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setValue('')
      setError(false)
    }
  }, [isOpen])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (value.trim().toLowerCase() === PASSCODE.toLowerCase()) {
      onUnlock()
      return
    }
    setError(true)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Studio portal" size="sm">
      <form onSubmit={submit} className="space-y-5 px-6 py-6">
        <Logomark className="h-9 w-auto text-khaki-600" />

        <p className="text-sm text-jacobean/75">
          The diary holds client names, phone numbers and treatment notes. Enter the studio
          passcode to open it.
        </p>

        <div>
          <label htmlFor="studio-passcode" className="u-label">
            Passcode
          </label>
          <input
            id="studio-passcode"
            type="password"
            autoComplete="current-password"
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
              setError(false)
            }}
            aria-invalid={error}
            aria-describedby={error ? 'studio-passcode-error' : undefined}
            className={`u-field ${error ? 'u-field-error' : ''}`}
          />
          {error && (
            <p
              id="studio-passcode-error"
              role="alert"
              className="mt-2 flex items-center gap-1.5 text-sm text-redRobin-700"
            >
              <ShieldAlert className="h-4 w-4 shrink-0" />
              That passcode is not right.
            </p>
          )}
        </div>

        {/* Say plainly what this does and does not do, so nobody treats it as security. */}
        <p className="rounded-card border border-oyster-300/70 bg-pearlBush/50 p-3 text-[0.8125rem] leading-snug text-jacobean/70">
          This keeps the diary out of sight on a shared device. It is not encryption: the
          appointments are stored unprotected in this browser, so treat the device itself as the
          thing that keeps them private.
        </p>

        <button type="submit" className="u-btn-primary w-full">
          <KeyRound className="h-4 w-4" />
          Open the diary
        </button>
      </form>
    </Modal>
  )
}
