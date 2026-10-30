import { NextResponse } from 'next/server'
import config from '@/payload.config'
import { getPayload } from 'payload'

const allowedAreas = [
  'communications',
  'community',
  'social-management',
  'volunteering',
  'professional',
  'other',
]

const MAX_LENGTH = 2000

function cleanText(value: unknown, maxLength = MAX_LENGTH) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Campo honeypot: los bots suelen completarlo.
    if (cleanText(body.website)) {
      return NextResponse.json({ success: true })
    }

    const fullName = cleanText(body.fullName, 120)
    const email = cleanText(body.email, 254).toLowerCase()
    const phone = cleanText(body.phone, 40)
    const city = cleanText(body.city, 120)
    const areaOfInterest = cleanText(body.areaOfInterest, 50)
    const professionalProfile = cleanText(body.professionalProfile, 160)
    const linkedin = cleanText(body.linkedin, 500)
    const message = cleanText(body.message)
    const dataProcessingConsent = body.dataProcessingConsent === true

    if (
      !fullName ||
      !email ||
      !phone ||
      !city ||
      !areaOfInterest ||
      !message ||
      !dataProcessingConsent
    ) {
      return NextResponse.json(
        { message: 'Completa los campos obligatorios y autoriza el tratamiento de datos.' },
        { status: 400 },
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'Ingresa un correo electrónico válido.' },
        { status: 400 },
      )
    }

    if (!allowedAreas.includes(areaOfInterest)) {
      return NextResponse.json(
        { message: 'Selecciona un área de interés válida.' },
        { status: 400 },
      )
    }

    if (linkedin) {
      try {
        const url = new URL(linkedin)

        if (!['http:', 'https:'].includes(url.protocol)) {
          throw new Error('Invalid protocol')
        }
      } catch {
        return NextResponse.json(
          { message: 'El enlace profesional debe ser una URL válida.' },
          { status: 400 },
        )
      }
    }

    const payload = await getPayload({ config })

    await payload.create({
      // Keep the real collection slug; this collection is not present in the generated Payload type yet.
      collection: 'team-applications' as never,
      overrideAccess: true,
      data: {
        fullName,
        email,
        phone,
        city,
        areaOfInterest,
        professionalProfile,
        linkedin,
        message,
        dataProcessingConsent,
        status: 'pending',
      } as never,
    })

    return NextResponse.json(
      { success: true, message: 'Tu postulación fue recibida correctamente.' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error al guardar postulación:', error)

    return NextResponse.json(
      { message: 'No pudimos procesar tu postulación. Inténtalo nuevamente.' },
      { status: 500 },
    )
  }
}
