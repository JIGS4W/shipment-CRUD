import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import shipmentRouters from './shipment/index.js'

const app = new Hono()

app.get("/", (c) => c.text("✅ API Server is running!"))

app.route('/api/shipment', shipmentRouters)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
