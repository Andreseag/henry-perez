import type { CollectionConfig } from 'payload'

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

export const PosadaApplications: CollectionConfig = {
  slug: 'posada-applications',
  labels: {
    singular: 'Solicitud de La Posada',
    plural: 'Solicitudes de La Posada',
  },

  admin: {
    useAsTitle: 'patientName',
    defaultColumns: ['patientName', 'municipality', 'eps', 'admissionDate', 'status', 'createdAt'],
    group: 'La Posada',
    description:
      'Solicitudes de alojamiento. Contiene datos personales y posiblemente información sensible.',
  },

  // Configuraremos el acceso según los roles reales de tu colección Users.
  // No habilites lectura pública para esta colección.
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'patientName',
      type: 'text',
      label: 'Nombre completo del paciente',
      required: true,
    },
    {
      name: 'patientPhone',
      type: 'text',
      label: 'Teléfono móvil del paciente',
      required: true,
    },
    {
      name: 'patientDocument',
      type: 'text',
      label: 'Número de documento del paciente',
      required: true,
    },
    {
      name: 'patientCase',
      type: 'textarea',
      label: 'Descripción del caso',
      required: true,
    },
    {
      name: 'municipality',
      type: 'select',
      label: 'Municipio de origen',
      required: true,
      options: municipalities.map((value) => ({ label: value, value })),
    },
    {
      name: 'hospital',
      type: 'select',
      label: 'Lugar de remisión u hospitalización',
      required: true,
      options: hospitals.map((value) => ({ label: value, value })),
    },
    {
      name: 'otherHospital',
      type: 'text',
      label: 'Otro hospital',
      admin: {
        condition: (_, siblingData) => siblingData?.hospital === 'OTRO',
      },
    },
    {
      name: 'eps',
      type: 'select',
      label: 'EPS o entidad de afiliación',
      required: true,
      options: epsOptions.map((value) => ({ label: value, value })),
    },
    {
      name: 'otherEps',
      type: 'text',
      label: 'Otra EPS o entidad',
      admin: {
        condition: (_, siblingData) => siblingData?.eps === 'OTRO',
      },
    },
    {
      name: 'sisben',
      type: 'select',
      label: 'Sisbén o estrato socioeconómico',
      options: [
        { label: 'Estrato 0/1', value: 'ESTRATO 0/1' },
        { label: 'Estrato 1/2', value: 'ESTRATO 1/2' },
        { label: 'Estrato 3/4', value: 'ESTRATO 3/4' },
        { label: 'Estrato 5 o superior', value: 'ESTRATO 5 O SUPERIOR' },
        { label: 'Grupo A', value: 'GRUPO A' },
        { label: 'Grupo B', value: 'GRUPO B' },
        { label: 'Grupo C', value: 'GRUPO C' },
        { label: 'Grupo D', value: 'GRUPO D' },
        { label: 'Otro', value: 'OTRO' },
      ],
    },
    {
      name: 'companionName',
      type: 'text',
      label: 'Nombre completo del acompañante',
    },
    {
      name: 'companionDocument',
      type: 'text',
      label: 'Documento del acompañante',
    },
    {
      name: 'companionPhone',
      type: 'text',
      label: 'Teléfono del acompañante',
    },
    {
      name: 'relationship',
      type: 'text',
      label: 'Vínculo con el paciente',
    },
    {
      name: 'admissionDate',
      type: 'date',
      label: 'Fecha de ingreso solicitada',
      required: true,
    },
    {
      name: 'observations',
      type: 'textarea',
      label: 'Observaciones adicionales',
    },
    {
      name: 'privacyConsent',
      type: 'checkbox',
      label: 'Aceptó el aviso de privacidad y tratamiento de datos',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado de la solicitud',
      defaultValue: 'received',
      required: true,
      options: [
        { label: 'Recibida', value: 'received' },
        { label: 'En revisión', value: 'reviewing' },
        { label: 'Contactada', value: 'contacted' },
        { label: 'Aprobada', value: 'approved' },
        { label: 'No aprobada', value: 'not-approved' },
        { label: 'Cerrada', value: 'closed' },
      ],
    },
    {
      name: 'notificationStatus',
      type: 'select',
      label: 'Estado de notificación por correo',
      defaultValue: 'pending',
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Enviada', value: 'sent' },
        { label: 'Fallida', value: 'failed' },
      ],
    },
  ],
}
