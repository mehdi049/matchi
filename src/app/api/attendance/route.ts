import { MESSAGES } from '@/const/message'
import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const { addedActivityId, userId } = body

    const addedActivity = await prisma.addedActivity.findUnique({
      where: {
        id: addedActivityId,
      },
      select: {
        type: true,
      },
    })

    if (!addedActivity)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: MESSAGES.ERROR.NOT_FOUND('Activité'),
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )

    const checkIfUserAttendanceExist = await prisma.userAttendance.findFirst({
      where: {
        userId: userId,
        addedActivityId: addedActivityId,
      },
    })
    if (checkIfUserAttendanceExist)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: MESSAGES.ERROR.ALREADY_EXIST("Demande d'ajout"),
        },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )

    await prisma.userAttendance.create({
      data: {
        userId: userId,
        addedActivityId: addedActivityId,
        status: addedActivity.type === 'Public' ? 'Accepted' : 'Pending',
      },
    })

    return NextResponse.json<ApiResponse<string>>(
      {
        message:
          addedActivity.type === 'Public'
            ? 'Demande de rejoint accépté'
            : 'Demande envoyé avec succés',
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
