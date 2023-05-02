import swell from '@/instances/swell'
import crypto from 'crypto'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email address', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const data = await swell.account.login(
          credentials?.email!,
          credentials?.password!
        )

        if (data) {
          const user = {
            id: data.id!,
            email: data.email,
            name: data.name,
            image: `https://gravatar.com/avatar/${crypto
              .createHash('md5')
              .update(data.email || '')
              .digest('hex')}`,
          }

          return user
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
}
