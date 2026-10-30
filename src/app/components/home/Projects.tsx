import Image from 'next/image'
import Link from 'next/link'

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

type ProjectsProps = {
  projects?: Project[] | null
}

export default function Projects({ projects }: ProjectsProps) {
  if (!projects?.length) {
    return null
  }

  const featuredProject = projects.find((project) => project.featured) || projects[0]

  const secondaryProjects = projects.filter((project) => project !== featuredProject)

  return (
    <section className="projects" id="proyectos">
      <div className="container">
        <div className="projects__header">
          <div>
            <span className="projects__label">Proyectos</span>

            <h2 className="projects__title">Ideas que se convierten en acciones.</h2>
          </div>

          <p className="projects__intro">
            Iniciativas y proyectos que buscan generar oportunidades y transformar nuestro
            territorio.
          </p>
        </div>

        <div className="projects__featured">
          <ProjectCard project={featuredProject} featured />
        </div>

        {secondaryProjects.length > 0 && (
          <div className="projects__grid">
            {secondaryProjects.map((project, index) => (
              <ProjectCard key={project.id || index} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const content = (
    <>
      {project.image?.url && (
        <div className="project-card__image-wrapper">
          <Image
            src={project.image.url}
            alt={project.image.alt || project.title || ''}
            width={project.image.width || 1200}
            height={project.image.height || 800}
            className="project-card__image"
          />
        </div>
      )}

      <div className="project-card__content">
        {project.category && <span className="project-card__category">{project.category}</span>}

        {project.title && <h3 className="project-card__title">{project.title}</h3>}

        {project.description && <p className="project-card__description">{project.description}</p>}

        {project.url && <span className="project-card__link">Conocer proyecto →</span>}
      </div>
    </>
  )

  if (project.url) {
    return (
      <Link
        href={project.url}
        className={`project-card ${featured ? 'project-card--featured' : ''}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      {content}
    </article>
  )
}
