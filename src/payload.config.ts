// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder"
import path from "path"
import { buildConfig } from "payload"
import { fileURLToPath } from "url"
import sharp from "sharp"

import { Users } from "./collections/Users"
import { Media } from "./collections/Media"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
  }),
  sharp,
  plugins: [
    formBuilderPlugin({
      fields: {
        payment: false,
      },
    }),
  ],
})
