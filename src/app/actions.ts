'use server'

import { ENV, SENDER_EMAIL, TEST_RECEIVER_EMAIL } from '@/const/const'
import prisma from '@/lib/prisma'
import { render } from '@react-email/components'
import nodemailer from 'nodemailer'

type createNotificationProps = {
  template: React.ReactElement
  userId: string
}
export async function createNotification({
  template,
  userId,
}: createNotificationProps) {
  try {
    await prisma.notification.create({
      data: {
        content: render(template),
        userId: userId,
      },
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT as number | undefined,
  secure: process.env.SMTP_SECURE as boolean | undefined, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_SENDER_EMAIL,
    pass: process.env.SMTP_PWD,
  },
})

type sendEmailProps = {
  subject: string
  receivers: string[]
  template: React.ReactElement
}
export const sendEmail = async ({
  subject,
  receivers,
  template,
}: sendEmailProps) => {
  const emailHtml = render(template)

  const response = await transporter.sendMail({
    from: '"Matchi " <' + SENDER_EMAIL + '>', // sender address
    to: ENV === 'DEV' ? TEST_RECEIVER_EMAIL : receivers.join(','), // list of receivers
    subject: subject,
    html: emailHtml,
  })

  return response
}
