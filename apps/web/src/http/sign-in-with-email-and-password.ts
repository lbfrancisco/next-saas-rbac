import { api } from './api-client'

type SignInWithEmailAndPasswordRequest = {
  email: string
  password: string
}

type SignInWithEmailAndPasswordResponse = {
  token: string
}

export async function signInWithEmailAndPassword({
  email,
  password,
}: SignInWithEmailAndPasswordRequest): Promise<SignInWithEmailAndPasswordResponse> {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithEmailAndPasswordResponse>()

  return result
}
