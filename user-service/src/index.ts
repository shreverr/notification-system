import { Hono } from 'hono'
import { connectDB } from './config/db'
import userRoutes from "./controllers/user.controller"

const app = new Hono()

connectDB()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
