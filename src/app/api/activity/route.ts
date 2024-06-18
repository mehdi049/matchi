import { MESSAGES } from '@/const/message'
import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const {
      activityId,
      userId,
      title,
      description,
      country,
      city,
      municipality,
      place,
      googleMap,
      date,
      start,
      end,
      maxAttendees,
      price,
      currency,
      type,
    } = body

    await prisma.addedActivity.create({
      data: {
        description: description,
        title: title,
        country: country,
        city: city,
        municipality: municipality,
        place: place,
        googleMap: googleMap,
        date: date,
        start: start,
        end: end,
        maxAttendees: maxAttendees,
        price: price,
        currency: currency,
        type: type,
        userId: userId,
        activityId: activityId,
      },
    })

    return NextResponse.json<ApiResponse<string>>(
      {
        message: 'Activité créé avec succés',
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
