import type { CollectionConfig, CollectionSlug } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',

  labels: {
    singular: 'Recurso',
    plural: 'Recursos para compartir',
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'sortOrder', 'updatedAt'],
  },

  defaultSort: 'sortOrder',

  access: {
    read: ({ req }) => (req.user ? true : { status: { equals: 'published' } }),

    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoría',
      required: true,
      options: [
        { label: 'Redes sociales', value: 'social' },
        { label: 'Historias y estados', value: 'stories' },
        { label: 'Fotografías', value: 'photos' },
        { label: 'Documentos', value: 'documents' },
        { label: 'Otros', value: 'other' },
      ],
      defaultValue: 'social',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen de portada',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'resource-files' as CollectionSlug,
      label: 'Archivo descargable',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Orden de aparición',
      defaultValue: 0,
      admin: {
        description: 'Los valores menores aparecen primero.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de publicación',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
  ],

  timestamps: true,
}
