'use client'

type PosadaVideoProps = {
  videoId: string
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
  setIsVideoOpen: (isOpen: boolean) => void
}

export default function PosadaVideo({ videoId, image, setIsVideoOpen }: PosadaVideoProps) {
  return (
    <>
      <div
        className="posada-video-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Video de la Posada Villanueva"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            setIsVideoOpen(false)
          }
        }}
      >
        <button
          type="button"
          className="posada-video-modal__close"
          onClick={() => setIsVideoOpen(false)}
          aria-label="Cerrar video"
        >
          ×
        </button>

        <div className="posada-video-modal__content">
          <iframe
            key={videoId}
            className="posada-video-modal__player"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&playsinline=1&rel=0`}
            title="Conoce la labor de la Posada Villanueva"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </>
  )
}
