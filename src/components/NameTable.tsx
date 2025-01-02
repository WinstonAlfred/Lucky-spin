import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

async function getParticipants() {
  return await prisma.participant.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export default async function NameTable() {
  const participants = await getParticipants();

  return (
    <Card className="container mx-auto my-4 md:my-8">
      <CardHeader className="bg-gray-50 border-b border-gray-200 p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-800">
          Current Participants
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Outer container with max height and vertical scroll */}
        <div className="max-h-[70vh] overflow-y-auto">
          {/* Inner container with horizontal scroll */}
          <div className="overflow-x-auto min-w-full">
            <table className="w-full">
              <thead className="sticky top-0 bg-gray-50 shadow-sm">
                <tr>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider border-b">
                    Name
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider border-b">
                    Joined On
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {participants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-gray-800">
                      {participant.name}
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-gray-600">
                      {new Date(participant.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}