'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SelectMacbookWinner } from '@/actions/participant'
import { Card, CardContent } from '@/components/ui/card'

export function MacbookLotterySection() {
  const [macbookWinner, setMacbookWinner] = useState<{ name: string } | null>(null)
  const [isSelectingMacbook, setIsSelectingMacbook] = useState(false)

  async function handleSelectMacbookWinner() {
    try {
      setIsSelectingMacbook(true)
      const selected = await SelectMacbookWinner()
      setMacbookWinner(selected)
    } catch (error) {
      console.error('Failed to select winner:', error)
    } finally {
      setIsSelectingMacbook(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleSelectMacbookWinner}
        disabled={isSelectingMacbook}
        className="w-full"
      >
        {isSelectingMacbook ? 'Selecting...' : 'Select Winner'}
      </Button>

      {macbookWinner && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Winner!</h3>
              <p className="text-xl">{macbookWinner.name}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}