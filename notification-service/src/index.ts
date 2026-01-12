import { Hono } from 'hono'
import notificationRoutes from "./controllers/notification.controller"

export const app = new Hono()

app.route("/notifications", notificationRoutes)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export type NotificationAppType = typeof app
export default app
