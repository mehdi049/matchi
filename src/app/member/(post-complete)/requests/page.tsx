'use client'

import ActivityCard from '@/components/activities/ActivitiyCard'
import InfoMessage from '@/components/message/InfoMessage'
import H2 from '@/components/typography/H2'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'

export default function Page() {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const randomNumber = getRandomInt(8)

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mes demandes</H2>

        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" size="lg">
            <Tab key="new" title="En cours">
              {randomNumber === 0 ? (
                <InfoMessage>
                  <p>Pas de demandes trouvés.</p>
                </InfoMessage>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[...Array(randomNumber).keys()].map((x, key) => {
                    return (
                      <div key={key}>
                        <ActivityCard status="Accepted" />
                      </div>
                    )
                  })}
                </div>
              )}
            </Tab>
            <Tab key="past" title="Anciennes">
              {randomNumber === 0 ? (
                <InfoMessage>
                  <p>Pas de demandes trouvés.</p>
                </InfoMessage>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[...Array(randomNumber).keys()].map((x, key) => {
                    return (
                      <div key={key}>
                        <ActivityCard status="Accepted" />
                      </div>
                    )
                  })}
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  )
}
