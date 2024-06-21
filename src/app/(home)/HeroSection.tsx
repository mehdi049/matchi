import { SearchForm } from '@/components/search/SearchForm'

export default function HeroSection() {
  return (
    <div
      style={{ backgroundImage: 'url(/bg-home/bg-home-4.jpg)' }}
      className="h-screen bg-center bg-cover -mt-16 flex justify-center items-center px-4"
    >
      <SearchForm />
    </div>
  )
}
