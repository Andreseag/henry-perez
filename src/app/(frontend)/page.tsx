import config from '@/payload.config'
import { getPayload } from 'payload'

import './styles.css'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Trajectory from '../components/home/Trajectory'
import Management from '../components/home/Management'
import Projects from '../components/home/Projects'
import Community from '../components/home/Community'
import PosadaCTA from '../components/home/PosadaCTA'
import TeamResources from '../components/home/TeamResources'
import JoinTeam from '../components/home/JoinTeam'
import ProjectsStacked from '../components/home/ProjectsStacked'

export default async function HomePage() {
  const payload = await getPayload({
    config,
  })

  const home = await payload.findGlobal({
    slug: 'home',
    depth: 2,
  })

  const heroImage =
    home.hero?.image && typeof home.hero.image === 'object' ? home.hero.image : undefined
  const aboutImage =
    home.about?.image && typeof home.about.image === 'object' ? home.about.image : undefined
  const posadaImage =
    home.posada?.image === null
      ? null
      : typeof home.posada?.image === 'object'
        ? home.posada.image
        : undefined

  const resourcesEnabled = home.resources?.enabled ?? false

  const resourcesLimit = Math.max(1, Math.min(home.resources?.limit ?? 6, 24))

  const resourcesResult = resourcesEnabled
    ? await payload.find({
        collection: 'resources',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: 'sortOrder',
        limit: resourcesLimit,
        depth: 2,
      })
    : null

  const teamResources = (resourcesResult?.docs ?? []).flatMap((resource) => {
    const file = resource.file && typeof resource.file === 'object' ? resource.file : null

    if (!file?.url) return []

    const coverImage =
      resource.coverImage && typeof resource.coverImage === 'object' ? resource.coverImage : null

    return [
      {
        id: resource.id,
        title: resource.title,
        description: resource.description,
        category: resource.category,
        file: {
          url: file.url,
          filename: file.filename,
          mimeType: file.mimeType,
        },
        coverImage: coverImage
          ? {
              url: coverImage.url,
              alt: coverImage.alt,
            }
          : null,
      },
    ]
  })

  return (
    <>
      <main>
        <Hero
          eyebrow={home.hero?.eyebrow}
          title={home.hero?.title}
          description={home.hero?.description}
          image={heroImage}
          primaryButton={home.hero?.primaryButton}
          secondaryButton={home.hero?.secondaryButton}
          descriptionRichText={home.hero?.descriptionRichText}
        />

        <About title={home.about?.title} description={home.about?.description} image={aboutImage} />

        <Trajectory items={home.trajectory} />

        <Management
          title={home.management?.title}
          description={home.management?.description}
          areas={home.management?.areas?.map((area) => ({
            ...area,
            image:
              area.image === null ? null : typeof area.image === 'object' ? area.image : undefined,
          }))}
        />

        <Projects
          projects={home.projects?.map((project) => ({
            ...project,
            image:
              project.image === null
                ? null
                : typeof project.image === 'object'
                  ? project.image
                  : undefined,
          }))}
        />

        <ProjectsStacked
          projects={home.projects?.map((project) => ({
            ...project,
            image:
              project.image === null
                ? null
                : typeof project.image === 'object'
                  ? project.image
                  : undefined,
          }))}
        />

        <Community
          title={home.community?.title}
          description={home.community?.description}
          image={
            home.community?.image === null
              ? null
              : typeof home.community?.image === 'object'
                ? home.community.image
                : undefined
          }
        />

        <PosadaCTA
          title={home.posada?.title}
          description={home.posada?.description}
          image={posadaImage}
          buttonLabel={home.posada?.buttonLabel}
          buttonUrl={home.posada?.buttonUrl}
        />

        {resourcesEnabled && (
          <TeamResources
            title={home.resources?.title}
            description={home.resources?.description}
            resources={teamResources}
          />
        )}

        <JoinTeam />
      </main>
    </>
  )
}
