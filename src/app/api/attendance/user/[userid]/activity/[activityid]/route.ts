import { MESSAGES } from '@/const/message'
import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { userid: string; activityid: number } }
) {
  const userId = params.userid
  const activityId = params.activityid

  const body = await req.json()

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: MESSAGES.ERROR.NOT_FOUND('Utilisateur'),
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )

    const activity = await prisma.addedActivity.findUnique({
      where: {
        id: parseInt(activityId.toString()),
      },
    })
    if (!activity)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: MESSAGES.ERROR.NOT_FOUND('Activité'),
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )

    const attendance = await prisma.userAttendance.findUnique({
      where: {
        userId_addedActivityId: {
          userId: userId,
          addedActivityId: parseInt(activityId.toString()),
        },
      },
    })
    if (!attendance)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: MESSAGES.ERROR.NOT_FOUND('Demande'),
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )

    await prisma.userAttendance.update({
      where: {
        userId_addedActivityId: {
          userId: userId,
          addedActivityId: parseInt(activityId.toString()),
        },
      },
      data: {
        status: body.status,
        statusUpdatedAt: new Date(),
      },
    })

    return NextResponse.json<ApiResponse<string>>(
      {
        message: 'Demande modifié avec succés',
      },
      {
        status: StatusCodes.OK,
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json<ApiResponse<string>>(
      {
        message: MESSAGES.ERROR.GENERAL,
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
