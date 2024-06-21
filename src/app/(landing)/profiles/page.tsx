import ProfileCard from '@/components/profile/ProfileCard'
import H3 from '@/components/typography/H3'
import { SearchForm } from '@/components/search/SearchForm'

export default function Page() {
  return (
    <div>
      <SearchForm type="profiles" className="mb-8" />

      <H3 className="mb-4">Padel / Tunis</H3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {[...Array(20).keys()].map((x, key) => {
          return <ProfileCard key={key} />
        })}
      </div>
    </div>
  )
}
