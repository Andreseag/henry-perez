import type { CollectionConfig } from 'payload'

export const Gestiones: CollectionConfig = {
  slug: 'gestiones',

  labels: {
    singular: 'Gestión',
    plural: 'Gestiones',
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sector', 'gestionStatus', 'featured', 'updatedAt'],
    group: 'Contenido',
    description: 'Administra las iniciativas, proyectos y resultados de Henry Pérez.',
  },

  access: {
    read: ({ req }) => {
      if (req.user) return true

      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },

  versions: {
    drafts: true,
  },

  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug de la URL',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Ejemplo: mejoramiento-de-instituciones-educativas',
      },
    },
    {
      name: 'sector',
      label: 'Sector',
      type: 'select',
      required: true,
      options: [
        { label: 'Educación', value: 'educacion' },
        { label: 'Salud', value: 'salud' },
        { label: 'Infraestructura y obras públicas', value: 'infraestructura' },
        { label: 'Desarrollo social', value: 'desarrollo-social' },
        { label: 'Seguridad y convivencia', value: 'seguridad' },
        { label: 'Empleo y desarrollo económico', value: 'empleo' },
        { label: 'Medio ambiente', value: 'medio-ambiente' },
        { label: 'Otros', value: 'otros' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      label: 'Tipo de contenido',
      type: 'select',
      required: true,
      defaultValue: 'iniciativa',
      options: [
        { label: 'Proyecto', value: 'proyecto' },
        { label: 'Iniciativa', value: 'iniciativa' },
        { label: 'Resultado', value: 'resultado' },
        { label: 'Propuesta', value: 'propuesta' },
      ],
    },
    {
      name: 'gestionStatus',
      label: 'Estado',
      type: 'select',
      required: true,
      defaultValue: 'por-verificar',
      options: [
        { label: 'Propuesta', value: 'propuesta' },
        { label: 'En gestión', value: 'en-gestion' },
        { label: 'En ejecución', value: 'en-ejecucion' },
        { label: 'Finalizada', value: 'finalizada' },
        { label: 'Suspendida o cancelada', value: 'suspendida' },
        { label: 'Por verificar', value: 'por-verificar' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      label: 'Resumen',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      name: 'content',
      label: 'Descripción detallada',
      type: 'richText',
      required: true,
    },
    {
      name: 'heroImage',
      label: 'Imagen principal',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      label: 'Galería de imágenes',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Descripción de la imagen',
          type: 'text',
        },
      ],
    },
    {
      name: 'startDate',
      label: 'Fecha de inicio',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'endDate',
      label: 'Fecha de finalización',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'henryRole',
      label: 'Participación de Henry Pérez',
      type: 'textarea',
      admin: {
        description: 'Describe su rol específico y evita atribuirle acciones sin evidencia.',
      },
    },
    {
      name: 'results',
      label: 'Resultados e indicadores',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Indicador o resultado',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Valor o descripción',
          type: 'text',
        },
      ],
    },
    {
      name: 'documents',
      label: 'Documentos relacionados',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Nombre del documento',
          type: 'text',
          required: true,
        },
        {
          name: 'file',
          label: 'Archivo',
          type: 'upload',
          relationTo: 'resource-files',
          required: true,
        },
      ],
    },
    {
      name: 'sources',
      label: 'Fuentes y evidencias',
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Nombre de la fuente',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'URL de la fuente',
          type: 'text',
        },
        {
          name: 'notes',
          label: 'Notas',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'featured',
      label: 'Destacar en hechos relevantes',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Incluye esta gestión en el carrusel de destacados.',
      },
    },
    {
      name: 'metaTitle',
      label: 'Título SEO',
      type: 'text',
    },
    {
      name: 'metaDescription',
      label: 'Descripción SEO',
      type: 'textarea',
      maxLength: 160,
    },
  ],
}
