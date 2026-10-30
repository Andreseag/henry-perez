import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',

  label: 'Página de inicio',

  admin: {
    description: 'Contenido de la página principal del sitio.',
  },

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Texto superior',
          defaultValue: 'HENRY PÉREZ',
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
          defaultValue: 'Trabajo que transforma territorios.',
        },
        // {
        //   name: 'description',
        //   type: 'richText',
        //   label: 'Descripción',
        //   editor: lexicalEditor(),
        // },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
        {
          name: 'descriptionRichText',
          type: 'richText',
          label: 'Descripción enriquecida',
          editor: lexicalEditor(),
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen principal',
        },
        {
          name: 'primaryButton',
          type: 'group',
          label: 'Botón principal',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Texto',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Enlace',
            },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          label: 'Botón secundario',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Texto',
            },
            {
              name: 'url',
              type: 'text',
              label: 'Enlace',
            },
          ],
        },
      ],
    },

    {
      name: 'about',
      type: 'group',
      label: 'Historia / Sobre Henry',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
        },
      ],
    },

    {
      name: 'trajectory',
      type: 'array',
      label: 'Trayectoria',
      labels: {
        singular: 'Etapa',
        plural: 'Etapas',
      },
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Año / período',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
      ],
    },

    {
      name: 'management',
      type: 'group',
      label: 'Gestión',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          defaultValue: 'Gestión y compromiso con el territorio',
        },

        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },

        {
          name: 'areas',
          type: 'array',
          label: 'Áreas de gestión',
          admin: {
            description: 'Áreas o temas principales que quieres destacar en el sitio.',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Nombre del área',
              required: true,
            },

            {
              name: 'description',
              type: 'textarea',
              label: 'Descripción',
            },

            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Imagen',
            },

            {
              name: 'url',
              type: 'text',
              label: 'Enlace',
              admin: {
                description: 'URL opcional. Puede ser una sección interna o una página externa.',
              },
            },
          ],
        },
      ],
    },

    {
      name: 'projects',
      type: 'array',
      label: 'Proyectos',
      admin: {
        description: 'Proyectos e iniciativas que aparecerán en la página de inicio.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },

        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },

        {
          name: 'category',
          type: 'text',
          label: 'Categoría',
          admin: {
            description: 'Ejemplo: Infraestructura, Comunidad, Educación, Desarrollo social.',
          },
        },

        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
        },

        {
          name: 'url',
          type: 'text',
          label: 'Enlace',
          admin: {
            description: 'URL opcional hacia una página o recurso relacionado.',
          },
        },

        {
          name: 'featured',
          type: 'checkbox',
          label: 'Proyecto destacado',
          defaultValue: false,
          admin: {
            description: 'El proyecto destacado ocupará un espacio visual mayor.',
          },
        },
      ],
    },

    {
      name: 'community',
      type: 'group',
      label: 'Comunidad',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
        },
      ],
    },

    {
      name: 'posada',
      type: 'group',
      label: 'Posada Villanueva',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Texto del botón',
          defaultValue: 'Conoce la Posada Villanueva',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          label: 'Enlace',
          defaultValue: '/posada-villanueva',
        },
      ],
    },

    {
      name: 'joinTeam',
      type: 'group',
      label: 'Únete al equipo',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Texto del botón',
          defaultValue: 'Únete al equipo',
        },
      ],
    },
    {
      name: 'resources',
      type: 'group',
      label: 'Recursos para compartir',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Mostrar sección en la página de inicio',
          defaultValue: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
          defaultValue: 'Recursos para compartir',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción',
          defaultValue: 'Encuentra materiales listos para descargar y compartir.',
        },
        {
          name: 'limit',
          type: 'number',
          label: 'Cantidad de recursos destacados',
          defaultValue: 6,
          min: 1,
          max: 24,
        },
      ],
    },
  ],
}
