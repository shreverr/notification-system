import { Hono } from "hono"

const app = new Hono().get((c) => {
  return c.json({
    message: "hello Hono from user controller"
  })
})

export default app