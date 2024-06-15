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
  INTERESTS: {
    GET_ALL: APP_URL + '/api/interests',
    GET_BY_SLUG: (slug: string) => APP_URL + '/api/interests/slug/' + slug,
  },
  ACTIVITY: {
    GET_BY_ID: (id: number) => `/api/activity/${id}`,
    GET_BY_USER_ID: (id: string) => `/api/activity/user/${id}`,
    GET_BY_TYPE_ACTIVE: (activityId: number) =>
      APP_URL + `/api/activity/active/type/${activityId}`,
    GET_ALL_ACTIVE: APP_URL + '/api/activity/active',

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
