// src/app/admin/page.tsx
import AdminNameTable from '@/components/AdminNameTable'
import { LotterySection } from '@/components/LotterySection'

export default async function AdminPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <AdminNameTable />
      <LotterySection />
    </div>
  )
}