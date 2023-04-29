import { ImageResponse } from 'next/server'

export const alt = 'Sotero Shop'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Sotero Shop
      </div>
    ),
    size
  )
}
