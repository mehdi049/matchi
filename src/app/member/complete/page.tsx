'use client'

import { Card } from '@nextui-org/react'
import { useState } from 'react'
import BasicInfoStep from './steps/basicInfoStep'
import MyAddressStep from './steps/addressStep'
import InterestStep from './steps/interestStep'

export default function Page() {
  const [step, setStep] = useState(1)

  return (
    <Card className="w-full">
      {step === 1 && <BasicInfoStep setStep={setStep} />}
      {step === 2 && <MyAddressStep setStep={setStep} />}
      {step === 3 && <InterestStep setStep={setStep} />}
    </Card>
  )
}
