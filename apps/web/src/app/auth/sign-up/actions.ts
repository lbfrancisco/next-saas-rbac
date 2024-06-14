'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name.',
    }),
    email: z
      .string()
      .email({ message: 'Please, provide your e-mail address.' }),
    password: z.string().min(1, { message: 'Please, provide your password.' }),
    password_confirmation: z
      .string()
      .min(1, { message: 'Please, provide your confirmation password.' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
      email,
      password,
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
