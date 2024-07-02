'use client'

import ActivityCard from '@/components/activities/ActivitiyCard'
import InfoMessage from '@/components/message/InfoMessage'
import H2 from '@/components/typography/H2'
import useGetActiveActivities from '@/hooks/activity/useGetActiveActivities'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import useGetInactiveActivities from '@/hooks/activity/useGetInactiveActivities'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'

export default function Page() {
  const { user } = useContext(UserContext)
  const { data: dataActive, isLoading: isLoadingActive } =
    useGetActiveActivities()
  const { data: dataInactive, isLoading: isLoadingInactive } =
    useGetInactiveActivities()

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mes demandes</H2>

        {isLoadingActive || isLoadingInactive ? (
          <IsLoadingMessage type="flat" />
        ) : (
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size="lg">
              <Tab key="new" title="En cours">
                {user.userAttendance && user.userAttendance.length === 0 ? (
                  <InfoMessage>Pas de demandes trouvés.</InfoMessage>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {user.userAttendance?.map((request, key) => {
                      const req = dataActive?.body?.find(
                        (activity) => activity.id === request.addedActivityId
                      )
                      return (
                        <ActivityCard
                          key={key}
                          activity={req as AddedActivityResponse}
                          requestStatus={request.status}
                          display="minimal"
                        />
                      )
                    })}
                  </div>
                )}
              </Tab>
              <Tab key="past" title="Anciennes">
                {user.userAttendance && user.userAttendance.length === 0 ? (
                  <InfoMessage>Pas de demandes trouvés.</InfoMessage>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    {user.userAttendance?.map((request, key) => {
                      const req = dataInactive?.body?.find(
                        (activity) => activity.id === request.addedActivityId
                      )
                      return (
                        <ActivityCard
                          key={key}
                          activity={req as AddedActivityResponse}
                          requestStatus={request.status}
                          display="minimal"
                        />
                      )
                    })}
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
