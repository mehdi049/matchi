import { createNotification, sendEmail } from '@/app/actions'
import { EmailActivityUpdateTemplate } from '@/components/templates/emailTemplate/ActivityUpdate'
import { NotificationActivityUpdateTemplate } from '@/components/templates/notificationTemplate/ActivityUpdate'
import { MESSAGES } from '@/const/message'
import prisma from '@/lib/prisma'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { ATTENDANCE_STATUS } from '@/types/UserAttendanceResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
//import ReactDOMServer from 'react-dom/server'

// get activity by Id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const addedActivity = await prisma.addedActivity.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      title: true,
      description: true,
      country: true,
      city: true,
      municipality: true,
      place: true,
      googleMap: true,
      date: true,
      start: true,
      end: true,
      maxAttendees: true,
      price: true,
      currency: true,
      type: true,
      status: true,
      createdAt: true,
      attendees: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              userAttendance: {
                where: {
                  addedActivityId: parseInt(id),
                },
                select: {
                  status: true,
                  addedActivityId: true,
                  statusUpdatedAt: true,
                },
              },
            },
          },
        },
      },
      activity: {
        select: {
          id: true,
          name: true,
          image: true,
          slug: true,
          status: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  })

  if (addedActivity)
    return NextResponse.json<ApiResponse<AddedActivityResponse>>(
      {
        body: addedActivity as unknown as AddedActivityResponse,
      },
      { status: StatusCodes.OK }
    )

  return NextResponse.json<ApiResponse<string>>(
    {
      message: `Activité introuvable ${id}`,
    },
    { status: StatusCodes.NOT_FOUND }
  )
}

// delete activity
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const activity = await prisma.addedActivity.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  if (!activity)
    return NextResponse.json<ApiResponse<string>>(
      {
        message: `Activité introuvable ${id}`,
      },
      { status: StatusCodes.NOT_FOUND }
    )

  try {
    const deleteActivity = await prisma.addedActivity.delete({
      where: {
        id: parseInt(id),
      },
    })

    if (deleteActivity)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: `Activité supprimé avec succés ${id}`,
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

// update activity
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await req.json()

  try {
    const {
      activityId,
      title,
      description,
      country,
      city,
      municipality,
      place,
      googleMap,
      date,
      start,
      end,
      maxAttendees,
      price,
      status,
      type,
    } = body

    const activity = await prisma.activity.findUnique({
      where: {
        id: parseInt(activityId),
      },
    })

    const addedActivity = await prisma.addedActivity.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!activity || !addedActivity)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: `Activité introuvable ${id}`,
        },
        { status: StatusCodes.NOT_FOUND }
      )

    const updatedActivity = await prisma.addedActivity.update({
      where: {
        id: parseInt(id),
      },
      data: {
        description: description,
        title: title,
        country: country,
        city: city,
        municipality: municipality,
        place: place,
        googleMap: googleMap,
        date: date,
        start: start,
        end: end,
        maxAttendees: maxAttendees,
        price: price,
        status: status,
        type: type,
        activityId: activityId,
      },
      select: {
        id: true,
        title: true,
        attendees: {
          select: {
            status: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    // notify attendees
    let acceptedAttendees = updatedActivity.attendees.filter(
      (attendee) => attendee.status == ATTENDANCE_STATUS.ACCEPTED
    )

    acceptedAttendees.map((attendee) => {
      // notify attendees by email
      sendEmail({
        subject: `Important: L'activité ${updatedActivity.title} a été modifié`,
        receivers: [attendee.user.email],
        template: EmailActivityUpdateTemplate({
          firstName: attendee.user.name as string,
          activityTitle: updatedActivity.title,
          activityId: updatedActivity.id,
        }),
      })

      // notify attendees by system notification
      createNotification({
        template: NotificationActivityUpdateTemplate({
          activityTitle: addedActivity.title,
          activityId: addedActivity.id,
        }),
        userId: attendee.user.id,
      })
    })

    return NextResponse.json<ApiResponse<string>>(
      {
        message: 'Activité modifié avec succés',
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
