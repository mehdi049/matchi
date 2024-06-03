import prisma from '@/lib/prisma'
import { UserResponse } from '@/types/User'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const user = await prisma.user.findUnique({
    where: {
      id: id,
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
      message: `Utilisateur introuvable ${id}`,
    },
    { status: StatusCodes.NOT_FOUND }
  )
}
