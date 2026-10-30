'use client'

import { FormEvent, useState } from 'react'
import './JoinTeam.css'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  areaOfInterest: '',
  professionalProfile: '',
  linkedin: '',
  message: '',
  dataProcessingConsent: false,
  website: '', // Honeypot anti-spam
}

const areas = [
  { value: 'communications', label: 'Comunicaciones' },
  { value: 'community', label: 'Trabajo comunitario' },
  { value: 'social-management', label: 'Gestión social' },
  { value: 'volunteering', label: 'Voluntariado' },
  { value: 'professional', label: 'Apoyo profesional' },
  { value: 'other', label: 'Otra área' },
]

export default function JoinTeam() {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function closeModal() {
    if (isSubmitting) return

    setIsOpen(false)
    setError('')
    setSuccess(false)
  }

  function updateField(field: keyof typeof initialForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/team-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'No fue posible enviar tu postulación.')
      }

      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error. Inténtalo nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="join-team" id="equipo">
        <div className="container">
          <div className="join-team__content">
            <span className="join-team__eyebrow">Construyamos juntos</span>

            <h2 className="join-team__title">
              ¿Quieres ser parte del <span>cambio?</span>
            </h2>

            <p className="join-team__description">
              Creemos en las personas que quieren aportar, trabajar por su comunidad y construir
              nuevas oportunidades. Cuéntanos quién eres y cómo te gustaría sumarte.
            </p>

            <button
              type="button"
              className="join-team__button button button-yellow"
              onClick={() => setIsOpen(true)}
            >
              Súmate al equipo
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {isOpen && (
        <div
          className="join-modal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal()
          }}
        >
          <section
            className="join-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-modal-title"
          >
            <button
              type="button"
              className="join-modal__close"
              aria-label="Cerrar formulario"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              ×
            </button>

            {success ? (
              <div className="join-modal__success" role="status">
                <span className="join-modal__success-icon" aria-hidden="true">
                  ✓
                </span>
                <h2 id="join-modal-title">¡Gracias por sumarte!</h2>
                <p>
                  Recibimos tu información. Gracias por tu interés en aportar y construir junto a
                  nuestra comunidad.
                </p>
                <button type="button" className="join-modal__submit" onClick={closeModal}>
                  Listo
                </button>
              </div>
            ) : (
              <>
                <span className="join-modal__eyebrow">Súmate al equipo</span>
                <h2 id="join-modal-title">Queremos conocerte</h2>
                <p className="join-modal__intro">
                  Completa tus datos y cuéntanos cómo te gustaría participar.
                </p>

                <form className="join-form" onSubmit={handleSubmit}>
                  <div className="join-form__grid">
                    <label className="join-form__field">
                      Nombre completo *
                      <input
                        name="fullName"
                        autoComplete="name"
                        required
                        maxLength={120}
                        value={form.fullName}
                        onChange={(event) => updateField('fullName', event.target.value)}
                      />
                    </label>

                    <label className="join-form__field">
                      Correo electrónico *
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        maxLength={254}
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                      />
                    </label>

                    <label className="join-form__field">
                      Teléfono *
                      <input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        maxLength={40}
                        value={form.phone}
                        onChange={(event) => updateField('phone', event.target.value)}
                      />
                    </label>

                    <label className="join-form__field">
                      Ciudad o municipio *
                      <input
                        name="city"
                        autoComplete="address-level2"
                        required
                        maxLength={120}
                        value={form.city}
                        onChange={(event) => updateField('city', event.target.value)}
                      />
                    </label>

                    <label className="join-form__field join-form__field--full">
                      ¿En qué área te gustaría participar? *
                      <select
                        name="areaOfInterest"
                        required
                        value={form.areaOfInterest}
                        onChange={(event) => updateField('areaOfInterest', event.target.value)}
                      >
                        <option value="">Selecciona un área</option>
                        {areas.map((area) => (
                          <option key={area.value} value={area.value}>
                            {area.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="join-form__field">
                      Profesión o perfil
                      <input
                        name="professionalProfile"
                        maxLength={160}
                        placeholder="Ej. Comunicador, estudiante..."
                        value={form.professionalProfile}
                        onChange={(event) => updateField('professionalProfile', event.target.value)}
                      />
                    </label>

                    <label className="join-form__field">
                      LinkedIn o perfil profesional
                      <input
                        name="linkedin"
                        type="url"
                        maxLength={500}
                        placeholder="https://..."
                        value={form.linkedin}
                        onChange={(event) => updateField('linkedin', event.target.value)}
                      />
                    </label>

                    <label className="join-form__field join-form__field--full">
                      Cuéntanos sobre ti y cómo quieres aportar *
                      <textarea
                        name="message"
                        required
                        maxLength={2000}
                        rows={4}
                        value={form.message}
                        onChange={(event) => updateField('message', event.target.value)}
                      />
                    </label>
                  </div>

                  {/* Campo oculto: no debe ser completado por personas. */}
                  <div className="join-form__honeypot" aria-hidden="true">
                    <label>
                      No completar
                      <input
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(event) => updateField('website', event.target.value)}
                      />
                    </label>
                  </div>

                  <label className="join-form__consent">
                    <input
                      type="checkbox"
                      required
                      checked={form.dataProcessingConsent}
                      onChange={(event) =>
                        updateField('dataProcessingConsent', event.target.checked)
                      }
                    />
                    <span>
                      Autorizo el tratamiento de mis datos personales para gestionar esta
                      postulación. *
                    </span>
                  </label>

                  {error && (
                    <p className="join-form__error" role="alert">
                      {error}
                    </p>
                  )}

                  <button type="submit" className="join-modal__submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar postulación'}
                  </button>

                  <p className="join-form__required">* Campos obligatorios</p>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </>
  )
}
