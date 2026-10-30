import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',

  label: 'Configuración del sitio',

  admin: {
    description: 'Configuración general y datos de contacto del sitio web.',
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Nombre del sitio',
              required: true,
              defaultValue: 'Henry Pérez',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Descripción',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo',
            },
          ],
        },

        {
          label: 'Contacto',
          fields: [
            {
              name: 'email',
              type: 'email',
              label: 'Correo electrónico',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Teléfono',
            },
            {
              name: 'address',
              type: 'text',
              label: 'Dirección',
            },
          ],
        },

        {
          label: 'Redes sociales',
          fields: [
            {
              name: 'socialLinks',
              type: 'group',
              label: 'Redes sociales',
              fields: [
                {
                  name: 'x',
                  type: 'text',
                  label: 'X / Twitter',
                  admin: {
                    description: 'URL completa del perfil.',
                  },
                },
                {
                  name: 'threads',
                  type: 'text',
                  label: 'Threads',
                },
                {
                  name: 'youtube',
                  type: 'text',
                  label: 'YouTube',
                },
                {
                  name: 'instagram',
                  type: 'text',
                  label: 'Instagram',
                },
                {
                  name: 'facebook',
                  type: 'text',
                  label: 'Facebook',
                },
                {
                  name: 'tiktok',
                  type: 'text',
                  label: 'TikTok',
                },
                {
                  name: 'whatsapp',
                  type: 'text',
                  label: 'WhatsApp',
                  admin: {
                    description: 'Puede ser una URL https://wa.me/...',
                  },
                },
              ],
            },
          ],
        },

        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              type: 'textarea',
              label: 'Texto del footer',
            },
          ],
        },
      ],
    },
  ],
}
