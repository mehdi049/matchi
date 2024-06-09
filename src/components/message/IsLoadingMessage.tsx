import { Card, CardBody, CircularProgress } from '@nextui-org/react'

type IsLoadingMessageProps = {
  className?: string
  type?: 'card' | 'flat' | 'full-page'
}
export default function IsLoadingMessage({
  className,
  type = 'card',
}: IsLoadingMessageProps) {
  const Core = () => {
    return (
      <div className="flex gap-2 items-center">
        <CircularProgress aria-label="Chargement..." size="sm" />
        <p className="text-sm">Chargement...</p>
      </div>
    )
  }
  return (
    <>
      {type === 'card' && (
        <Card className={className}>
          <CardBody>
            <Core />
          </CardBody>
        </Card>
      )}
      {type === 'flat' && <Core />}
    </>
  )
}
