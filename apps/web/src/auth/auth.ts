import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}

export function getCurrentOrg() {
  return cookies().get('organization_slug')?.value ?? null
}

export async function getCurrentMembership() {
  const orgSlug = getCurrentOrg()

  if (!orgSlug) {
    return null
  }

  const { membership } = await getMembership(orgSlug)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}
