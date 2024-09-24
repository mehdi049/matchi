import { faCross } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SimpleMessageProps } from './SimpleMessage'

export const NotificationSimpleMessageError = ({
  message,
}: SimpleMessageProps) => {
  return (
    <>
      <div className="text-danger">
        <FontAwesomeIcon icon={faCross} />
      </div>
      <div>
        <div className="text-xs text-wrap">{message}</div>
      </div>
    </>
  )
}
