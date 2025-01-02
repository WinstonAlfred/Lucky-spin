// src/app/admin/page.tsx
import NameTable from '@/components/NameTable'
import { MacbookLotterySection } from '@/components/MacbookLotterySection';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-center">
        <img
          src="macbook.jpg"
          alt="macbook air m1"
          className="max-w-md h-auto"
          width={800}
        />
      </div>
      <NameTable />
      < MacbookLotterySection />
    </div>
  );
}