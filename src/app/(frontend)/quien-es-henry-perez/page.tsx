'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import HighlightsCarousel from '@/app/components/Highlightscarousel/Highlightscarousel'

const academicTimeline = [
  {
    year: 'AÑO POR DEFINIR',
    title: 'Formación académica',
    institution: 'Institución educativa por confirmar',
    description:
      '[DATO DEMO] Aquí se incluirá el título obtenido, la institución y una breve descripción de su formación.',
  },
  {
    year: 'AÑO POR DEFINIR',
    title: 'Estudios complementarios',
    institution: 'Institución por confirmar',
    description:
      '[DATO DEMO] Cursos, diplomados o especializaciones que estén respaldados por fuentes verificables.',
  },
]

const politicalTimeline = [
  {
    year: 'PERÍODO POR DEFINIR',
    title: 'Experiencia en el servicio público',
    institution: 'Cargo y entidad por confirmar',
    description:
      '[DATO DEMO] Se documentará el cargo desempeñado, sus responsabilidades y el período correspondiente.',
  },
  {
    year: 'PERÍODO POR DEFINIR',
    title: 'Participación en iniciativas públicas',
    institution: 'Entidad o iniciativa por confirmar',
    description:
      '[DATO DEMO] Se describirá la participación acreditada y su relación con las comunidades.',
  },
]

const highlights = [
  {
    category: 'Educación',
    number: '01',
    title: 'Iniciativa educativa de ejemplo',
    description:
      '[DATO DEMO] Resumen provisional de una iniciativa educativa. Reemplazar por información verificada.',
    label: 'Ejemplo de contenido',
  },
  {
    category: 'Infraestructura',
    number: '02',
    title: 'Proyecto de infraestructura de ejemplo',
    description:
      '[DATO DEMO] Aquí se describirá un proyecto, su alcance y los resultados que puedan documentarse.',
    label: 'Ejemplo de contenido',
  },
  {
    category: 'Comunidad',
    number: '03',
    title: 'Trabajo comunitario de ejemplo',
    description:
      '[DATO DEMO] Espacio para un hecho relevante relacionado con la participación ciudadana.',
    label: 'Ejemplo de contenido',
  },
]

const sectors = [
  {
    id: 'educacion',
    label: 'Educación',
    intro: 'Iniciativas relacionadas con formación y oportunidades educativas.',
    projects: [
      {
        title: 'Mejoramiento educativo',
        type: 'Proyecto de ejemplo',
        description: '[DATO DEMO] Descripción provisional de una iniciativa del sector educativo.',
        status: 'Información por verificar',
      },
      {
        title: 'Acceso a oportunidades de formación',
        type: 'Iniciativa de ejemplo',
        description:
          '[DATO DEMO] Contenido de muestra para demostrar cómo se visualizarán las iniciativas.',
        status: 'Información por verificar',
      },
    ],
  },
  {
    id: 'salud',
    label: 'Salud',
    intro: 'Acciones e iniciativas relacionadas con servicios y bienestar.',
    projects: [
      {
        title: 'Fortalecimiento de servicios de salud',
        type: 'Proyecto de ejemplo',
        description:
          '[DATO DEMO] Aquí se documentarán el alcance, los beneficiarios y las evidencias disponibles.',
        status: 'Información por verificar',
      },
    ],
  },
  {
    id: 'infraestructura',
    label: 'Infraestructura',
    intro: 'Obras, mejoramiento de espacios y proyectos territoriales.',
    projects: [
      {
        title: 'Mejoramiento de infraestructura local',
        type: 'Proyecto de ejemplo',
        description: '[DATO DEMO] Ejemplo de tarjeta para un proyecto de infraestructura.',
        status: 'Información por verificar',
      },
      {
        title: 'Recuperación de espacios públicos',
        type: 'Iniciativa de ejemplo',
        description: '[DATO DEMO] Espacio para describir el estado y los resultados documentados.',
        status: 'Información por verificar',
      },
    ],
  },
  {
    id: 'desarrollo-social',
    label: 'Desarrollo social',
    intro: 'Programas e iniciativas para las comunidades.',
    projects: [
      {
        title: 'Participación y desarrollo comunitario',
        type: 'Iniciativa de ejemplo',
        description: '[DATO DEMO] Contenido provisional para iniciativas sociales.',
        status: 'Información por verificar',
      },
    ],
  },
  {
    id: 'seguridad',
    label: 'Seguridad',
    intro: 'Convivencia, participación y seguridad ciudadana.',
    projects: [
      {
        title: 'Convivencia ciudadana',
        type: 'Iniciativa de ejemplo',
        description: '[DATO DEMO] Este contenido se reemplazará cuando existan datos confirmados.',
        status: 'Información por verificar',
      },
    ],
  },
  {
    id: 'empleo',
    label: 'Empleo',
    intro: 'Empleo, emprendimiento y desarrollo económico.',
    projects: [
      {
        title: 'Oportunidades económicas',
        type: 'Proyecto de ejemplo',
        description: '[DATO DEMO] Espacio provisional para iniciativas económicas.',
        status: 'Información por verificar',
      },
    ],
  },
  {
    id: 'medio-ambiente',
    label: 'Medio ambiente',
    intro: 'Acciones relacionadas con el entorno y la sostenibilidad.',
    projects: [
      {
        title: 'Cuidado del entorno',
        type: 'Iniciativa de ejemplo',
        description: '[DATO DEMO] Espacio provisional para iniciativas ambientales.',
        status: 'Información por verificar',
      },
    ],
  },
  {
    id: 'otros',
    label: 'Otros',
    intro: 'Otras iniciativas y asuntos de interés público.',
    projects: [
      {
        title: 'Iniciativa por documentar',
        type: 'Contenido de ejemplo',
        description: '[DATO DEMO] Aquí podrán aparecer gestiones de otros sectores.',
        status: 'Información por verificar',
      },
    ],
  },
]

