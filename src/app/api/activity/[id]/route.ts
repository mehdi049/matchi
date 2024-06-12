import prisma from '@/lib/prisma'
import { AddedActivityResponse, UserResponse } from '@/types/User'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

// get activity by Id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const user = await prisma.addedActivity.findUnique({
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
      createdAt: true,
      UserAttendance: {
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

  if (user)
    return NextResponse.json<ApiResponse<AddedActivityResponse>>(
      {
        body: user as AddedActivityResponse,
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
