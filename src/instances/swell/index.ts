import swell from 'swell-js'

const {
  NEXT_PUBLIC_SWELL_STORE_ID,
  NEXT_PUBLIC_SWELL_PUBLIC_KEY,
  SWELL_API_ENDPOINT,
  SWELL_SECRET_KEY,
} = process.env

export function swellFetch(
  input: URL | RequestInfo,
  init?: RequestInit | undefined
): Promise<Response> {
  return fetch(`${SWELL_API_ENDPOINT}/${input}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Basic ${Buffer.from(
        `${NEXT_PUBLIC_SWELL_STORE_ID}:${SWELL_SECRET_KEY}`,
        'binary'
      ).toString('base64')}`,
    },
  })
}

swell.init(NEXT_PUBLIC_SWELL_STORE_ID!, NEXT_PUBLIC_SWELL_PUBLIC_KEY!)

export default swell
