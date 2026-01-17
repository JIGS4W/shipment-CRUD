import { ShipmentRepository } from './repository.js'
import { CreateShipmentDto, UpdateShipmentDto } from './dto.js'

export const ShipmentService = {
  getAll() {
    return ShipmentRepository.findAll()
  },

  getById(id: number) {
    const shipment = ShipmentRepository.findById(id)
    if (!shipment) return null
    return shipment
  },

  create(data: CreateShipmentDto) {
    return ShipmentRepository.create(data)
  },

  update(id: number, data: UpdateShipmentDto) {
    const result = ShipmentRepository.update(id, data)

    if (result.changes === 0) {
      return null
    }

    return result
  },

  delete(id: number) {
    const result = ShipmentRepository.delete(id)

    if (result.changes === 0) {
      return null
    }

    return result
  }
}
