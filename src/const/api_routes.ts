const APP_URL = process.env.NEXT_PUBLIC_APP_URL

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
  ATTENDANCE: {
    ADD: APP_URL + '/api/attendance',
    GET_BY_ID: (id: number) => APP_URL + `/api/attendance/${id}`,
  },
}
