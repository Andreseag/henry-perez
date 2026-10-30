import Image from 'next/image'
import Link from 'next/link'

import './ProjectsStacked.css'

type Project = {
  id?: string | null
  title?: string | null
  description?: string | null
  category?: string | null
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
  } | null
  url?: string | null
  featured?: boolean | null
}

type ProjectsStackedProps = {
  projects?: Project[] | null
}

export default function ProjectsStacked({ projects }: ProjectsStackedProps) {
  if (!projects?.length) return null

  return (
    <section className="projects-stacked" id="proyectos">
      <div className="projects-stacked__container">
        <header className="projects-stacked__header">
          <span className="projects-stacked__eyebrow">Proyectos</span>

          <h2 className="projects-stacked__title">Ideas que se convierten en acciones</h2>

          <p className="projects-stacked__intro">
            Iniciativas y proyectos que buscan generar oportunidades y transformar nuestro
            territorio
          </p>
        </header>

        <div className="projects-stacked__list">
          {projects.map((project, index) => {
            const isBlue = index % 2 === 0
            const cardClass = [
              'project-stack-card',
              isBlue ? 'project-stack-card--blue' : 'project-stack-card--red',
            ].join(' ')

            return (
              <article
                key={project.id || index}
                className={cardClass}
                style={
                  {
                    '--stack-index': index,
                  } as React.CSSProperties
                }
              >
                <div className="project-stack-card__content">
                  {project.category && (
                    <span className="project-stack-card__category">{project.category}</span>
                  )}

                  {project.title && <h3 className="project-stack-card__title">{project.title}</h3>}

                  {project.description && (
                    <p className="project-stack-card__description">{project.description}</p>
                  )}

                  {project.url && (
                    <Link href={project.url} className="project-stack-card__button">
                      Conocer proyecto
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>

                <div className="project-stack-card__media">
                  {project.image?.url ? (
                    <Image
                      src={project.image.url}
                      alt={project.image.alt || project.title || 'Proyecto'}
                      width={project.image.width || 1200}
                      height={project.image.height || 800}
                      className="project-stack-card__image"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="project-stack-card__image-placeholder">
                      {project.category || 'Proyecto'}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
