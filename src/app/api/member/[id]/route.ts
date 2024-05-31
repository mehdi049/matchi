import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextApiRequest } from 'next'
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
  })

  if (!user)
    return NextResponse.json<ApiResponse<string>>(
      {
        message: `Utilisateur introuvable ${id}`,
      },
      { status: StatusCodes.NOT_FOUND }
    )
}
