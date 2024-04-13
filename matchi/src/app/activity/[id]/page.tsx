import ActivityCardDetails from '@/components/activities/ActivityCardDetails'

export default function Page({ params }: { params: { id: string[] } }) {
  return (
    <>
      <ActivityCardDetails />
    </>
  )
}
