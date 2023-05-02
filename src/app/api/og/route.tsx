import { ImageResponse, NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(
  request: NextRequest
): Promise<Response | ImageResponse> {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.has('title')
      ? searchParams.get('title')?.slice(0, 100)
      : process.env.SITE_NAME

    return new ImageResponse(
      (
        <div tw="flex h-full w-full flex-col items-center justify-center bg-black">
          <svg viewBox="0 0 32 32" width="140">
            <rect width="100%" height="100%" rx="16" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="black"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            />
          </svg>

          <div tw="mt-12 text-6xl text-white font-bold">{title}</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    if (!(e instanceof Error)) throw e

    console.log(e.message)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
