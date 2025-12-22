import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const productRouters = new Hono()

const productSchema = z.object({
  code: z
    .string()
    .length(5, { message: 'รหัสสินค้า 5 ตัวอักษร' })
    .regex(/^[0-9]+$/, { message: 'รหัสสินค้า (เฉพาะตัวเลข)' }),

  name: z
    .string()
    .min(5, { message: 'ชื่อสินค้า 5 ตัวอักษร' }),

  price: z.preprocess(
    (v) => (typeof v === 'string' ? Number(v) : v),
    z.number({ message: 'ราคาขาย (เลขทศนิยม)' })
  ),

  cost: z.preprocess(
    (v) => (typeof v === 'string' ? Number(v) : v),
    z.number({ message: 'ต้นทุน (เลขทศนิยม)' })
  ),

  note: z.string().optional(),
})


// POST /api/products
productRouters.post(
  '/',
  zValidator('json', productSchema),
  async (c) => {
    const data = c.req.valid('json')
    return c.json({
      success: true,
      message: 'Product created successfully',
      data,
    })
  }
)

export default productRouters
