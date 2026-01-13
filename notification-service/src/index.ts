import { Hono } from 'hono'
import notificationRoutes from "./controllers/notification.controller"
import { Worker } from 'bullmq'
import IORedis from 'ioredis';
import { sendMail } from './util/sendMail'

const connection = new IORedis({ maxRetriesPerRequest: null });
export const app = new Hono()

app.route("/notifications", notificationRoutes)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const worker = new Worker("NotificationQueue", async (job) => {
  if (job.name == "welcome-email") {
    sendMail(job.data.email, "welcome bro", "Hi there")
  }
}, { connection })

export type NotificationAppType = typeof app
export default app
