import Activities from '@/components/activities/Activities'

export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <div className="flex flex-col gap-16">
      <Activities activityName={params.slug[0]} city={params.slug[1]} />
    </div>
  )
}
