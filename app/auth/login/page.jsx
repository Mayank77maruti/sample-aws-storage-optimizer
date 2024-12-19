'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import { LockKeyhole, User } from 'lucide-react'
import { handleSignIn } from '@/app/actions/cognitoActions'
import { useRouter } from 'next/navigation'
import { GetUserDetails } from '@/app/context/UserdetailsProvider'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean(),
})

export default function Login() {
  const { setUserSignupEmail } = GetUserDetails();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      loginSchema.parse(formData)
      const response = await handleSignIn(formData);
      const responseObj = JSON.parse(response);

      if(responseObj.success){
        router.push('/dashboard')
        setErrors({})
      }else if(responseObj.error === "User is not verified"){
        setUserSignupEmail(formData.email)
        router.push('/auth/confirm-email')
      }else if(responseObj.error === "NotAuthorizedException"){
        setErrors({
          password: "Wrong username or password",
          email: "Wrong username or password" 
        })
      }else{
        console.log("Can't login user: ", responseObj.error);
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
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={`flex justify-center items-center ${errors.email ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                <User />
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
                <LockKeyhole/>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account? <Link href="/auth/signup" className="text-blue-600 hover:underline">Sign up</Link>
            </p>
          </div>
          <div className="hidden w-1/2 bg-gray-50 p-8 md:block">
            <div className="flex h-full items-center justify-center">
              <Image src="/login-image.png" alt="Desk setup illustration" width={300} height={300} className="max-w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}