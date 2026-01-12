import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { Resend } from 'resend';
import z from "zod"
import { sendMail } from "../util/sendMail";

const app = new Hono()

const OTPSchema = z.object({
  email: z.email(),
  message: z.string()
    .min(10, "Minimum 10 chars required"),
  subject: z.string()
    .min(10, "Minimum 10 chars required")
    .max(50, "Maximum 50 chars required")
})

app.post("/send-notification", zValidator("json", OTPSchema), async (c) => {
  const { email, message, subject } = c.req.valid("json")
  console.log("sending mail");
  
  try {
    const data = sendMail([email], subject, message);

    return c.json({
      success: true,
      message: "email sent",
      data: data
    }, 200)

  } catch (error) {
    console.log(error);

    return c.json({
      success: false,
      message: "Internal server error"
    }, 500)
  }
})

export default app