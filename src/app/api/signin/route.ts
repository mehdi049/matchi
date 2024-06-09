import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { hashPassword } from '@/utils/string'
import { StatusCodes } from 'http-status-codes'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  try {
    const { email, password } = body

    const user = await prisma.user.findUnique({
      where: {
        email: email,
        password: hashPassword(password),
      },
    })

    // check if user doesn't exist
    if (!user)
      return NextResponse.json<ApiResponse<string>>(
        {
          message: 'Email ou mot de passe invalid',
        },
        { status: StatusCodes.NOT_FOUND }
      )

    return NextResponse.json<ApiResponse<typeof user>>(
      {
        body: user,
      },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return NextResponse.json<ApiResponse<string>>(
      {
        message: 'Une erreur est survenu, veuillez réessayer plus tard',
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    )
  }
}
