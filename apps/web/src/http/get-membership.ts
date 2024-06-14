import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetMembershipResponse = {
  membership: {
    id: string
    role: Role
    userId: string
    organizationId: string
  }
}

export async function getMembership(
  slug: string,
): Promise<GetMembershipResponse> {
  const result = await api
    .get(`organizations/${slug}/membership`)
    .json<GetMembershipResponse>()

  return result
}
