import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getPayload } from 'payload'

import config from '@/payload.config'

export const runtime = 'nodejs'

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
] as const

const hospitals = [
  'Hospital Regional Orinoquía',
  'Hospital Materno Infantil',
  'CLÍNICA CASANARE',
  'HORO',
  'OTRO',
] as const

const epsOptions = [
  'CAPRESOCA',
  'NUEVA EPS',
  'SOAT',
  'EPS SANITAS',
  'COLMÉDICA',
  'COOSALUD',
  'OTRO',
] as const

const sisbenOptions = [
  'ESTRATO 0/1',
  'ESTRATO 1/2',
  'ESTRATO 3/4',
  'ESTRATO 5 O SUPERIOR',
  'GRUPO A',
  'GRUPO B',
  'GRUPO C',
  'GRUPO D',
  'OTRO',
] as const

function cleanText(value: unknown, maxLength = 200): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function isPhone(value: string): boolean {
  return /^[0-9+().\-\s]{7,25}$/.test(value)
}

function isDocument(value: string): boolean {
  return /^[a-zA-Z0-9.-]{4,30}$/.test(value)
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T12:00:00Z`)

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export async function POST(request: Request) {
  try {
    // Limita el tamaño del cuerpo para reducir abuso accidental.
    const contentLength = Number(request.headers.get('content-length') || 0)

    if (contentLength > 20_000) {
      return NextResponse.json({ message: 'La solicitud es demasiado grande.' }, { status: 413 })
    }

    const body: unknown = await request.json()

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ message: 'La información enviada no es válida.' }, { status: 400 })
    }

    const data = body as Record<string, unknown>

    // Campo trampa para bots. El formulario debe mantenerlo vacío.
    if (cleanText(data.website, 200)) {
      return NextResponse.json({ success: true })
    }

    const patientName = cleanText(data.patientName, 150)
    const patientPhone = cleanText(data.patientPhone, 25)
    const patientDocument = cleanText(data.patientDocument, 30)
    const patientCase = cleanText(data.patientCase, 3000)
    const municipality = cleanText(data.municipality, 100)
    const hospital = cleanText(data.hospital, 100)
    const otherHospital = cleanText(data.otherHospital, 150)
    const eps = cleanText(data.eps, 100)
    const otherEps = cleanText(data.otherEps, 150)
    const sisben = cleanText(data.sisben, 50)
    const companionName = cleanText(data.companionName, 150)
    const companionDocument = cleanText(data.companionDocument, 30)
    const companionPhone = cleanText(data.companionPhone, 25)
    const relationship = cleanText(data.relationship, 100)
    const admissionDate = cleanText(data.admissionDate, 10)
    const observations = cleanText(data.observations, 2000)

    const privacyConsent = data.privacyConsent === true

    const errors: Record<string, string> = {}

    if (patientName.length < 3) {
      errors.patientName = 'Ingresa el nombre completo del paciente.'
    }

    if (!isPhone(patientPhone)) {
      errors.patientPhone = 'Ingresa un teléfono válido.'
    }

    if (!isDocument(patientDocument)) {
      errors.patientDocument = 'Ingresa un documento válido.'
    }

    if (patientCase.length < 10) {
      errors.patientCase = 'Describe brevemente el caso del paciente.'
    }

    if (!municipalities.some((option) => option === municipality)) {
      errors.municipality = 'Selecciona un municipio válido.'
    }

    if (!hospitals.some((option) => option === hospital)) {
      errors.hospital = 'Selecciona un lugar de remisión válido.'
    }

    if (hospital === 'OTRO' && !otherHospital) {
      errors.otherHospital = 'Especifica el nombre del hospital.'
    }

    if (!(epsOptions as readonly string[]).includes(eps)) {
      errors.eps = 'Selecciona una EPS válida.'
    }

    if (eps === 'OTRO' && !otherEps) {
      errors.otherEps = 'Especifica la entidad de afiliación.'
    }

    if (sisben && !(sisbenOptions as readonly string[]).includes(sisben)) {
      errors.sisben = 'Selecciona una opción socioeconómica válida.'
    }

    if (companionDocument && !isDocument(companionDocument)) {
      errors.companionDocument = 'El documento del acompañante no es válido.'
    }

    if (companionPhone && !isPhone(companionPhone)) {
      errors.companionPhone = 'El teléfono del acompañante no es válido.'
    }

    if (!isValidDate(admissionDate)) {
      errors.admissionDate = 'Selecciona una fecha válida.'
    }

    if (!privacyConsent) {
      errors.privacyConsent = 'Debes aceptar el aviso de privacidad.'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: 'Revisa los campos del formulario.', errors },
        { status: 422 },
      )
    }

    const payload = await getPayload({ config })

    // Primero guardamos. El correo nunca debe impedir conservar la solicitud.
    const application = await payload.create({
      collection: 'posada-applications',
      overrideAccess: true,
      data: {
        patientName,
        patientPhone,
        patientDocument,
        patientCase,
        municipality: municipality as (typeof municipalities)[number],
        hospital: hospital as (typeof hospitals)[number],
        ...(hospital === 'OTRO' ? { otherHospital } : {}),
        eps: eps as (typeof epsOptions)[number],
        ...(eps === 'OTRO' ? { otherEps } : {}),
        ...(sisben ? { sisben: sisben as (typeof sisbenOptions)[number] } : {}),
        companionName,
        companionDocument,
        companionPhone,
        relationship,
        admissionDate,
        observations,
        privacyConsent: true,
        status: 'received',
        notificationStatus: 'pending',
      },
    })

    // Si no está configurado el correo, la solicitud permanece guardada.
    if (
      !process.env.RESEND_API_KEY ||
      !process.env.RESEND_FROM_EMAIL ||
      !process.env.POSADA_NOTIFICATION_EMAIL
    ) {
      console.error('Notificación de La Posada pendiente: faltan variables de Resend.', {
        applicationId: application.id,
      })

      return NextResponse.json({
        success: true,
        message: 'Solicitud recibida correctamente.',
        applicationId: application.id,
        notification: 'pending',
      })
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY)

      const result = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.POSADA_NOTIFICATION_EMAIL],
        subject: `Nueva solicitud de La Posada #${application.id}`,
        text: [
          'Se ha recibido una nueva solicitud de alojamiento.',
          '',
          `Número de solicitud: ${application.id}`,
          `Fecha de recepción: ${new Date().toLocaleString('es-CO', {
            timeZone: 'America/Bogota',
          })}`,
          '',
          'Ingresa al panel administrativo de Payload para revisar los datos.',
          'Por privacidad, este correo no contiene información médica ni documentos personales.',
        ].join('\n'),
      })

      if (result.error) {
        throw new Error('Resend no pudo aceptar el correo.')
      }

      await payload.update({
        collection: 'posada-applications',
        id: application.id,
        overrideAccess: true,
        data: { notificationStatus: 'sent' },
      })

      return NextResponse.json({
        success: true,
        message: 'Solicitud recibida correctamente.',
        applicationId: application.id,
        notification: 'sent',
      })
    } catch (emailError) {
      console.error('Falló la notificación de La Posada.', {
        applicationId: application.id,
        error: emailError instanceof Error ? emailError.message : 'Error desconocido',
      })

      try {
        await payload.update({
          collection: 'posada-applications',
          id: application.id,
          overrideAccess: true,
          data: { notificationStatus: 'failed' },
        })
      } catch (updateError) {
        console.error('No se pudo actualizar el estado de notificación.', {
          applicationId: application.id,
        })
      }

      // La solicitud ya está guardada: no pedimos al usuario enviarla de nuevo.
      return NextResponse.json({
        success: true,
        message: 'Solicitud recibida correctamente.',
        applicationId: application.id,
        notification: 'pending',
      })
    }
  } catch (error) {
    console.error('Error procesando solicitud de La Posada.', error)

    return NextResponse.json(
      { message: 'No pudimos procesar la solicitud. Inténtalo nuevamente.' },
      { status: 500 },
    )
  }
}
