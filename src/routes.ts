export const ROUTES = {
  HOME: '/',

  ACTIVITY: (id: number) => '/activity/' + id,
  ACTIVITIES_SEARCH: (
    city: string,
    activity: string = 'all',
    date: string = ''
  ) => '/activities/' + city + '/' + activity + '/' + date,

  PROFILE: (id: string) => '/profiles/' + id,
  PROFILES: '/profiles',

  MEMBER: {
    COMPLETE_PROFILE: '/member/complete',
    PROFILE: '/member/profile',
    MY_ACTIVITIES: '/member/activities',
    MY_REQUESTS: '/member/requests',
    MY_REVIEWS: '/member/reviews',
    MESSAGES: '/member/messages',
    ACCOUNT: '/member/account',
    ADD_ACTIVITY: '/member/activities/add',
    EDIT_ACTIVITY: (id: number) => '/member/activities/edit/' + id,
  },
}
