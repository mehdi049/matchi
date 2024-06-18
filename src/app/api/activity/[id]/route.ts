import prisma from '@/lib/prisma'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

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
        message: `Une erreur est survenu, veuillez réessayer plus tard ${id}`,
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

    await prisma.addedActivity.update({
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
        message: 'Une erreur est survenu, veuillez réessayer plus tard',
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
