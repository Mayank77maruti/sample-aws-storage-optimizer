'use client'

import { useState } from 'react'
import { z } from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, RectangleEllipsis, ShieldCheck, User } from 'lucide-react'
import { handleConfirmSignUp, handleSendEmailVerificationCode, handleSignUp } from '../../actions/cognitoActions';
import { useRouter } from 'next/navigation'
import { GetUserDetails } from '@/app/context/UserdetailsProvider'

const signUpSchema = z.object({
    email: z.string().email('Invalid email address'),
    code: z.string().min(6, 'OTP must be a 6 digit code'),
})

export default function ConfirmEmail() {
    const { userSignupEmail, setUserSignupEmail } = GetUserDetails() || {};
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: userSignupEmail,
    code: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const resendOTP = async() => {
    try {
      const response = await handleSendEmailVerificationCode({ email: userSignupEmail })
      const responseObj = JSON.parse(response)

      if(responseObj.success){
        console.log(responseObj.message);
      }else{
        console.log("Can't send OTP: ", responseObj.error);
      }
    } catch (error) {
      console.log("Can't send OTP: ", error);
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      signUpSchema.parse(formData)
      
      const response = await handleConfirmSignUp({ email: formData.email, code: formData.code })
      const responseObj = JSON.parse(response)

      if(responseObj.success){
        console.log(responseObj.message)
        setUserSignupEmail('');
        setErrors({})

        if(responseObj.redirectedFrom === 'login'){
          router.push('/auth/login')
        }else{
          router.push('/dashboard')
        }
      }else if(responseObj.error === 'Invalid verification code provided, please try again.'){
        setErrors({ code: 'Incorrect OTP'  })
      }else{
        console.log(responseObj.error)
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
                <div className={`flex justify-center items-center border-b-2`}>
                    <RectangleEllipsis />
                    <input
                    type="number"
                    name="code"
                    placeholder="Confirmation code"
                    value={formData.code}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                    />
                    {errors.code && <p className="mt-1 text-xs text-red-500">{errors.code}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Verify
                </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              didn't recieve OTP? <span onClick={resendOTP} className="text-blue-600 hover:underline cursor-pointer">Resend</span>
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