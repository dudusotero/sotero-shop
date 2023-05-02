import { SignInForm } from '@/components'
import { authOptions } from '@/instances/next-auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignIn() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/')
  }

  return (
    <div className="grid items-center">
      <SignInForm />
    </div>
  )
}
