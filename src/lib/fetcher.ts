import { ApiResponse } from '@/types/apiResponse'

type fetcherProps = {
  method: 'POST' | 'PUT' | 'DELETE'
  url: string
  body?: BodyInit
  token?: string
  isMedia?: boolean
}
export const fetcher = <T>({ url, method, body, token }: fetcherProps) => {
  let headerInit: HeadersInit

  if (token)
    headerInit = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + token,
    }
  else
    headerInit = {
      'Content-Type': 'application/json',
    }

  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headerInit,
  }).then(async (response) => {
    if (response.ok) return response.json() as ApiResponse<T>
    const error = (await response.json()) as ApiResponse<string>
    throw Error(error.message)
  })
  //catch not used to catch error in useMutation
  //.catch((err) => console.log('err :', err))
}

type fetcherGetProps = {
  url: string
  token?: string
}
export const fetcherGet = <T>({ url, token }: fetcherGetProps) => {
  let headerInit: HeadersInit

  if (token)
    headerInit = {
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + token,
    }
  else
    headerInit = {
      'Content-Type': 'application/json',
    }

  return fetch(url, {
    method: 'GET',
    headers: headerInit,
  }).then(async (response) => {
    if (response.ok) return response.json() as ApiResponse<T>
    const error = (await response.json()) as ApiResponse<string>
    throw Error(error.message)
  })
}
