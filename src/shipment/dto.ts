export interface CreateShipmentDto {
  ship_date: string
  status: string
  tracking_number: string
  destination: string
}

export interface UpdateShipmentDto {
  ship_date?: string
  status?: string
  tracking_number?: string
  destination?: string
}
