import { Hono } from 'hono'
import { ShipmentService } from './service.js'

const shipmentRouter = new Hono()

// GET all
shipmentRouter.get('/', (c) => {
  return c.json(ShipmentService.getAll())
})

// GET by id
shipmentRouter.get('/:id', (c) => {
  const id = Number(c.req.param('id'))

  const shipment = ShipmentService.getById(id)

  if (!shipment) {
    return c.json({ message: 'Shipment not found' }, 404)
  }

  return c.json(shipment)
})

// POST create
shipmentRouter.post('/', async (c) => {
  const body = await c.req.json()

  const result = ShipmentService.create(body)

  return c.json(
    { message: 'Shipment created', result },
    201
  )
})

// PUT update
shipmentRouter.put('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const body = await c.req.json()

  const result = ShipmentService.update(id, body)

  if (!result) {
    return c.json({ message: 'Shipment not found' }, 404)
  }

  return c.json({ message: 'Shipment updated', result })
})

// DELETE
shipmentRouter.delete('/:id', (c) => {
  const id = Number(c.req.param('id'))

  const result = ShipmentService.delete(id)

  if (!result) {
    return c.json({ message: 'Shipment not found' }, 404)
  }

  return c.json({ message: 'Shipment deleted', result })
})

export default shipmentRouter
