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
}
