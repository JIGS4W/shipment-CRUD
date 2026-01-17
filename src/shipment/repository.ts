import db from '../db/index.js'
import { Shipment } from './entity.js'
import { CreateShipmentDto, UpdateShipmentDto } from './dto.js'

export const ShipmentRepository = {
  findAll(): Shipment[] {
    return db.prepare(`SELECT * FROM shipments`).all() as Shipment[]
  },

  findById(id: number): Shipment | undefined {
    return db.prepare(
      `SELECT * FROM shipments WHERE shipment_id = ?`
    ).get(id) as Shipment
  },

  create(data: CreateShipmentDto) {
    const stmt = db.prepare(`
      INSERT INTO shipments (ship_date, status, tracking_number, destination)
      VALUES (?, ?, ?, ?)
    `)

    return stmt.run(
      data.ship_date,
      data.status,
      data.tracking_number,
      data.destination
    )
  },

  update(id: number, data: UpdateShipmentDto) {
    const stmt = db.prepare(`
      UPDATE shipments
      SET ship_date = ?, status = ?, tracking_number = ?, destination = ?
      WHERE shipment_id = ?
    `)

    return stmt.run(
      data.ship_date,
      data.status,
      data.tracking_number,
      data.destination,
      id
    )
  },

  delete(id: number) {
    return db.prepare(
      `DELETE FROM shipments WHERE shipment_id = ?`
    ).run(id)
  }
}
