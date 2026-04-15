import { defineConfig } from '@prisma/config'
import dotenv from 'dotenv'

// Load .env so process.env.DATABASE_URL is available to the Prisma CLI
dotenv.config()

export default defineConfig({
  datasource: {
    url: process.env.DIRECT_URL,
  },
})
