'use client'

import { Card } from '@nextui-org/react'
import { useContext, useState } from 'react'
import BasicInfoStep from './steps/basicInfoStep'
import MyAddressStep from './steps/addressStep'
import InterestStep from './steps/interestStep'
import { UserContext } from '../context/UserContext'

export default function Page() {
  const [step, setStep] = useState(1)
  //const { user, setUser } = useContext(UserContext)

  return (
    <Card className="w-full">
      {/*JSON.stringify(user)*/}
      {step === 1 && <BasicInfoStep setStep={setStep} />}
      {step === 2 && <MyAddressStep setStep={setStep} />}
      {step === 3 && <InterestStep setStep={setStep} />}
    </Card>
  )
}
