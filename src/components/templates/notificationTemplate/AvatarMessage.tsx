import { Avatar } from '@nextui-org/react'

export type AvatarMessageProps = {
  avatarName: string
  avatarImage: string
  children: React.ReactElement
}
export const AvatarMessage = ({
  avatarName,
  avatarImage,
  children,
}: AvatarMessageProps) => {
  return (
    <>
      <div>
        <Avatar
          className="w-8 h-8 opacity-100-f"
          name={avatarName}
          src={avatarImage}
        />
      </div>

      {children}
    </>
  )
}
