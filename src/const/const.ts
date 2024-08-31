export const ENV = process.env.ENV as 'DEV' | 'PROD'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export const MAX_UPLOAD_SIZE_IMG = process.env
  .NEXT_PUBLIC_MAX_UPLOAD_SIZE_IMG as string

export const DEFAULT_AVATAR = {
  MALE: 'https://iklsbmdx7uxraqfa.public.blob.vercel-storage.com/avatar-male-oHsq90qz4KOEWvUG3DKbZt9iSqgtOc.webp',
  FEMALE:
    'https://iklsbmdx7uxraqfa.public.blob.vercel-storage.com/avatar-female-8A5wtjHYUYGsnugYy8LdU5wcDfxUNA.webp',
}

export const SENDER_EMAIL = process.env.RESEND_SENDER_EMAIL
export const TEST_RECEIVER_EMAIL = process.env.TEST_RECEIVER_EMAIL as string
