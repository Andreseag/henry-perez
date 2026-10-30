import Link from 'next/link'
import config from '@/payload.config'
import { getPayload } from 'payload'
import Image from 'next/image'

// import './Footer.css'

const navigationLinks = [
  { label: 'Trayectoria', href: '/#trayectoria' },
  { label: 'Gestión', href: '/#gestion' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Comunidad', href: '/#comunidad' },
]

const usefulLinks = [
  { label: 'Posada Villanueva', href: '/posada-villanueva' },
  { label: 'Recursos para compartir', href: '/#recursos' },
  { label: 'Únete al equipo', href: '/#equipo' },
]

const socialPlatforms = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'x', label: 'X / Twitter' },
  { key: 'threads', label: 'Threads' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'whatsapp', label: 'WhatsApp' },
] as const

export default async function Footer() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })

  const siteName = settings.siteName || 'Henry Pérez'
  const description =
    settings.description ||
    'Una trayectoria construida desde el territorio, el servicio y el compromiso con nuestra gente.'

  const socialLinks = settings.socialLinks

  const configuredSocialLinks = socialPlatforms.filter(({ key }) => {
    return Boolean(socialLinks?.[key]?.trim())
  })

  const footerText = settings.footerText

  const logo = settings.logo && typeof settings.logo === 'object' ? settings.logo : null

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Link href="/#inicio" className="site-footer__logo">
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || settings.siteName || 'Logo'}
                  width={logo.width || 200}
                  height={logo.height || 70}
                  priority
                  className="site-header__logo-image"
                />
              ) : (
                <span>{settings.siteName || 'Henry Pérez'}</span>
              )}
            </Link>

            <p className="site-footer__description">{description}</p>

            {footerText && <p className="site-footer__message">{footerText}</p>}

            {configuredSocialLinks.length > 0 && (
              <div className="site-footer__socials" aria-label="Redes sociales">
                {configuredSocialLinks.map(({ key, label }) => (
                  <a
                    key={key}
                    href={socialLinks?.[key] ?? ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social-link"
                    aria-label={label}
                  >
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <nav className="site-footer__nav" aria-label="Navegación del pie de página">
            <h2 className="site-footer__heading">Explora</h2>

            <ul>
              {navigationLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__nav" aria-label="Enlaces de interés">
            <h2 className="site-footer__heading">Enlaces de interés</h2>

            <ul>
              {usefulLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {siteName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
