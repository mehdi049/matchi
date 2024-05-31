export const ROUTES = {
  HOME: '/',

  ACTIVITY: (id: number) => '/activity/' + id,
  ACTIVITIES_AC: (activity: string, city: string) =>
    '/activities/' + activity + '/' + city,
  ACTIVITIES_A: (activity: string) => '/activities/' + activity,

  PROFILE: (id: number) => '/profiles/' + id,

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
