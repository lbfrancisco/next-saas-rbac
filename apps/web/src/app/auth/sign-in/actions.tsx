'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { signInWithEmailAndPassword } from '@/http/sign-in-with-email-and-password'

const signInSchema = z.object({
  email: z.string().email({ message: 'Please, provide your e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export async function signInWithEmailAndPasswordAction(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithEmailAndPassword({
      email,
      password,
    })

    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: null,
    errors: null,
  }
}
