import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import userRouters from './user/index.js'
import roleRouters from './role/index.js'
import productRouters from './product/index.js'

import db from './db/index.js'

const app = new Hono()

app.get("/", (c) => {
  return c.text("✅ API Server is running!");
});

app.route('/api/user', userRouters)
app.route('/api/role', roleRouters)
app.route('/api/products', productRouters)

serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
})


// app.get('/api/users', (c)=>c.text("Get all users/ get users list"))
// app.get('/api/users/:id', (c)=>c.text("Read Users data of" + c.req.param('id')))
// app.post('/api/users',(c)=>{
//     return c.text("Create a new User")})
// app.post('/api/users',async (c)=>{
//     const body = await c.req.json();
//     return c.json({ message: 'Data received', data: body});})


// app.get('/api/products', (c) => {
//   return c.text("ดึงข้อมูลสินค้าทั้งหมด")
// })

// app.get('/api/products/:id', (c) => {
//   const id = c.req.param('id')
//   return c.text(`ดึงข้อมูลสินค้าที่มี id = ${id}`)
// })

// app.post('/api/products', async (c) => {
//   const data = await c.req.json()
//   return c.json({
//     message: "เพิ่มสินค้าใหม่",
//     data
//   })
// })

// app.put('/api/products/:id', async (c) => {
//   const id = c.req.param('id')
//   const body = await c.req.json()
//   return c.json({
//     message: `แก้ไขข้อมูลสินค้า id = ${id}`,
//     update: body
//   })
// })

// app.delete('/api/products/:id', (c) => {
//   const id = c.req.param('id')
//   return c.text(`ลบสินค้า id = ${id}`)
// })