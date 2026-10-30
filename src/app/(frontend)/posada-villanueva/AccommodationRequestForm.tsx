'use client'

import { useState } from 'react'
import './posada.css'

const municipalities = [
  'Villanueva',
  'Aguazul',
  'Chámeza',
  'Hato Corozal',
  'La Salina',
  'Maní',
  'Monterrey',
  'Nunchía',
  'Orocué',
  'Paz de Ariporo',
  'Pore',
  'Recetor',
  'Sabanalarga',
  'Sácama',
  'San Luis de Palenque',
  'Támara',
  'Tauramena',
  'Trinidad',
  'Yopal',
]

const hospitals = [
  'Hospital Regional Orinoquía',
  'Hospital Materno Infantil',
  'CLÍNICA CASANARE',
  'HORO',
  'OTRO',
]

const epsOptions = [
  'CAPRESOCA',
  'NUEVA EPS',
  'SOAT',
  'EPS SANITAS',
  'COLMÉDICA',
  'COOSALUD',
  'OTRO',
]

const initialValues = {
  patientName: '',
  patientPhone: '',
  patientDocument: '',
  patientCase: '',
  municipality: 'Villanueva',
  hospital: 'Hospital Regional Orinoquía',
  otherHospital: '',
  eps: 'CAPRESOCA',
  otherEps: '',
  sisben: '',
  companionName: '',
  companionDocument: '',
  companionPhone: '',
  relationship: '',
  admissionDate: '',
  observations: '',
  privacyConsent: false,
  website: '',
}

type FormValues = typeof initialValues

