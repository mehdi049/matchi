import { Card, CardBody, CircularProgress } from '@nextui-org/react'

type IsLoadingMessageProps = {
  className?: string
}
export default function IsLoadingMessage({ className }: IsLoadingMessageProps) {
  return (
    <Card className={className}>
      <CardBody>
        <div className="flex gap-2 items-center">
          <CircularProgress aria-label="Chargement..." size="sm" />
          <p className="text-sm">Chargement...</p>
        </div>
      </CardBody>
    </Card>
  )
}
