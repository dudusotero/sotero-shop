import SignUpForm from '@/components/SignUpForm'
import Image from 'next/image'

export default function SignUp() {
  return (
    <div className="flex min-h-max flex-1 flex-col justify-center px-6 pb-12 pt-0 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          priority
          className="mx-auto h-10 w-auto"
          src="/ss-logo.png"
          alt="Sotero Shop"
          width={40}
          height={40}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
