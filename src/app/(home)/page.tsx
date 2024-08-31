'use client'

import ActivitiesByType from './ActivitiesByType'
import useGetInterests from '@/hooks/interest/useGetInterests'
import IsLoadingSkeleton from '@/components/skeleton/IsLoadingSkeleton'
import { useSearchParams } from 'next/navigation'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect } from 'react'

export default function Home() {
  const { data, isPending } = useGetInterests()
  const searchParams = useSearchParams()
  const authError = searchParams.get('error')

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (authError === 'OAuthAccountNotLinked' || authError === 'Configuration')
      onOpenChange()
  }, [authError])

  if (isPending) return <IsLoadingSkeleton type="activity-list-vertical" />

  return (
    <>
      <div className="flex flex-col gap-16">
        {data?.body?.map((activityType) => (
          <ActivitiesByType key={activityType.id} activityType={activityType} />
        ))}

        <Modal size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Problème d&apos;authentification
                </ModalHeader>
                <ModalBody>
                  <p>
                    Votre adresse email est déjà associée à une autre méthode
                    d&apos;authentification, veuillez utiliser une autre méthode
                    de connexion.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onClick={onClose}>
                    Fermer
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
