// src/app/page.tsx
import { Suspense } from 'react'
import NameForm from '@/components/NameForm'
import NameTable from '@/components/NameTable'

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Lucky Wheel Registration</h1>
      <NameForm />
      <div className="my-8 border-t border-gray-200" />
      <Suspense fallback={<div>Loading participants...</div>}>
        <NameTable />
      </Suspense>
    </main>
  )
}