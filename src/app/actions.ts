'use server'

import prisma from '@/lib/prisma'

type createNotificationProps = {
  template: string
  userId: string
}
export async function createNotification({
  template,
  userId,
}: createNotificationProps) {
  try {
    await prisma.notification.create({
      data: {
        content: template,
        userId: userId,
      },
    })

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
