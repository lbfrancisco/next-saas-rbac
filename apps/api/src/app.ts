import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '@saas/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './http/error-handler'
import { authenticateWithGithub } from './http/routes/auth/authenticate-with-github'
import { authenticateWithPassword } from './http/routes/auth/authenticate-with-password'
import { createAccount } from './http/routes/auth/create-account'
import { getProfile } from './http/routes/auth/get-profile'
import { requestPasswordRecover } from './http/routes/auth/request-password-recover'
import { resetPassword } from './http/routes/auth/reset-password'
import { getOrganizationBilling } from './http/routes/billing/get-organization-billing'
import { acceptInvite } from './http/routes/invites/accept-invite'
import { createInvite } from './http/routes/invites/create-invite'
import { fetchInvites } from './http/routes/invites/fetch-invites'
import { fetchPendingInvites } from './http/routes/invites/fetch-pending-invites'
import { getInvite } from './http/routes/invites/get-invite'
import { rejectInvite } from './http/routes/invites/reject-invite'
import { revokeInvite } from './http/routes/invites/revoke-invite'
import { fetchMembers } from './http/routes/members/fetch-members'
import { removeMember } from './http/routes/members/remove-member'
import { updateMember } from './http/routes/members/update-member'
import { createOrganization } from './http/routes/orgs/create-organization'
import { deleteOrganization } from './http/routes/orgs/delete-organization'
import { fetchOrganizations } from './http/routes/orgs/fetch-organizations'
import { getMembership } from './http/routes/orgs/get-membership'
import { getOrganization } from './http/routes/orgs/get-organization'
import { transferOrganization } from './http/routes/orgs/transfer-organization'
import { updateOrganization } from './http/routes/orgs/update-organization'
import { createProject } from './http/routes/projects/create-project'
import { deleteProject } from './http/routes/projects/delete-project'
import { fetchProjects } from './http/routes/projects/fetch-projects'
import { getProject } from './http/routes/projects/get-project'
import { updateProject } from './http/routes/projects/update-project'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Fullstack SaaS app with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.setErrorHandler(errorHandler)

/** Authorization */
app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(authenticateWithGithub)

/** Organization */
app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(fetchOrganizations)
app.register(updateOrganization)
app.register(deleteOrganization)
app.register(transferOrganization)

/** Project */
app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(fetchProjects)
app.register(updateProject)

/** Member */
app.register(fetchMembers)
app.register(updateMember)
app.register(removeMember)

/** Invite */
app.register(createInvite)
app.register(getInvite)
app.register(fetchInvites)
app.register(acceptInvite)
app.register(rejectInvite)
app.register(revokeInvite)
app.register(fetchPendingInvites)

/** Billing */
app.register(getOrganizationBilling)
