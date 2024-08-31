import { MESSAGES } from '@/const/message'
import prisma from '@/lib/prisma'
import { ApiResponse } from '@/types/apiResponse'
import {
  capitalizeFirstLetter,
  hashPassword,
  slugifyString,
} from '@/utils/string'
import { faker } from '@faker-js/faker'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import cities from '../../../../data/cities.json'
import { ADDED_ACTIVITY_TYPE } from '@/types/AddedActivityResponse'

const defaultFakeUser = 20
const defaultFakeActivities = 200

export async function PUT() {
  // add fake users

  let newUsers: any[] = []

  {
    ;[...Array(defaultFakeUser).keys()].map((x) => {
      const selectedCity = faker.helpers.arrayElement(cities)
      const municipality = faker.helpers.arrayElement(
        selectedCity.municipalities
      )
      newUsers.push({
        id: faker.string.alphanumeric(25),
        email: slugifyString(faker.person.firstName()) + '@gmail.com',
        password: hashPassword(faker.word.sample()),
        name: faker.person.fullName(),
        gender: capitalizeFirstLetter(faker.person.sexType()),
        birthDay: faker.date.birthdate(),
        bio: faker.lorem.words({ min: 10, max: 50 }),
        image: faker.image.avatar(),
        country: 'Tunisia',
        city: selectedCity.name,
        municipality: municipality,
      })
    })
  }

  try {
    await prisma.user.createMany({
      data: newUsers,
      skipDuplicates: true,
    })

    // add activities for each user

    const activities = await prisma.activity.findMany()

    let addedActivities: any[] = []
    {
      ;[...Array(defaultFakeActivities).keys()].map((x) => {
        const selectedCity = faker.helpers.arrayElement(cities)
        const municipality = faker.helpers.arrayElement(
          selectedCity.municipalities
        )
        const activityId =
          activities[faker.number.int({ min: 0, max: activities.length - 1 })]
            .id

        const userId =
          newUsers[faker.number.int({ min: 0, max: newUsers.length - 1 })].id

        addedActivities.push({
          description: faker.lorem.words({ min: 10, max: 50 }),
          title: faker.lorem.words({ min: 2, max: 5 }),
          country: 'Tunisia',
          city: selectedCity.name,
          municipality: municipality,
          place: faker.lorem.words({ min: 2, max: 5 }),
          date: faker.date.future(),
          start: faker.date.future(),
          end: faker.date.future(),
          maxAttendees: faker.number.int({ min: 0, max: 100 }),
          price: faker.number.int({ min: 0, max: 100 }),
          currency: 'TND',
          type: faker.helpers.enumValue(ADDED_ACTIVITY_TYPE),
          activityId: activityId,
          userId: userId,
        })
      })
    }

    await prisma.addedActivity.createMany({
      data: addedActivities,
    })

    return NextResponse.json<ApiResponse<string>>(
      {
        message: `${defaultFakeUser} membres ajouté / ${defaultFakeActivities} activitiés ajouté avec succés`,
      },
      { status: StatusCodes.OK }
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
