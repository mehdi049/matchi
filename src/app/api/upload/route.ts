import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
          ],
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Run any logic after the file upload completed
      },
    })

    return NextResponse.json(jsonResponse)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: StatusCodes.BAD_REQUEST }
    )
  }
}
