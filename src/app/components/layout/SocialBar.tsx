import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import { FaThreads } from 'react-icons/fa6'
import { SiX } from 'react-icons/si'
import Link from 'next/link'

type SocialLinks = {
  x?: string | null
  threads?: string | null
  youtube?: string | null
  instagram?: string | null
  facebook?: string | null
  tiktok?: string | null
  whatsapp?: string | null
}

type SocialBarProps = {
  socialLinks?: SocialLinks | null
}

export default function SocialBar({ socialLinks }: SocialBarProps) {
  const links = [
    {
      name: 'X',
      href: socialLinks?.x,
      icon: <SiX />,
    },
    {
      name: 'Threads',
      href: socialLinks?.threads,
      icon: <FaThreads />,
    },
    {
      name: 'YouTube',
      href: socialLinks?.youtube,
      icon: <FaYoutube />,
    },
    {
      name: 'Instagram',
      href: socialLinks?.instagram,
      icon: <FaInstagram />,
    },
    {
      name: 'Facebook',
      href: socialLinks?.facebook,
      icon: <FaFacebookF />,
    },
    {
      name: 'TikTok',
      href: socialLinks?.tiktok,
      icon: <FaTiktok />,
    },
    {
      name: 'WhatsApp',
      href: socialLinks?.whatsapp,
      icon: <FaWhatsapp />,
    },
  ]

  const activeLinks = links.filter((link) => link.href)

  return (
    <div className="social-bar">
      <div className="container social-bar__inner">
        <p className="social-bar__hashtag">#HenryPérezAlcalde</p>

        {activeLinks.length > 0 && (
          <nav aria-label="Redes sociales">
            <ul className="social-bar__links">
              {activeLinks.map((social) => (
                <li key={social.name}>
                  <Link
                    href={social.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Henry Pérez en ${social.name}`}
                  >
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}
