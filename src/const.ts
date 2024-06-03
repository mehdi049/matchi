const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export const ACTIVITY_TYPE_OPTIONS = [
  {
    value: 'public',
    label: 'Public (Ouvert à tout le monde)',
  },
  {
    value: 'private',
    label: 'Privée (Seulement par invitation)',
  },
]

export const API_ROUTES = {
  REGISTER: APP_URL + '/api/register',
  SIGNIN: APP_URL + '/api/signin',
  USER: {
    GET_BY_ID: (id: string) => `/api/member/id/${id}`,
    GET_BY_EMAIL: (email: string) => `/api/member/email/${email}`,
  },
}

export const QUERY_KEYS = {
  USER_ID: 'USER_ID',
  USER_EMAIL: 'USER_EMAIL',
}
