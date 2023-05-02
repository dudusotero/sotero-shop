import { authOptions } from '@/instances/next-auth'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
