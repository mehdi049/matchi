import { Avatar, Button } from '@nextui-org/react'
import ErrorMessage from '../message/ErrorMessage'
import { useContext, useEffect, useRef } from 'react'
import useUploadMediaImage from '@/hooks/media/useUploadMediaImage'
import useUpdateUser from '@/hooks/user/useUpdateUser'
import SuccessMessage from '../message/SuccessMessage'
import { UserContext } from '@/app/member/context/UserContext'

type UploadProfileProps = {
  currentImg: string
}
export const UploadProfile = ({ currentImg }: UploadProfileProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const { user } = useContext(UserContext)
  const {
    mutate: mutateUpdateUser,
    isSuccess: isSuccessUpdateUser,
    isPending: isPendingUpdateUser,
  } = useUpdateUser({})

  const { mutate, data, isError, isPending, error, isSuccess } =
    useUploadMediaImage({})

  // update user when image is uploaded
  useEffect(() => {
    if (isSuccess) {
      mutateUpdateUser({
        id: user.id,
        user: {
          ...user,
          image: data?.url as string,
        },
      })
    }
  }, [isPending])

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
      <ErrorMessage className="mt-2 max-w-max" isVisible={isError}>
        {error?.message}
      </ErrorMessage>
      <SuccessMessage
        isVisible={isSuccessUpdateUser && !isPendingUpdateUser}
        autoClose={true}
        className="mt-2 max-w-max"
      >
        Photo de profil mis à jour avec succés
      </SuccessMessage>
    </div>
  )
}
