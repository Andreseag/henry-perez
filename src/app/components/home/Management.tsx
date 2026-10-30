import Image from 'next/image'
import Link from 'next/link'

type ManagementArea = {
  id?: string | null
  title?: string | null
  description?: string | null
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
  url?: string | null
}

type ManagementProps = {
  title?: string | null
  description?: string | null
  areas?: ManagementArea[] | null
}

export default function Management({ title, description, areas }: ManagementProps) {
  if (!areas?.length) {
    return null
  }

  return (
    <section className="management" id="gestion">
      <div className="container">
        <div className="management__header">
          <span className="management__label">Gestión</span>

          {title && <h2 className="management__title">{title}</h2>}

          {description && <p className="management__description">{description}</p>}
        </div>

        <div className="management__grid">
          {areas.map((area, index) => {
            const content = (
              <>
                {area.image?.url && (
                  <div className="management__image-wrapper">
                    <Image
                      src={area.image.url}
                      alt={area.image.alt || area.title || ''}
                      width={area.image.width || 800}
                      height={area.image.height || 600}
                      className="management__image"
                    />
                  </div>
                )}

                <div className="management__content">
                  <span className="management__number">{String(index + 1).padStart(2, '0')}</span>

                  {area.title && <h3 className="management__area-title">{area.title}</h3>}

                  {area.description && (
                    <p className="management__area-description">{area.description}</p>
                  )}

                  {area.url && <span className="management__link">Conocer más →</span>}
                </div>
              </>
            )

            if (area.url) {
              return (
                <Link href={area.url} className="management__card" key={area.id || index}>
                  {content}
                </Link>
              )
            }

            return (
              <article className="management__card" key={area.id || index}>
                {content}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
