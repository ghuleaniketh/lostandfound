const { defineConfig } = require('prisma/config')
require('dotenv').config()

const db = defineConfig({
  datasource: {
    url: process.env.DIRECT_URL,
  },
})

module.exports = db