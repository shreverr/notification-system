import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"
import User from "../models/user.model"
import { notificationClient } from ".."

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

app.post("/register/send-otp",
  zValidator("json", registerSchema.pick({ email: true })),
  async (c) => {
    const { email } = c.req.valid("json")

    console.log("sending OTP");
    await notificationClient.notifications["send-notification"].$post({
      json: {
        email,
        message: "Your OTP code is 123456. Please verify your account.",
        subject: "OTP Verification"
      }
    })

    return c.json({
      success: true,
      message: "OTP sent successfully"
    }, 200)
  }
)

app.get((c) => {
  return c.json({
    message: "hello Hono from user controller"
  })
})

export default app   