import { prisma } from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { deleteParticipant } from '@/actions/participant';

async function getParticipants() {
  return await prisma.participant.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export default async function AdminNameTable() {
  const participants = await getParticipants();

  return (
    <Card className="container mx-auto my-8 overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Current Participants
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b">
                  Joined On
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {participants.map((participant) => (
                <tr
                  key={participant.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {participant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(participant.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <form action={deleteParticipant}>
                      <input type="hidden" name="id" value={participant.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}