import prisma from '@/lib/prisma'
import { ActivityResponse } from '@/types/ActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET() {
  const activities = await prisma.activity.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
    },
  })

  if (activities)
    return NextResponse.json<ApiResponse<ActivityResponse[]>>(
      {
        body: activities as ActivityResponse[],
      },
      { status: StatusCodes.OK }
    )

  return NextResponse.json<ApiResponse<string>>(
    {
      message: 'Aucune activité trouvé',
    },
    { status: StatusCodes.NOT_FOUND }
  )
}