export default function AccommodationRequestForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [applicationId, setApplicationId] = useState('')

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: '' }))
  }

  function validateStep(currentStep: number) {
    const nextErrors: Record<string, string> = {}

    if (currentStep === 0) {
      if (values.patientName.trim().length < 3) {
        nextErrors.patientName = 'Ingresa el nombre completo.'
      }
      if (!values.patientPhone.trim()) {
        nextErrors.patientPhone = 'Ingresa un teléfono de contacto.'
      }
      if (!values.patientDocument.trim()) {
        nextErrors.patientDocument = 'Ingresa el documento.'
      }
      if (values.patientCase.trim().length < 10) {
        nextErrors.patientCase = 'Describe brevemente el caso.'
      }
    }

    if (currentStep === 1) {
      if (!values.municipality) {
        nextErrors.municipality = 'Selecciona el municipio.'
      }
      if (!values.hospital) {
        nextErrors.hospital = 'Selecciona el lugar de remisión.'
      }
      if (values.hospital === 'OTRO' && !values.otherHospital.trim()) {
        nextErrors.otherHospital = 'Especifica el hospital.'
      }
      if (!values.eps) {
        nextErrors.eps = 'Selecciona la EPS.'
      }
      if (values.eps === 'OTRO' && !values.otherEps.trim()) {
        nextErrors.otherEps = 'Especifica la entidad.'
      }
    }

    if (currentStep === 2) {
      if (!values.admissionDate) {
        nextErrors.admissionDate = 'Selecciona la fecha solicitada.'
      }
      if (!values.privacyConsent) {
        nextErrors.privacyConsent = 'Debes aceptar el aviso de privacidad.'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function fieldError(name: string) {
    return errors[name] ? (
      <span className="posada-form__error" role="alert">
        {errors[name]}
      </span>
    ) : null
  }

  if (success) {
    return (
      <div className="posada-form__success" role="status">
        <h3>¡Recibimos tu solicitud!</h3>
        <p>
          Tu información fue registrada. El equipo responsable deberá revisarla y ponerse en
          contacto contigo según el proceso de atención de La Posada.
        </p>
        <p>Guarda el número de solicitud que aparece a continuación.</p>
        {applicationId && (
          <p>
            Número de solicitud: <strong>{applicationId}</strong>
          </p>
        )}
        <button
          type="button"
          className="button button-primary"
          onClick={() => {
            setValues(initialValues)
            setStep(0)
            setErrors({})
            setSuccess(false)
          }}
        >
          Registrar otra solicitud
        </button>
      </div>
    )
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    if (!validateStep(2)) return

    setSubmitting(true)

    try {
      const response = await fetch('/api/posada-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrors(result.errors || {})
        setErrorMessage(result.message || 'Revisa los datos e inténtalo nuevamente.')
        return
      }

      setApplicationId(String(result.applicationId || ''))
      setSuccess(true)
      setErrorMessage('')
      // Conservamos el identificador para mostrarlo en la confirmación.
      setValues((previous) => ({
        ...previous,
        website: String(result.applicationId || ''),
      }))
    } catch {
      setErrorMessage(
        'No fue posible enviar la solicitud. Comprueba tu conexión e inténtalo nuevamente.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="posada-form" onSubmit={handleSubmit} noValidate>
      <div className="posada-form__header">
        <span>Solicitud de alojamiento</span>
        <h2>{['Datos del paciente', 'Procedencia y afiliación', 'Acompañante y envío'][step]}</h2>
        <p>Paso {step + 1} de 3</p>
        <div
          className="posada-form__progress"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
        >
          <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
      </div>

      {step === 0 && (
        <div className="posada-form__fields">
          <label>
            Nombre completo del paciente *
            <input
              required
              autoComplete="name"
              value={values.patientName}
              onChange={(e) => update('patientName', e.target.value)}
              aria-invalid={Boolean(errors.patientName)}
            />
            {fieldError('patientName')}
          </label>

          <label>
            Teléfono móvil del paciente *
            <input
              required
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={values.patientPhone}
              onChange={(e) => update('patientPhone', e.target.value)}
              aria-invalid={Boolean(errors.patientPhone)}
            />
            {fieldError('patientPhone')}
          </label>

          <label>
            Número de documento del paciente *
            <input
              required
              value={values.patientDocument}
              onChange={(e) => update('patientDocument', e.target.value)}
              aria-invalid={Boolean(errors.patientDocument)}
            />
            {fieldError('patientDocument')}
          </label>

          <label className="posada-form__full">
            Describe el caso del paciente *
            <textarea
              required
              rows={5}
              maxLength={3000}
              value={values.patientCase}
              onChange={(e) => update('patientCase', e.target.value)}
              aria-invalid={Boolean(errors.patientCase)}
              aria-describedby="patient-case-help"
            />
            <small id="patient-case-help">
              Comparte solo la información necesaria para evaluar la solicitud.
            </small>
            {fieldError('patientCase')}
          </label>
        </div>
      )}

      {step === 1 && (
        <div className="posada-form__fields">
          <label>
            Municipio de origen *
            <select
              value={values.municipality}
              onChange={(e) => update('municipality', e.target.value)}
            >
              {municipalities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {fieldError('municipality')}
          </label>

          <label>
            Lugar de remisión u hospitalización *
            <select value={values.hospital} onChange={(e) => update('hospital', e.target.value)}>
              {hospitals.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {fieldError('hospital')}
          </label>

          {values.hospital === 'OTRO' && (
            <label className="posada-form__full">
              Nombre del hospital *
              <input
                value={values.otherHospital}
                onChange={(e) => update('otherHospital', e.target.value)}
              />
              {fieldError('otherHospital')}
            </label>
          )}

          <label>
            EPS o entidad de afiliación *
            <select value={values.eps} onChange={(e) => update('eps', e.target.value)}>
              {epsOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {fieldError('eps')}
          </label>

          {values.eps === 'OTRO' && (
            <label>
              Nombre de la entidad *
              <input value={values.otherEps} onChange={(e) => update('otherEps', e.target.value)} />
              {fieldError('otherEps')}
            </label>
          )}

          <label className="posada-form__full">
            Puntaje del Sisbén o estrato socioeconómico
            <select value={values.sisben} onChange={(e) => update('sisben', e.target.value)}>
              <option value="">Selecciona una opción (opcional)</option>
              {[
                'ESTRATO 0/1',
                'ESTRATO 1/2',
                'ESTRATO 3/4',
                'ESTRATO 5 O SUPERIOR',
                'GRUPO A',
                'GRUPO B',
                'GRUPO C',
                'GRUPO D',
                'OTRO',
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="posada-form__fields">
          <label>
            Nombre completo del acompañante
            <input
              value={values.companionName}
              onChange={(e) => update('companionName', e.target.value)}
            />
          </label>

          <label>
            Documento del acompañante
            <input
              value={values.companionDocument}
              onChange={(e) => update('companionDocument', e.target.value)}
            />
            {fieldError('companionDocument')}
          </label>

          <label>
            Teléfono del acompañante
            <input
              type="tel"
              inputMode="tel"
              value={values.companionPhone}
              onChange={(e) => update('companionPhone', e.target.value)}
            />
            {fieldError('companionPhone')}
          </label>

          <label>
            Vínculo con el paciente
            <input
              placeholder="Ej. madre, padre, cónyuge"
              value={values.relationship}
              onChange={(e) => update('relationship', e.target.value)}
            />
          </label>

          <label>
            Fecha de ingreso solicitada *
            <input
              required
              type="date"
              value={values.admissionDate}
              onChange={(e) => update('admissionDate', e.target.value)}
              aria-invalid={Boolean(errors.admissionDate)}
            />
            {fieldError('admissionDate')}
          </label>

          <label className="posada-form__full">
            Observaciones adicionales
            <textarea
              rows={3}
              maxLength={2000}
              value={values.observations}
              onChange={(e) => update('observations', e.target.value)}
            />
          </label>

          {/* Honeypot anti-bots: oculto visualmente, pero fuera del flujo normal. */}
          <div className="posada-form__honeypot" aria-hidden="true">
            <label>
              No diligenciar
              <input
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => update('website', e.target.value)}
              />
            </label>
          </div>

          <label className="posada-form__full posada-form__consent">
            <input
              type="checkbox"
              checked={values.privacyConsent}
              onChange={(e) => update('privacyConsent', e.target.checked)}
            />
            <span>
              He leído y acepto el aviso de privacidad y el tratamiento de los datos personales
              necesarios para gestionar esta solicitud.
              <a href="/politica-de-privacidad" target="_blank" rel="noreferrer">
                Consultar política de privacidad
              </a>
            </span>
          </label>
          {fieldError('privacyConsent')}
        </div>
      )}

      {errorMessage && (
        <p className="posada-form__error" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="posada-form__actions">
        {step > 0 && (
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setStep((current) => current - 1)}
            disabled={submitting}
          >
            Anterior
          </button>
        )}

        {step < 2 ? (
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              if (validateStep(step)) setStep((current) => current + 1)
            }}
          >
            Continuar
          </button>
        ) : (
          <button type="submit" className="button button-primary" disabled={submitting}>
            {submitting ? 'Enviando solicitud…' : 'Enviar solicitud'}
          </button>
        )}
      </div>
    </form>
  )
}
