export type ActivityStatus = 'Active' | 'Inactive'
export type ActivityResponse = {
  id: number
  name: string
  image: string
  slug: string
  status: ActivityStatus
}
