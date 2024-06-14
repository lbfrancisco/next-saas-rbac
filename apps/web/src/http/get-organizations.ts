import { api } from './api-client'

type GetOrganizationsResponse = {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export async function getOrganizations(): Promise<GetOrganizationsResponse> {
  const result = await api.get('organizations').json<GetOrganizationsResponse>()

  return result
}
