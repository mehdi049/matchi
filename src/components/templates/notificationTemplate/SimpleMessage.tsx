export type SimpleMessageProps = {
  message: React.ReactElement
}
export const NotificationSimpleMessage = ({ message }: SimpleMessageProps) => {
  return (
    <div>
      <div className="text-xs text-wrap">{message}</div>
    </div>
  )
}
