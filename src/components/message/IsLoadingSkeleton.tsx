import { Card, Skeleton } from '@nextui-org/react'

type IsLoadingSkeletonProps = {
  className?: string
  count?: number
  type: 'activity-list' | 'activity-card' | 'profile-list' | 'profile-card'
}
export default function IsLoadingSkeleton({
  className = '',
  count = 8,
  type,
}: IsLoadingSkeletonProps) {
  if (type === 'activity-list')
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 ${className}`}
      >
        {[...Array(count).keys()].map((x, key) => {
          return (
            <Card key={key} className="space-y-5 p-4" radius="lg">
              <div className="w-full flex items-center gap-3">
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>
              <Skeleton className="rounded-lg">
                <div className="h-44 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-full rounded-lg">
                  <div className="h-5 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
            </Card>
          )
        })}
      </div>
    )

  return <></>
}
