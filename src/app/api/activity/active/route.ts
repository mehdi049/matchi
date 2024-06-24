import prisma from '@/lib/prisma'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

// get active activities
export async function GET() {
  const addedActivities = await prisma.addedActivity.findMany({
    where: {
      status: 'Active',
      start: {
        gt: new Date(),
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
      body: addedActivities as unknown as AddedActivityResponse[],
    },
    { status: StatusCodes.OK }
  )
}
