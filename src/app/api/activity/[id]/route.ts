import prisma from '@/lib/prisma'
import { AddedActivityResponse } from '@/types/User'
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
