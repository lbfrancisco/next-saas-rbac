import { api } from './api-client'

type SignInWithGitHubRequest = {
  code: string
}

type SignInWithGitHubResponse = {
  token: string
}

export async function signInWithGitHub({
  code,
}: SignInWithGitHubRequest): Promise<SignInWithGitHubResponse> {
  const result = await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<SignInWithGitHubResponse>()

  return result
}
