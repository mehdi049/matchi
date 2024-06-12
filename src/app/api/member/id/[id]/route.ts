import prisma from '@/lib/prisma'
import { UserResponse } from '@/types/User'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

// get user by Id
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
      interests: true,
      AddedActivities: true,
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

// update User
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await req.json()

  try {
    const { name, gender, birthDay, bio, country, city, municipality, image } =
      body

    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        gender: gender,
        birthDay: birthDay,
        bio: bio,
        image: image,
        country: country,
        city: city,
        municipality: municipality,
      },
    })

    if (!updateUser)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: 'Utilisateur introuvable',
        },
        { status: StatusCodes.NOT_FOUND }
      )

    return NextResponse.json<ApiResponse<string>>(
      {
        message: 'Compte modifié avec succés',
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