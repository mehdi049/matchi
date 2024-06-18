import { MESSAGES } from '@/const/message'
import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

// update User
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await req.json()

  try {
    const { interests } = body

    // delete all associations
    await prisma.userInterest.deleteMany({
      where: {
        userId: id,
      },
    })

    // update  associations
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        interests: {
          create: interests,
        },
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
        message: MESSAGES.ERROR.GENERAL,
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
