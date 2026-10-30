import Image from 'next/image'

type CommunityProps = {
  title?: string | null
  description?: string | null
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
}

export default function Community({ title, description, image }: CommunityProps) {
  return (
    <section className="community" id="comunidad">
      <div className="community__image">
        {image?.url && (
          <Image
            src={image.url}
            alt={image.alt || ''}
            width={image.width || 1200}
            height={image.height || 900}
            className="community__image-element"
          />
        )}

        <div className="community__image-overlay" />
      </div>

      <div className="community__content">
        <div className="community__content-inner">
          <span className="community__label">Comunidad</span>

          {title && <h2 className="community__title">{title}</h2>}

          {description && <p className="community__description">{description}</p>}

          <div className="community__statement">
            <span className="community__statement-line" />
            <span>Trabajo cercano. Territorio. Oportunidades.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
