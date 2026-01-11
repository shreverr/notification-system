import { Hono } from 'hono'
import { connectDB } from './config/db'
import userRoutes from "./controllers/user.controller"

const app = new Hono()

app.route("/users", userRoutes)

connectDB()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export type AppType = typeof app
export default app
