import { Hono } from 'hono'
import * as z from 'zod'
import { zValidator } from '@hono/zod-validator'

import db from '../db/index.js'

const roleRouters = new Hono()


type Role = {
    id: number
    name: string
}

roleRouters.get('/',async (c) => {
    let sql = 'SELECT * FROM roles'
    let stmt = db.prepare(sql)
    let roles =await stmt.all()

    return c.json({ message: 'list of roles',data : roles })
})

roleRouters.get('/:id', (c) => {
    const { id } = c.req.param()
    let sql = 'SELECT * FROM roles WHERE id = @id'
    let stmt = db.prepare<{id:string},Role>(sql)
    let roles = stmt.get({id:id})

    if (!roles) {
        return c.json({message: 'Role not found'}, 404)
    }
    
    return c.json({ 
        message: `Role detail for ID: ${id}`,
        data : roles
    })
})


const createRoleSchema = z.object({
    name: z.string("กรุณากรอกชื้อโรล")
        .min(5, "ชื่อโรลต้องมีความยาวอย่างน้อย 5 ตัวอักษร")
})

roleRouters.post('/', 
    zValidator('json', createRoleSchema)
    ,async (c) => {
        const body = await c.req.json()

        let sql = `INSERT INTO roles
            (name)
            VALUES(@name);
            `

        let stmt = db.prepare<Omit<Role,"id">>(sql)
        let result = stmt.run(body)

        if (result.changes === 0) {
            return c.json({ message: 'Failed to create role' }, 500)
        }
        let lastRowid = result.lastInsertRowid as number

        let sql2 = 'SELECT * FROM roles WHERE id = ?'
        let stmt2 = db.prepare<[number],Role>(sql2)
        let newRole = stmt2.get(lastRowid)

        return c.json({ message: 'Role created', data: newRole }, 201)

    })


export default roleRouters
