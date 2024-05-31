import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { hashPassword } from '@/utils/string'
import { StatusCodes } from 'http-status-codes'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  try {
    const { first_name, last_name, email, password } = body

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    // check if email already exist
    if (user)
      return NextResponse.json<ApiResponse<string>>(
        {
          message:
            'Email déja utilisé, veuillez utiliser une autre adresse email.',
        },
        { status: StatusCodes.CONFLICT }
      )

    // add new user
    await prisma.user.create({
      data: {
        name: `${first_name} ${last_name}`,
        email: email,
        password: hashPassword(password),
      },
    })

    return NextResponse.json<ApiResponse<string>>(
      {
        message: 'Compte créé avec succés',
      },
      {
        status: StatusCodes.OK,
      }
    )
  } catch (error) {
    return NextResponse.json<ApiResponse<string>>(
      {
        message: 'Erreur est survenu, veuillez réessayer plus tard',
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
