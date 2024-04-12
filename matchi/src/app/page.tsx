import Activities from '@/components/activities/Activities'

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <Activities activityName="Padel" />

      <Activities activityName="Football" />

      <Activities activityName="Sortie en moto" />
    </div>
  )
}
