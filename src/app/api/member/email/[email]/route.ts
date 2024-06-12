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
      AddedActivities: {
        select: {
          id: true,
          title: true,
          date: true,
          start: true,
          end: true,
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
          createdAt: true,
        },
      },
    },
  })

  if (user)
    return NextResponse.json<ApiResponse<UserResponse>>(
      {
        body: user as UserResponse,
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
