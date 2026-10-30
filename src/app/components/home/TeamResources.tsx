import Image from 'next/image'

type ResourceFile = {
  url?: string | null
  filename?: string | null
  mimeType?: string | null
}

type ResourceImage = {
  url?: string | null
  alt?: string | null
}

export type TeamResource = {
  id: string | number
  title: string
  description?: string | null
  category: 'social' | 'stories' | 'photos' | 'documents' | 'other'
  coverImage?: ResourceImage | null
  file: ResourceFile
}

type TeamResourcesProps = {
  title?: string | null
  description?: string | null
  resources: TeamResource[]
}

const categoryLabels: Record<TeamResource['category'], string> = {
  social: 'Redes sociales',
  stories: 'Historias y estados',
  photos: 'Fotografías',
  documents: 'Documentos',
  other: 'Otros recursos',
}

export default function TeamResources({ title, description, resources }: TeamResourcesProps) {
  if (resources.length === 0) return null

  return (
    <section className="team-resources section-padding" id="recursos">
      <div className="container">
        <div className="team-resources__header">
          <span className="team-resources__eyebrow">Biblioteca de materiales</span>
          <h2>{title || 'Recursos para compartir'}</h2>
          {description && <p>{description}</p>}
        </div>

        <div className="team-resources__grid">
          {resources.map((resource) => {
            const fileUrl = resource.file?.url

            if (!fileUrl) return null

            const imageUrl = resource.coverImage?.url
            const fileName = resource.file.filename || 'recurso'
            const isPdf = resource.file.mimeType === 'application/pdf'

            return (
              <article className="team-resources__card" key={resource.id}>
                <div className="team-resources__preview">
                  <span className="team-resources__badge">
                    {categoryLabels[resource.category] || 'Recurso'}
                  </span>

                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={resource.coverImage?.alt || resource.title}
                      loading="lazy"
                      className="team-resources__image"
                    />
                  ) : (
                    <div className="team-resources__file-placeholder">
                      <div className="team-resources__file-icon" aria-hidden="true">
                        {isPdf ? 'PDF' : 'DOC'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="team-resources__content">
                  <h3>{resource.title}</h3>

                  {resource.description && <p>{resource.description}</p>}

                  <a
                    href={fileUrl}
                    className="button team-resources__download button-yellow"
                    download={fileName}
                  >
                    <span>Descargar recurso</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
