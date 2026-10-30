import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type HeroProps = {
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  descriptionRichText?: SerializedEditorState | null
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
  primaryButton?: {
    label?: string | null
    url?: string | null
  } | null
  secondaryButton?: {
    label?: string | null
    url?: string | null
  } | null
}

export default function Hero({
  eyebrow,
  title,
  description,
  descriptionRichText,
  image,
  primaryButton,
  secondaryButton,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}

          {title && <h1 className="hero__title">{title}</h1>}

          {descriptionRichText && (
            <div className="hero__description">
              <RichText className="hero__description-text" data={descriptionRichText} />
            </div>
          )}

          <div className="hero__actions">
            {primaryButton?.label && (
              <a href={primaryButton.url || '#'} className="button button-primary">
                {primaryButton.label}
              </a>
            )}

            {secondaryButton?.label && (
              <a href={secondaryButton.url || '#'} className="button button-secondary">
                {secondaryButton.label}
              </a>
            )}
          </div>
        </div>

        {image?.url && (
          <div className="hero__media">
            <div className="hero__media-accent" aria-hidden="true" />

            <div className="hero__image-frame">
              <Image
                src={image.url}
                alt={image.alt || ''}
                width={image.width || 800}
                height={image.height || 1000}
                className="hero__image"
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
