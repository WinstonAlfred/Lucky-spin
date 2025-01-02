'use client'

import React from 'react';
import { useFormStatus } from 'react-dom';
import { createParticipant } from '@/actions/participant';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserPlus, Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors duration-200 shadow-sm"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          <UserPlus className="w-5 h-5" />
          <span>Join Now</span>
        </>
      )}
    </button>
  );
}

export default function NameForm() {
  return (
    <Card className="max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          Join the Participants List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createParticipant} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
              placeholder="Enter your name"
              required
            />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}