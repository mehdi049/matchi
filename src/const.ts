const APP_URL = process.env.NEXT_PUBLIC_APP_URL
export const MAX_UPLOAD_SIZE_IMG = process.env
  .NEXT_PUBLIC_MAX_UPLOAD_SIZE_IMG as string

export const ACTIVITY_TYPE_OPTIONS = [
  {
    value: 'Public',
    label: 'Public (Ouvert à tout le monde)',
  },
  {
    value: 'Private',
    label: 'Privée (Seulement par invitation)',
  },
]

export const API_ROUTES = {
  UPLOAD: APP_URL + '/api/upload',
  REGISTER: APP_URL + '/api/register',
  SIGNIN: APP_URL + '/api/signin',
  USER: {
    GET_BY_ID: (id: string) => `/api/member/id/${id}`,
    GET_BY_EMAIL: (email: string) => `/api/member/email/${email}`,
    UPDATE_USER_INTERESTS: (id: string) => `/api/member/interests/${id}`,
  },
  INTERESTS: APP_URL + '/api/interests',
  ACTIVITY: {
    GET_BY_ID: (id: number) => `/api/activity/${id}`,
    GET_BY_USER_ID: (id: string) => `/api/activity/user/${id}`,
    ADD_ACTIVITY: APP_URL + '/api/activity',
  },
}

export const QUERY_KEYS = {
  USER_ID: 'USER_ID',
  USER_EMAIL: 'USER_EMAIL',

  INTERESTS: 'INTERESTS',

  ACTIVITIES: 'ACTIVITIES',
  ACTIVITY_ID: 'ACTIVITY_ID',
}
