import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { NotificationResponse } from '@/types/NotificationResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

// get notifications by User Id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const notifications = await prisma.notification.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      content: true,
      viewed: true,
      createdAt: true,
    },
  })

  return NextResponse.json<ApiResponse<NotificationResponse[]>>(
    {
      body: notifications as unknown as NotificationResponse[],
    },
    { status: StatusCodes.OK }
  )
}
