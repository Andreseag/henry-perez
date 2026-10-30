import type { CollectionConfig } from 'payload'

export const TeamApplications: CollectionConfig = {
  slug: 'team-applications',
  labels: {
    singular: 'Postulación al equipo',
    plural: 'Postulaciones al equipo',
  },

  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'areaOfInterest', 'status', 'createdAt'],
    description: 'Personas interesadas en formar parte del equipo.',
  },

  // Las postulaciones se crean mediante nuestro endpoint de Next.js.
  // La lectura y modificación quedan reservadas al equipo autorizado.
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Nombre completo',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Correo electrónico',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Teléfono',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      label: 'Ciudad o municipio',
      required: true,
    },
    {
      name: 'areaOfInterest',
      type: 'select',
      label: 'Área de interés',
      required: true,
      options: [
        { label: 'Comunicaciones', value: 'communications' },
        { label: 'Trabajo comunitario', value: 'community' },
        { label: 'Gestión social', value: 'social-management' },
        { label: 'Voluntariado', value: 'volunteering' },
        { label: 'Apoyo profesional', value: 'professional' },
        { label: 'Otra área', value: 'other' },
      ],
    },
    {
      name: 'professionalProfile',
      type: 'text',
      label: 'Perfil profesional o profesión',
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn o perfil profesional',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Cuéntanos sobre ti',
      required: true,
    },
    {
      name: 'dataProcessingConsent',
      type: 'checkbox',
      label: 'Autoriza el tratamiento de datos personales',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado de la postulación',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'En revisión', value: 'in-review' },
        { label: 'Contactado', value: 'contacted' },
        { label: 'Aceptado', value: 'accepted' },
        { label: 'No seleccionado', value: 'not-selected' },
      ],
      access: {
        update: ({ req }) => Boolean(req.user),
      },
    },
  ],
}
