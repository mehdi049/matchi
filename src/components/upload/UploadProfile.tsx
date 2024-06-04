import { Avatar, Button } from '@nextui-org/react'
import IsLoadingMessage from '../message/IsLoadingMessage'
import ErrorMessage from '../message/ErrorMessage'
import { useRef } from 'react'
import useUploadMediaImage from '@/hooks/media/useUploadMediaImage'

type UploadProfileProps = {
  currentImg: string
}
export const UploadProfile = ({ currentImg }: UploadProfileProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { mutate, data, isError, isPending, error } = useUploadMediaImage({})
  const upload = async () => {
    if (inputFileRef.current?.files) {
      const file = inputFileRef.current.files[0]
      mutate(file)
    }
  }
  return (
    <div>
      <div className="flex gap-2">
        <Avatar src={data ? data.url : currentImg} className="w-40 h-40" />
        <div className="place-content-end">
          <Button
            size="sm"
            variant="ghost"
            color="primary"
            onClick={() => {
              inputFileRef.current?.click()
            }}
            isLoading={isPending}
          >
            Modifier
          </Button>
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={upload}
          />
        </div>
      </div>
      {isError && (
        <ErrorMessage className="mt-2 max-w-max" isVisible>
          {error.message}
        </ErrorMessage>
      )}
    </div>
  )
}
