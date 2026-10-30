import Image from 'next/image'

type AboutProps = {
  title?: string | null
  description?: string | null
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
}

export default function About({ title, description, image }: AboutProps) {
  return (
    <section className="about">
      <div className="container about__inner">
        <div className="about__media">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt || ''}
              width={image.width || 900}
              height={image.height || 700}
              className="about__image"
            />
          )}
        </div>

        <div className="about__content">
          <span className="about__label">Sobre Henry</span>

          {title && <h2 className="about__title">{title}</h2>}

          {description && <p className="about__description">{description}</p>}
        </div>
      </div>
    </section>
  )
}
