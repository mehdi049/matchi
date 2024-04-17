'use client'

import ActivityCard from '@/components/activities/ActivitiyCard'
import InfoMessage from '@/components/message/InfoMessage'
import H2 from '@/components/typography/H2'
import { Button, Card, CardBody, Link, Tab, Tabs } from '@nextui-org/react'

export default function Page() {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const randomNumber = getRandomInt(8)

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <div className="flex gap-2 justify-between items-center">
          <H2>Mes activités</H2>
          <Button
            as={Link}
            href="/member/activities/add"
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
              {randomNumber === 0 ? (
                <InfoMessage>
                  <p>Pas d&apos;activités trouvés en ce moment.</p>
                </InfoMessage>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[...Array(randomNumber).keys()].map((x, key) => {
                    return (
                      <div key={key}>
                        <ActivityCard hosting />
                      </div>
                    )
                  })}
                </div>
              )}
            </Tab>
            <Tab key="attending" title="Que je vais assiter">
              {randomNumber === 0 ? (
                <InfoMessage>
                  <p>Pas d&apos;activités trouvés en ce moment.</p>
                </InfoMessage>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[...Array(randomNumber).keys()].map((x, key) => {
                    return (
                      <div key={key}>
                        <ActivityCard attending />
                      </div>
                    )
                  })}
                </div>
              )}
            </Tab>
            <Tab key="past" title="Ancienne">
              {randomNumber === 0 ? (
                <InfoMessage>
                  <p>Pas d&apos;activités trouvés en ce moment.</p>
                </InfoMessage>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[...Array(randomNumber).keys()].map((x, key) => {
                    return (
                      <div key={key}>
                        <ActivityCard />
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
