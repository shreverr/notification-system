import { Hono } from 'hono'
import { connectDB } from './config/db'
import userRoutes from "./controllers/user.controller"
import type { NotificationAppType } from '../../notification-service/src/index'
import { hc } from 'hono/client'
import { Queue } from 'bullmq'

const app = new Hono()
app.route("/users", userRoutes)
export const notificationClient = hc<NotificationAppType>('http://localhost:3001/')

connectDB()

export const notificationQueue = new Queue("NotificationQueue") 

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export type UserAppType = typeof app
export default app
