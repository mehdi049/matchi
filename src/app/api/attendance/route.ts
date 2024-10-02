import { sendEmail } from '@/app/actions'
import { EmailJoinRequestTemplate } from '@/components/templates/emailTemplate/JoinRequest'
import { EmailNewJoinActivityTemplate } from '@/components/templates/emailTemplate/NewJoin'
import { MESSAGES } from '@/const/message'
import prisma from '@/lib/prisma'
import { ADDED_ACTIVITY_TYPE } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { ATTENDANCE_STATUS } from '@/types/UserAttendanceResponse'
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
        id: true,
        title: true,
        type: true,
        date: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
        status:
          addedActivity.type === ADDED_ACTIVITY_TYPE.PUBLIC
            ? ATTENDANCE_STATUS.ACCEPTED
            : ATTENDANCE_STATUS.PENDING,
      },
    })

    const attendee = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    // notify attendees by email (new attendance)
    sendEmail({
      subject: `Important: Un nouveau participant a rejoint votre activité`,
      receivers: [addedActivity.createdBy.email],
      template:
        addedActivity?.type === ADDED_ACTIVITY_TYPE.PUBLIC
          ? EmailNewJoinActivityTemplate({
              hostName: addedActivity.createdBy.name as string,
              attendeeId: attendee?.id as string,
              attendeeName: attendee?.name as string,
              activityTitle: addedActivity?.title as string,
              activityDate: addedActivity.date,
            })
          : EmailJoinRequestTemplate({
              hostName: addedActivity.createdBy.name as string,
              attendeeId: attendee?.id as string,
              attendeeName: attendee?.name as string,
              activityTitle: addedActivity?.title as string,
              activityDate: addedActivity.date,
            }),
    })

    // notify attendees by system notification (new attendance)
    /*const react = await createNotification({
      template:
        addedActivity?.type === ADDED_ACTIVITY_TYPE.PUBLIC
          ? NotificationNewJoinActivityTemplate({
              attendeeId: attendee?.id as string,
              attendeeName: attendee?.name as string,
              attendeeImage: attendee?.image as string,
              activityId: addedActivity?.id as number,
              activityTitle: addedActivity?.title as string,
            })
          : NotificationJoinRequestTemplate({
              attendeeId: attendee?.id as string,
              attendeeName: attendee?.name as string,
              attendeeImage: attendee?.image as string,
              activityId: addedActivity?.id as number,
              activityTitle: addedActivity?.title as string,
            }),
      userId: addedActivity?.createdBy?.id as string,
    })*/

    return NextResponse.json<ApiResponse<string>>(
      {
        message:
          addedActivity.type === ADDED_ACTIVITY_TYPE.PUBLIC
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
