// src/app/admin/page.tsx
import NameTable from '@/components/NameTable';
import { AirpodsLotterySection } from '@/components/AirpodsLotterySection';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-center gap-12">
        <img
          src="airpodsclosed.jpg"
          alt="Airpods Closed"
          className="max-w-md h-auto"
        />
        <img
          src="airpodsOpened.jpg"
          alt="Airpods Opened"
          className="max-w-md h-auto"
        />
      </div>
      <NameTable />
      <AirpodsLotterySection />
    </div>
  );
}