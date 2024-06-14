import { Header } from '@/components/header'

import { CreateOrganizationForm } from './create-organization-form'

export default function CreateOrganization() {
  return (
    <div className="py-4">
      <Header />
      <main className="mx-auto mt-12 w-full max-w-[1200px]">
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Create organization</h1>

          <CreateOrganizationForm />
        </div>
      </main>
    </div>
  )
}
