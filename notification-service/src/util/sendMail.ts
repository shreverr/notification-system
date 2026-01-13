import { Resend } from "resend";
import z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (
  to: string[],
  subject: string,
  message: string
) => {
  try {
    console.log(`sending email ${to}`);
    
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to,
      subject: subject,
      html: message
    });

    return data
  } catch (error) {
    console.log(error);

    throw new Error("Failed to send email")
  }
}