process.env.FASTIFY_AUTOLOAD_TYPESCRIPT = 'true'
import fastify from 'fastify'
import AutoLoad from '@fastify/autoload'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { test } from 'node:test'
import * as assert from 'node:assert'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = fastify()

await app.register(AutoLoad, { dir: resolve(__dirname, 'load') })

app.ready((err): void => {
  test(() => {
    app.inject({
      url: '/load'
    }, (err, res): void => {
      assert.equal(res.statusCode, 200)
      assert.equal(JSON.parse(res.payload), { healthy: 'ok' })
    })
  })
})
