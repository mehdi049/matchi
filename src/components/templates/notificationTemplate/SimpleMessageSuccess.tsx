import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SimpleMessageProps } from './SimpleMessage'

export const NotificationSimpleMessageSuccess = ({
  message,
}: SimpleMessageProps) => {
  return (
    <>
      <div className="text-success">
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div>
        <div className="text-xs text-wrap">{message}</div>
      </div>
    </>
  )
}
