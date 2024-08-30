import prisma from '@/lib/prisma'
import { UserResponse } from '@/types/User'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      birthDay: true,
      bio: true,
      gender: true,
      country: true,
      city: true,
      municipality: true,
      createdAt: true,
      updatedAt: true,
      interests: true,
      addedActivities: {
        select: {
          id: true,
          title: true,
          place: true,
          date: true,
          start: true,
          end: true,
          maxAttendees: true,
          city: true,
          type: true,
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
          status: true,
          activity: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          createdAt: true,
        },
      },
      userAttendance: {
        select: {
          addedActivityId: true,
          status: true,
          statusUpdatedAt: true,
        },
      },
    },
  })

  if (user)
    return NextResponse.json<ApiResponse<UserResponse>>(
      {
        body: user as unknown as UserResponse,
      },
      { status: StatusCodes.OK }
    )

  return NextResponse.json<ApiResponse<string>>(
    {
      message: `Utilisateur introuvable ${email}`,
    },
    { status: StatusCodes.NOT_FOUND }
  )
}
