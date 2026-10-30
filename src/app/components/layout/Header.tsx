import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'

import SocialBar from './SocialBar'
import HeaderNavigation from '../home/HeaderNavigation'

export default async function Header() {
  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })

  const logo = settings.logo && typeof settings.logo === 'object' ? settings.logo : null

  return (
    <header className="site-header">
      <SocialBar socialLinks={settings.socialLinks} />

      <div className="container site-header__inner">
        <Link
          href="/"
          className="site-header__logo"
          aria-label={settings.siteName || 'Henry Pérez'}
        >
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

        <HeaderNavigation />

        <a href="/#equipo" className="button button-yellow site-header__cta">
          Únete al equipo
        </a>
      </div>
    </header>
  )
}
