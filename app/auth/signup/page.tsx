'use client'

import { useState } from 'react'
import { z } from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, RectangleEllipsis, ShieldCheck, User } from 'lucide-react'
import { handleConfirmSignUp, handleSignUp } from '../../actions/cognitoActions';
import { useRouter } from 'next/navigation'
import { GetUserDetails } from '@/app/context/UserdetailsProvider'

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  repeatPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms of service'),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ["repeatPassword"],
})

export default function SignUp() {
  const { setUserSignupEmail } = GetUserDetails();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    code: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      signUpSchema.parse(formData);

      const response = await handleSignUp(formData);
      const responseObj = JSON.parse(response);
      console.log(responseObj)

      if(responseObj.success){
        console.log(responseObj.message)
        setUserSignupEmail(formData.email)
        router.push('/auth/confirm-email')
        setErrors({})
      }else{
        console.log(responseObj.error)
        setErrors(responseObj.error)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full p-8 md:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Sign up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`flex justify-center items-center ${errors.name ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                <User />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div className={`flex justify-center items-center ${errors.email ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                <Mail />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div className={`flex justify-center items-center ${errors.password ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                <ShieldCheck />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
              <div className={`flex justify-center items-center ${errors.repeatPassword ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                <ShieldCheck />
                <input
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat your password"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                />
                {errors.repeatPassword && <p className="mt-1 text-xs text-red-500">{errors.repeatPassword}</p>}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
                  I agree all statements in <Link href="/terms" className="text-blue-600 hover:underline">Terms of service</Link>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-xs text-red-500">{errors.agreeTerms}</p>}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              I am already member. <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </div>
          <div className="hidden w-1/2 bg-gray-50 p-8 md:block">
            <div className="flex h-full items-center justify-center">
              <Image src="/signup-image.png" alt="Desk setup illustration" width={300} height={300} className="max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}