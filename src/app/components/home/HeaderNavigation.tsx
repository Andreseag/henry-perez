'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/#trayectoria', label: 'Trayectoria' },
  { href: '/#gestion', label: 'Gestión' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#comunidad', label: 'Comunidad' },
  { href: '/posada-villanueva/', label: 'Posada Villanueva' },
]

export default function HeaderNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <nav
        id="primary-navigation"
        className={`site-header__nav${isOpen ? ' is-open' : ''}`}
        aria-label="Navegación principal"
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="site-header__menu-toggle"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-controls="primary-navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span />
        <span />
        <span />
      </button>
    </>
  )
}
