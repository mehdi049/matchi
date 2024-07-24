import { MESSAGES } from '@/const/message'
import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

// delete notification
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const notification = await prisma.notification.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!notification)
    return NextResponse.json<ApiResponse<string>>(
      {
        message: `Notification introuvable ${id}`,
      },
      { status: StatusCodes.NOT_FOUND }
    )

  try {
    const deleteNotification = await prisma.notification.delete({
      where: {
        id: parseInt(id),
      },
    })

    if (deleteNotification)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: `Notification supprimé avec succés ${id}`,
        },
        { status: StatusCodes.OK }
      )
  } catch (error) {
    console.log(error)
    return NextResponse.json<ApiResponse<string>>(
      {
        message: `${MESSAGES.ERROR.GENERAL} ${id}`,
      },
      { status: StatusCodes.NOT_FOUND }
    )
  }
}
