'use client'

import FontAwesome from '@/components/fontAwesome/FontAwesome'
import H2 from '@/components/typography/H2'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Button, CardBody, Chip } from '@nextui-org/react'
import { StepProps } from './basicInfoStep'
import { useRouter } from 'next/navigation'

export default function InterestStep({ setStep }: StepProps) {
  const router = useRouter()
  return (
    <CardBody className="flex gap-4 flex-col">
      <H2>Mes centres d&apos;intérét</H2>
      <div className="flex gap-2 flex-wrap">
        <Chip
          startContent={<FontAwesome icon={faCircleCheck} />}
          color="primary"
          className="cursor-pointer"
          size="lg"
        >
          Football
        </Chip>
        <Chip size="lg" className="cursor-pointer" variant="flat">
          Tennis
        </Chip>
        <Chip size="lg" className="cursor-pointer" variant="flat">
          Sortie en moto
        </Chip>
        <Chip size="lg" className="cursor-pointer" variant="flat">
          Sortie en vélo
        </Chip>
        <Chip size="lg" className="cursor-pointer" variant="flat">
          Padel
        </Chip>
        <Chip size="lg" className="cursor-pointer" variant="flat">
          Basket
        </Chip>
      </div>
      <div className="flex gap-2 justify-end w-full mt-8">
        <Button variant="light" className="max-w-24" onClick={() => setStep(2)}>
          Retour
        </Button>
        <Button
          variant="solid"
          color="primary"
          className="max-w-24"
          onClick={() => router.push('/member/profile')}
        >
          Continuer
        </Button>
      </div>
    </CardBody>
  )
}
