'use client'

import ActivityCard from '@/components/activities/ActivitiyCard'
import InfoMessage from '@/components/message/InfoMessage'
import H2 from '@/components/typography/H2'
import { Button, Card, CardBody, Link, Tab, Tabs } from '@nextui-org/react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { ROUTES } from '@/routes'
import { useRouter } from 'next/navigation'
import useGetActiveActivities from '@/hooks/activity/useGetActiveActivities'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'

export default function Page() {
  const { user } = useContext(UserContext)
  const { data: dataActive, isLoading: isLoadingActive } =
    useGetActiveActivities()

  const router = useRouter()

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <div className="flex gap-2 justify-between items-center">
          <H2>Mes activités</H2>
          <Button
            as={Link}
            onClick={() => router.push(ROUTES.MEMBER.ADD_ACTIVITY)}
            variant="ghost"
            color="secondary"
            size="sm"
          >
            Créer une activité
          </Button>
        </div>

        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" size="lg">
            <Tab key="hosting" title="Que j'ai créé">
              {user.addedActivities?.filter(
                (activity) => new Date(activity.date) >= new Date()
              ).length === 0 ? (
                <InfoMessage>Aucune activités créé.</InfoMessage>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {user.addedActivities
                    ?.filter(
                      (activity) => new Date(activity.date) >= new Date()
                    )
                    .map((activity) => (
                      <ActivityCard
                        hosting
                        key={activity.id}
                        activity={activity}
                        displayFooter
                      />
                    ))}
                </div>
              )}
            </Tab>
            <Tab key="attending" title="Que je vais assiter">
              {isLoadingActive ? (
                <IsLoadingMessage type="flat" />
              ) : (
                <>
                  {user.userAttendance && user.userAttendance.length === 0 ? (
                    <InfoMessage>
                      Pas d&apos;activités trouvés en ce moment.
                    </InfoMessage>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      {user.userAttendance?.map((attendance) => {
                        const req = dataActive?.body?.find(
                          (activity) =>
                            activity.id === attendance.addedActivityId &&
                            attendance.status === 'Accepted'
                        )
                        return (
                          <ActivityCard
                            activity={req as AddedActivityResponse}
                            key={attendance.addedActivityId}
                            attending
                            displayFooter
                          />
                        )
                      })}
                    </div>
                  )}
                </>
              )}
            </Tab>
            <Tab key="past" title="Ancienne">
              {user.addedActivities?.filter(
                (activity) => new Date(activity.date) < new Date()
              ).length === 0 ? (
                <InfoMessage>Aucune activités trouvé.</InfoMessage>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {user.addedActivities
                    ?.filter((activity) => new Date(activity.date) < new Date())
                    .map((activity) => (
                      <ActivityCard
                        hosting
                        activity={activity}
                        key={activity.id}
                      />
                    ))}
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  )
}
