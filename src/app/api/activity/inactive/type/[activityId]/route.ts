import prisma from '@/lib/prisma'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

// get inactive activities by Type
export async function GET(
  req: Request,
  { params }: { params: { activityId: string } }
) {
  const activityId = params.activityId

  const addedActivitiesByType = await prisma.addedActivity.findMany({
    where: {
      activity: {
        id: parseInt(activityId),
      },
      status: 'Active',
      start: {
        lt: new Date(),
      },
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

  return NextResponse.json<ApiResponse<AddedActivityResponse[]>>(
    {
      body: addedActivitiesByType as unknown as AddedActivityResponse[],
    },
    { status: StatusCodes.OK }
  )
}
