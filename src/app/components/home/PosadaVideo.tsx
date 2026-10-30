// 'use client'

import { useEffect, useState, type ReactNode } from 'react'

type PosadaVideoProps = {
  videoId: string
  children: ReactNode
}

export default function PosadaVideo({ videoId, children }: PosadaVideoProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        className="posada-cta__video-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Reproducir video de la Posada Villanueva"
      >
        {children}

        <span className="posada-cta__video-overlay" aria-hidden="true" />

        <span className="posada-cta__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13l10-6.5z" />
          </svg>
        </span>

        <span className="posada-cta__video-label">Conoce nuestra labor</span>
      </button>

      {isOpen && (
        <div
          className="posada-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Video de la Posada Villanueva"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false)
            }
          }}
        >
          <button
            type="button"
            className="posada-video-modal__close"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar video"
          >
            ×
          </button>

          <div className="posada-video-modal__content">
            <iframe
              className="posada-video-modal__player"
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&playsinline=1&rel=0`}
              title="Conoce la labor de la Posada Villanueva"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  )
}
