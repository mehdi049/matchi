import { createContext, useState } from 'react'

export const ProgressContext = createContext({
  progress: 0,
  setProgress: (payload: number) => {},
})

type ProgressContextProviderProps = {
  children: React.ReactNode
}
export const ProgressContextProvider = ({
  children,
}: ProgressContextProviderProps) => {
  const [progress, setProgress] = useState(0)

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}
