import { Hono } from 'hono'
import *as z from 'zod'
import { zValidator } from '@hono/zod-validator'
import db from '../db/index.js'


const userRouters = new Hono()

type User = {
    id: number
    username :string
    password :string
    firstname :string
    lastname :string
}

userRouters.get('/',async (c) => {
    let sql = 'SELECT * FROM users'
    let stmt = db.prepare(sql)
    let users =await stmt.all()

    return c.json({ message: 'list of users',data : users })
})


userRouters.get('/:id', (c) => {
    const { id } = c.req.param()
    let sql = 'SELECT * FROM users WHERE id = @id'
    // let sql = 'SELECT * FROM users'
    let stmt = db.prepare<{id:string},User>(sql)
    // let stmt = db.prepare<[],User>(sql)
    // let users : User[] = await stmt.all()
    // let users = await stmt.all()
    let users = stmt.get({id:id})

    if (!users) {
        return c.json({ message : 'User not found' }, 404)
    }

    return c.json({
        message: `User detail for ID: ${id}`,
        data : users

    })

    // return c.json({ message: 'list of users', data : users})
})


const createUserSchema = z.object({
    username: z.string("กรุณากรอกชื่อผู้ใช้")
        .min(5,"ชื่อต้องมีความยาวอย่างน้อย 5 ตัวอักษร"),
    password: z.email("กรุณากรอกชื่อผู้ใช้"),
    firstname: z.email("กรุณากรอกชื่อจริง").optional(),
    lastname: z.email("กรุณากรอกนามสกุลจริง").optional(),
})

userRouters.post('/', 
    zValidator('json', createUserSchema)
    ,async (c) => {
        const body = await c.req.json()

        let sql = `INSERT INTO users
            (username, password, firstname, lastname)
            VALUES(@username, @password, @firstname, @lastname);
            `

        let stmt = db.prepare<Omit<User,"id">>(sql)
        let result = stmt.run(body)

        if (result.changes === 0) {
            return c.json({ message: 'Failed to create user' }, 500)
        }
        let lastRowid = result.lastInsertRowid as number

        let sql2 = 'SELECT * FROM users WHERE id = ?'
        let stmt2 = db.prepare<[number],User>(sql2)
        let newUser = stmt2.get(lastRowid)

        return c.json({ message: 'User created', data: newUser }, 201)

    })

export default userRouters
