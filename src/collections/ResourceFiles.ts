import type { CollectionConfig } from 'payload'

export const ResourceFiles: CollectionConfig = {
  slug: 'resource-files',

  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'filesize', 'updatedAt'],
    description: 'Archivos descargables de la biblioteca de recursos.',
  },

  access: {
    // Los archivos de esta colección se consideran públicos.
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  upload: {
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'application/zip',
    ],
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      admin: {
        description: 'Opcional; útil cuando el archivo es una imagen.',
      },
    },
  ],
}
