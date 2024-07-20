import { EmailTemplateWelcome } from '@/components/emailTemplate/Welcome'
import { MESSAGES } from '@/const/message'
import { sendEmail } from '@/lib/email'
import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { hashPassword } from '@/utils/string'
import { StatusCodes } from 'http-status-codes'

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  try {
    const { name, email, password } = body

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
        name: name,
        email: email,
        password: hashPassword(password),
      },
    })

    const sendResponse = await sendEmail({
      subject: 'Bienvenue chez Matchi',
      receivers: [/*email,*/ 'mehdi.marouani.049@gmail.com'],
      template: EmailTemplateWelcome({ firstName: name }),
    })
    if (sendResponse.rejected) console.log(sendResponse.response)

    return NextResponse.json<ApiResponse<string>>(
      {
        message: 'Compte créé avec succés',
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
