// src/app/admin/page.tsx
import NameTable from '@/components/NameTable'
import { LotterySection } from '@/components/LotterySection'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
        <NameTable />
        <LotterySection />
    </div>
  )
}