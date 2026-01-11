import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z, { email } from "zod"
import User from "../models/user.model"

const app = new Hono()

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be greater than 6 chars")
})

app.post("/register", zValidator("json", registerSchema), async (c) => {
  const { email, password } = c.req.valid("json")

  try {
    const userExists = !!(await User.findOne({ email }))

    if (userExists) {
      return c.json({
        success: false,
        message: "user exists"
      }, 409)
    }

    const user = await User.create({
      email,
      password
    })

    return c.json({
      success: true,
      message: "user created succesfully"
    }, 200)
  } catch (error) {
    console.log(error);
    
    return c.json({
      success: false,
      message: "Internal server error"
    }, 500)
  }
})

app.get((c) => {
  return c.json({
    message: "hello Hono from user controller"
  })
})

export default app   