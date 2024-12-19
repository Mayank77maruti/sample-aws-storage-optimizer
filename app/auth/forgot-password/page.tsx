'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import Link from 'next/link'
import Image from 'next/image'
import { LockKeyhole, RectangleEllipsis, User } from 'lucide-react'
import { confirmResetPass, handleSignIn, resetPass } from '@/app/actions/cognitoActions'
import { useRouter } from 'next/navigation'
import { GetUserDetails } from '@/app/context/UserdetailsProvider'
import { ConfirmResetPasswordInput, ResetPasswordInput } from 'aws-amplify/auth'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean(),
})

export default function ForgotPass() {
  const router = useRouter();

  const [isInitiated, setIsinitiated] = useState<boolean>(false);

  const [initiateResetForm, setInitiateResetForm] = useState<ResetPasswordInput>({
    username: ''
  });

  const [resetPassForm, setResetPassForm] = useState<ConfirmResetPasswordInput>({
    confirmationCode: '',
    newPassword: '',
    username: ''
  });


  const [errors, setErrors] = useState({});

  const onChangeInitiateForm = (e) => {
    const { name, value, type, checked } = e.target
    setInitiateResetForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  console.log(initiateResetForm);
  }
  

  const onChangeResetForm = (e) => {
    const { name, value, type, checked } = e.target
    setResetPassForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleInitiateResetFormSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await resetPass(initiateResetForm);
      const responseObj = JSON.parse(response);
      if(responseObj.success){
        setIsinitiated(true);
        setErrors({});
      }else{
        console.log("Can't Reset Password: ", responseObj.error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors)
      }
    }
  }

  const handleResetFormSubmit = async(e) => {
    e.preventDefault();

    try {
        const response = await confirmResetPass(resetPassForm);
        const responseObj = JSON.parse(response);

        if(responseObj.success){
            router.push('/auth/login');
            setErrors({});
        }else{
            console.log("Can't Reset Password: ", responseObj.error);
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
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Reset Password</h2>
            {
                isInitiated &&
                <p>A confirmation code has been sent on your email</p>
            }
            {/* Initiate Form */}
            {
                !isInitiated &&
                <form onSubmit={handleInitiateResetFormSubmit} className="space-y-4">
                    <div className={`flex justify-center items-center ${errors.email ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                        <User />
                        <input
                            type="email"
                            name="username"
                            placeholder="Your Email"
                            value={initiateResetForm.username}
                            onChange={onChangeInitiateForm}
                            className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Send OTP
                    </button>
                    </form>
            }

            {/* Reset Form */}
            {
                isInitiated &&
                <form onSubmit={handleResetFormSubmit} className="space-y-4">
                    <div className={`flex justify-center items-center ${errors.email ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                        <User />
                        <input
                            type="email"
                            name="username"
                            placeholder="Your Email"
                            value={resetPassForm.username}
                            onChange={onChangeResetForm}
                            className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>
                    <div className={`flex justify-center items-center ${errors.password ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                        <LockKeyhole />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={resetPassForm.newPassword}
                            onChange={onChangeResetForm}
                            className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                    </div>
                    <div className={`flex justify-center items-center ${errors.confirmationcode ? 'border-red-500' : 'border-gray-300'} border-b-2`}>
                        <RectangleEllipsis />
                        <input
                            type="text"
                            name="confirmationCode"
                            placeholder="Confirmation Code"
                            value={resetPassForm.confirmationCode}
                            onChange={onChangeResetForm}
                            className={`w-full px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none`}
                        />
                        {errors.confirmationcode && <p className="mt-1 text-xs text-red-500">{errors.confirmationcode}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Reset
                    </button>
                    </form>
            }
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