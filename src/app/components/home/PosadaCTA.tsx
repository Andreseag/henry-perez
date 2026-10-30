'use client'

import Image from 'next/image'
import Link from 'next/link'
import PosadaVideoModal from './PosadaVideoModal'
import { useState } from 'react'

type PosadaCTAProps = {
  title?: string | null
  description?: string | null
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
  buttonLabel?: string | null
  buttonUrl?: string | null
}

export default function PosadaCTA({
  title,
  description,
  image,
  buttonLabel,
  buttonUrl,
}: PosadaCTAProps) {
  // Reemplaza este valor por el ID real del video de YouTube.
  const YOUTUBE_VIDEO_ID = 'aJlypy0lUfM'

  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="posada-cta" id="posada-villanueva">
      <div className="container posada-cta__inner">
        <div className="posada-cta__content">
          <span className="posada-cta__label">Una iniciativa de apoyo social</span>

          <h2 className="posada-cta__heading">Posada Villanueva</h2>

          <h3 className="posada-cta__title">
            {title || 'Un lugar donde quedarse cuando más lo necesitas.'}
          </h3>

          <p className="posada-cta__description">
            {description ||
              'Viajar a Yopal para recibir atención médica puede ser difícil cuando no se cuenta con recursos económicos o un lugar donde alojarse. La Posada Villanueva busca brindar alojamiento gratuito a pacientes de nuestro municipio y a sus acompañantes durante estos momentos.'}
          </p>

          <p className="posada-cta__note">
            El alojamiento está sujeto a revisión de la solicitud y disponibilidad.
          </p>

          <Link href={buttonUrl || '/posada-villanueva/'} className="button posada-cta__button">
            {buttonLabel || 'Conoce la labor de la Posada'}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <div className="posada-cta__media">
          <button
            type="button"
            className="posada-cta__image-frame cursor-pointer"
            onClick={() => setIsOpen(true)}
            aria-label="Reproducir video de la Posada Villanueva"
          >
            {image?.url && (
              <Image
                src={image.url}
                alt={image.alt || 'Espacio de alojamiento de la Posada Villanueva'}
                width={image.width || 1200}
                height={image.height || 900}
                className="posada-cta__image"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            )}
            <span className="posada-cta__video-overlay" aria-hidden="true" />

            <span className="posada-cta__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l10-6.5z" />
              </svg>
            </span>
          </button>

          <div className="posada-cta__accent" aria-hidden="true" />

          <div className="posada-cta__floating-note">
            <span className="posada-cta__heart" aria-hidden="true">
              ♡
            </span>

            <div className="posada-cta__note-content">
              <strong>Un apoyo cuando más importa</strong>
              <span>Alojamiento gratuito para pacientes y acompañantes.</span>
            </div>
          </div>

          <span className="posada-cta__decorative-word" aria-hidden="true">
            Acompañar
          </span>
        </div>
      </div>

      {isOpen && (
        <PosadaVideoModal videoId={YOUTUBE_VIDEO_ID} image={image} setIsVideoOpen={setIsOpen} />
      )}
    </section>
  )
}
