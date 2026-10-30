'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css' // Estilos CSS obligatorios de Lenis

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2, // Duración del scroll en segundos (más alto = más lento/suave)
        lerp: 0.1, // Intensidad de la inercia (entre 0 y 1)
        syncTouch: true, // Suaviza también el scroll en pantallas táctiles/móviles
      }}
    >
      {children}
    </ReactLenis>
  )
}