const navigation = [
  { href: '#sobre-henry', label: 'Sobre Henry' },
  { href: '#trayectoria-academica', label: 'Formación' },
  { href: '#trayectoria-politica', label: 'Trayectoria política' },
  { href: '#hechos-relevantes', label: 'Hechos relevantes' },
  { href: '#gestion-por-sectores', label: 'Gestión por sectores' },
]

export default function QuienEsHenryPerezPage() {
  const [activeHighlight, setActiveHighlight] = useState(0)
  const [activeSector, setActiveSector] = useState('educacion')

  const highlight = highlights[activeHighlight]
  const sector = sectors.find((item) => item.id === activeSector) ?? sectors[0]

  return (
    <main className={styles.page}>
      <div className={styles.demoNotice} role="status">
        <span className={styles.demoDot} />
        Versión de demostración · Contenido provisional pendiente de verificar
      </div>

      <section className={styles.hero} id="sobre-henry">
        <div className={styles.heroPattern} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>CONOCE SU HISTORIA</p>
              <h1>
                ¿Quién es
                <br />
                <span>Henry Pérez?</span>
              </h1>

              <p className={styles.heroLead}>
                Una mirada a su historia, formación, trayectoria pública y las iniciativas que han
                marcado su camino.
              </p>

              <p className={styles.heroDescription}>
                Esta sección reunirá información biográfica, experiencias y gestiones documentadas
                para que puedas conocer su trayectoria de manera clara y organizada.
              </p>

              <div className={styles.heroActions}>
                <a href="#trayectoria-academica" className={styles.buttonPrimary}>
                  Conoce su trayectoria <span aria-hidden="true">↓</span>
                </a>
                <a href="#gestion-por-sectores" className={styles.buttonSecondary}>
                  Explorar gestiones
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.portraitPlaceholder}>
                <span className={styles.portraitMonogram}>HP</span>
                <span className={styles.portraitCaption}>
                  Fotografía de Henry Pérez
                  <br />
                  <small>Reemplazar por imagen autorizada</small>
                </span>
              </div>
              <div className={styles.heroFloatingCard}>
                <span className={styles.floatingIcon}>✳</span>
                <div>
                  <strong>Trayectoria y gestión</strong>
                  <p>Información organizada por etapas y sectores</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroBottom}>
            <span>SU HISTORIA</span>
            <span className={styles.heroBottomLine} />
            <span>SU TRAYECTORIA</span>
            <span className={styles.heroBottomLine} />
            <span>SU GESTIÓN</span>
          </div>
        </div>
      </section>

      <nav className={styles.sectionNav} aria-label="Secciones de la página">
        <div className={styles.container}>
          {navigation.map((item, index) => (
            <a href={item.href} key={item.href}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section className={styles.section} id="trayectoria-academica">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>01 / FORMACIÓN</p>
              <h2>
                Trayectoria <span>académica</span>
              </h2>
            </div>
            <p className={styles.sectionIntro}>
              La formación y los conocimientos que han contribuido a su desarrollo personal y
              profesional.
            </p>
          </div>

          <div className={styles.timeline}>
            {academicTimeline.map((item, index) => (
              <article className={styles.timelineItem} key={item.title}>
                <div className={styles.timelineRail}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className={styles.timelineCard}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p className={styles.timelineInstitution}>{item.institution}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.politicalSection}`} id="trayectoria-politica">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>02 / SERVICIO PÚBLICO</p>
              <h2>
                Trayectoria <span>política</span>
              </h2>
            </div>
            <p className={styles.sectionIntro}>
              Una cronología de cargos, responsabilidades y experiencias públicas, organizada por
              períodos.
            </p>
          </div>

          <div className={styles.politicalGrid}>
            <div className={styles.politicalStatement}>
              <span className={styles.statementMark}>“</span>
              <h3>Una trayectoria que debe contarse con claridad.</h3>
              <p>
                Aquí documentaremos cada etapa con sus fechas, funciones y fuentes de referencia.
              </p>
              <span className={styles.statementFootnote}>INFORMACIÓN BIOGRÁFICA POR CONFIRMAR</span>
            </div>

            <div className={styles.timeline}>
              {politicalTimeline.map((item, index) => (
                <article className={styles.timelineItem} key={item.title}>
                  <div className={styles.timelineRail}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.timelineCard}>
                    <span className={styles.timelineYear}>{item.year}</span>
                    <h3>{item.title}</h3>
                    <p className={styles.timelineInstitution}>{item.institution}</p>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.highlightsSection}`} id="hechos-relevantes">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>03 / HITOS</p>
              <h2>
                Hechos <span>relevantes</span>
              </h2>
            </div>
            <p className={styles.sectionIntro}>
              Una selección de hitos destacados de su trayectoria, con contexto y documentación.
            </p>
          </div>

          <HighlightsCarousel items={highlights} />

          {/* <div className={styles.highlightCarousel}>
            <div className={styles.highlightVisual}>
              <span className={styles.highlightNumber}>{highlight.number}</span>
              <span className={styles.highlightVisualLabel}>{highlight.category}</span>
              <span className={styles.highlightVisualText}>
                HECHOS QUE CONSTRUYEN UNA TRAYECTORIA
              </span>
            </div>

            <div className={styles.highlightContent}>
              <span className={styles.contentEyebrow}>{highlight.label}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>

              <div className={styles.carouselControls}>
                <span className={styles.carouselCounter}>
                  {String(activeHighlight + 1).padStart(2, '0')}
                  <span> / {String(highlights.length).padStart(2, '0')}</span>
                </span>

                <div className={styles.carouselButtons}>
                  <button
                    type="button"
                    aria-label="Hito anterior"
                    onClick={() =>
                      setActiveHighlight(
                        (activeHighlight - 1 + highlights.length) % highlights.length,
                      )
                    }
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Siguiente hito"
                    onClick={() => setActiveHighlight((activeHighlight + 1) % highlights.length)}
                  >
                    →
                  </button>
                </div>
              </div>

              <div className={styles.carouselDots}>
                {highlights.map((item, index) => (
                  <button
                    type="button"
                    key={item.number}
                    aria-label={`Mostrar hito ${index + 1}`}
                    aria-current={index === activeHighlight ? 'true' : undefined}
                    className={index === activeHighlight ? styles.activeDot : undefined}
                    onClick={() => setActiveHighlight(index)}
                  />
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.managementSection}`}
        id="gestion-por-sectores"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>04 / INICIATIVAS Y PROYECTOS</p>
              <h2>
                Su gestión, <span>por sectores</span>
              </h2>
            </div>
            <p className={styles.sectionIntro}>
              Explora las iniciativas organizadas por tema. En la versión conectada, este contenido
              vendrá de Payload CMS.
            </p>
          </div>

          <div className={styles.sectorTabs} role="tablist" aria-label="Sectores de gestión">
            {sectors.map((item) => (
              <button
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-controls={`panel-${item.id}`}
                aria-selected={activeSector === item.id}
                className={activeSector === item.id ? styles.activeTab : undefined}
                key={item.id}
                onClick={() => setActiveSector(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className={styles.sectorPanel}
            role="tabpanel"
            id={`panel-${sector.id}`}
            aria-labelledby={`tab-${sector.id}`}
          >
            <div className={styles.sectorPanelHeader}>
              <div>
                <span className={styles.contentEyebrow}>SECTOR</span>
                <h3>{sector.label}</h3>
              </div>
              <p>{sector.intro}</p>
            </div>

            <div className={styles.projectGrid}>
              {sector.projects.map((project, index) => (
                <article className={styles.projectCard} key={project.title}>
                  <div className={styles.projectCardTop}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className={styles.projectType}>{project.type}</span>
                  </div>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className={styles.projectCardBottom}>
                    <span className={styles.projectStatus}>{project.status}</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.managementFooter}>
            <p>
              Los proyectos publicados se podrán consultar individualmente cuando conectemos esta
              sección con Payload.
            </p>
            <Link href="/gestion">Ver todas las gestiones →</Link>
          </div>
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>CONOCE MÁS</p>
          <h2>Una historia que merece ser contada con hechos.</h2>
          <p>
            Esta página irá creciendo a medida que incorporemos información confirmada, resultados y
            fuentes documentales.
          </p>
          <a href="#sobre-henry" className={styles.buttonPrimary}>
            Volver al inicio ↑
          </a>
        </div>
      </section>
    </main>
  )
}
