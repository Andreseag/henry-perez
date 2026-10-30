'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react'
import styles from './Highlightscarousel.module.css'

export type Highlight = {
  category: string
  number: string
  title: string
  description: string
  label: string
}

type Props = {
  items: Highlight[]
  /** Tiempo que dura cada slide en autoplay (ms). */
  autoPlayMs?: number
  /** Nombre accesible del carrusel. */
  label?: string
}

type DragState = {
  active: boolean
  moved: boolean
  pointerId: number
  startX: number
  startY: number
  startT: number
}

/** % del ancho que hay que arrastrar para cambiar de slide */
const SWIPE_DISTANCE = 0.18
/** px/ms: un flick rápido también cambia de slide */
const SWIPE_VELOCITY = 0.45
/** px que hay que mover antes de considerar que es un drag horizontal */
const DRAG_START = 6
/** resistencia al arrastrar más allá del primer/último slide */
const EDGE_RESISTANCE = 0.3

const pad = (n: number) => String(n).padStart(2, '0')

export default function HighlightsCarousel({
  items,
  autoPlayMs = 6500,
  label = 'Hechos relevantes',
}: Props) {
  const total = items.length

  const [index, setIndex] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(true)
  const [userPaused, setUserPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [interacted, setInteracted] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const drag = useRef<DragState>({
    active: false,
    moved: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startT: 0,
  })

  /* ---------- Navegación ---------- */

  // Avance automático (no cuenta como interacción del usuario)
  const autoNext = useCallback(() => {
    setIndex((current) => (current + 1) % total)
  }, [total])

  // Navegación hecha por el usuario
  const goTo = useCallback(
    (target: number) => {
      setInteracted(true)
      setIndex(((target % total) + total) % total)
    },
    [total],
  )

  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  /* ---------- prefers-reduced-motion ---------- */

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  /* ---------- Solo avanza solo cuando está visible en pantalla ---------- */

  useEffect(() => {
    const node = rootRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  /* ---------- Estado derivado del autoplay ---------- */

  const autoplay = total > 1 && !reducedMotion && !userPaused
  const paused = !autoplay || hovered || focused || dragging || !inView

  /* ---------- Gestos: swipe / drag ---------- */

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (total < 2) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startT: performance.now(),
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state.active || event.pointerId !== state.pointerId) return

    const dx = event.clientX - state.startX
    const dy = event.clientY - state.startY

    if (!state.moved) {
      if (Math.abs(dx) < DRAG_START) return
      // Si el gesto es más vertical que horizontal, dejamos que la página haga scroll
      if (Math.abs(dy) > Math.abs(dx)) {
        state.active = false
        return
      }
      state.moved = true
      setDragging(true)
      setInteracted(true)
      viewportRef.current?.setPointerCapture(event.pointerId)
    }

    const pullingPastStart = index === 0 && dx > 0
    const pullingPastEnd = index === total - 1 && dx < 0
    setDragX(pullingPastStart || pullingPastEnd ? dx * EDGE_RESISTANCE : dx)
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const state = drag.current
    if (!state.active || event.pointerId !== state.pointerId) return
    state.active = false
    if (!state.moved) return

    const dx = event.clientX - state.startX
    const elapsed = Math.max(1, performance.now() - state.startT)
    const velocity = dx / elapsed
    const width = viewportRef.current?.offsetWidth ?? 1

    const farEnough = Math.abs(dx) > width * SWIPE_DISTANCE
    const fastEnough = Math.abs(velocity) > SWIPE_VELOCITY && Math.abs(dx) > 24

    setDragging(false)
    setDragX(0)

    if (cancelled || !(farEnough || fastEnough)) return

    if (dx < 0 && index < total - 1) setIndex(index + 1)
    else if (dx > 0 && index > 0) setIndex(index - 1)
  }

  /* ---------- Teclado ---------- */

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      prev()
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    } else if (event.key === 'Home') {
      event.preventDefault()
      goTo(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      goTo(total - 1)
    }
  }

  if (total === 0) return null

  const rootClass = [styles.root, paused ? styles.isPaused : ''].filter(Boolean).join(' ')

  const rootStyle = { '--autoplay': `${autoPlayMs}ms` } as CSSProperties
  const trackStyle = {
    transform: `translate3d(calc(${index * -100}% + ${dragX}px), 0, 0)`,
    '--drag': `${dragX}px`,
  } as CSSProperties

  return (
    <div
      ref={rootRef}
      className={rootClass}
      style={rootStyle}
      role="region"
      aria-roledescription="carrusel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onFocus={(event) => {
        // Solo pausa con foco de teclado; un click con mouse no debe congelar el autoplay
        if (event.target.matches(':focus-visible')) setFocused(true)
      }}
      onBlur={() => setFocused(false)}
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse') setHovered(true)
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <div className={styles.frame}>
        {!interacted && total > 1 && (
          <div className={styles.swipeHint} aria-hidden="true">
            <span>Desliza</span>
            <span className={styles.hintArrows}>
              <i />
              <i />
              <i />
            </span>
          </div>
        )}

        <div
          ref={viewportRef}
          className={`${styles.viewport} ${dragging ? styles.dragging : ''}`}
          tabIndex={0}
          aria-live={autoplay ? 'off' : 'polite'}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={(event) => endDrag(event, false)}
          onPointerCancel={(event) => endDrag(event, true)}
        >
          <div className={styles.track} style={trackStyle}>
            {items.map((item, i) => (
              <article
                key={item.number}
                className={`${styles.slide} ${i === index ? styles.isActive : ''}`}
                data-tone={i % 3}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${total}`}
                aria-hidden={i !== index}
              >
                <div className={styles.visual}>
                  <span className={styles.rings} aria-hidden="true" />
                  <span className={styles.chip}>{item.category}</span>
                  <span className={styles.numberWrap} aria-hidden="true">
                    <span className={styles.number}>{item.number}</span>
                  </span>
                  <span className={styles.visualText}>Hechos que construyen una trayectoria</span>
                </div>

                <div className={styles.content}>
                  <span className={styles.eyebrow}>{item.label}</span>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                  <span className={styles.accentLine} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.counter} aria-hidden="true">
            <span key={index} className={styles.counterNow}>
              {pad(index + 1)}
            </span>
            <span className={styles.counterTotal}> / {pad(total)}</span>
          </span>

          <div className={styles.dots} role="group" aria-label="Seleccionar hito">
            {items.map((item, i) => (
              <button
                type="button"
                key={item.number}
                className={styles.dot}
                aria-label={`Mostrar hito ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i)}
              >
                <span className={styles.dotBar}>
                  {i === index && (
                    <span
                      key={index}
                      className={`${styles.dotFill} ${autoplay ? '' : styles.dotFillStatic}`}
                      onAnimationEnd={autoNext}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            {total > 1 && !reducedMotion && (
              <button
                type="button"
                className={`${styles.iconButton} ${styles.playButton}`}
                aria-label={userPaused ? 'Reanudar avance automático' : 'Pausar avance automático'}
                aria-pressed={userPaused}
                onClick={() => setUserPaused((value) => !value)}
              >
                {userPaused ? (
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
                  </svg>
                )}
              </button>
            )}

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Hito anterior"
              onClick={prev}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              className={styles.iconButton}
              aria-label="Siguiente hito"
              onClick={next}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
