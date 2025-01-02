// src/components/LotterySection.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { selectWinner } from '@/actions/participant'
import { Card, CardContent } from '@/components/ui/card'

export function LotterySection() {
  const [winner, setWinner] = useState<{ name: string } | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)

  async function handleSelectWinner() {
    try {
      setIsSelecting(true)
      const selected = await selectWinner()
      setWinner(selected)
    } catch (error) {
      console.error('Failed to select winner:', error)
    } finally {
      setIsSelecting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleSelectWinner}
        disabled={isSelecting}
        className="w-full"
      >
        {isSelecting ? 'Selecting...' : 'Select Winner'}
      </Button>

      {winner && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Winner!</h3>
              <p className="text-xl">{winner.name}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}