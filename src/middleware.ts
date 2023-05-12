import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const reqHeaders: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(
      process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY!
    ).toString('base64')}`,
  }

  const session = request.cookies.get('swell-session')
  const locale = request.cookies.get('swell-locale')
  const currency = request.cookies.get('swell-currency')

  if (session) {
    reqHeaders['X-Session'] = session.value
  }

  if (locale) {
    reqHeaders['X-Locale'] = locale.value
  }

  if (currency) {
    reqHeaders['X-Currency'] = currency.value
  }

  const redirectUrl = new URL('/signin', request.url)
  redirectUrl.searchParams.set('redirectTo', request.nextUrl.href)
  const response = NextResponse.redirect(redirectUrl)

  try {
    const swellResponse = await fetch(
      `${process.env.SWELL_API_ENDPOINT}/account`,
      {
        method: 'get',
        headers: reqHeaders,
        credentials: 'include',
        mode: 'cors',
      }
    )

    const account = await swellResponse.json()

    if (!account) {
      return response
    }

    return NextResponse.next()
  } catch (error) {
    console.error(error)
    response.cookies.delete('swell-session')
  }

  return response
}

export const config = {
  matcher: ['/profile/:path*'],
}
