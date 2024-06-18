import prisma from '@/lib/prisma'
import { ActivityResponse } from '@/types/ActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug

  const activity = await prisma.activity.findFirst({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      image: true,
    },
  })

  if (activity)
    return NextResponse.json<ApiResponse<ActivityResponse>>(
      {
        body: activity as ActivityResponse,
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
