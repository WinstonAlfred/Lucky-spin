// src/app/admin/page.tsx
import NameTable from '@/components/NameTable'
import { HuaweiLotterySection } from '@/components/HuaweiLotterySection';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-center">
        <img
          src="huawei.png"
          alt="Huawei Watch d2"
          className="max-w-md h-auto"
        />
      </div>
      <NameTable />
      <HuaweiLotterySection />
    </div>
  );
}