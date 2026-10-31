import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'
import { Home } from './globals/Home'
import { ResourceFiles } from './collections/ResourceFiles'
import { Resources } from './collections/Resources'
import { TeamApplications } from './collections/TeamApplications'
import { PosadaApplications } from './collections/PosadaApplications'
import { Gestiones } from './collections/Gestiones'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateR2FileURL = ({ filename, prefix }: { filename: string; prefix?: string }) => {
  const baseURL = process.env.R2_PUBLIC_URL?.replace(/\/$/, '')
  const key = prefix ? `${prefix}/${filename}` : filename

  return `${baseURL}/${key}`
}

export default buildConfig({
  globals: [SiteSettings, Home],

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Media,
    ResourceFiles,
    Resources,
    TeamApplications,
    PosadaApplications,
    Gestiones,
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),

  sharp,

  plugins: [
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),

      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: generateR2FileURL,
        },

        'resource-files': {
          disablePayloadAccessControl: true,
          generateFileURL: generateR2FileURL,
        },
      },

      bucket: process.env.R2_BUCKET || '',

      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
})
