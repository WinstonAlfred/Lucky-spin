'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SelectAirpodsWinner } from '@/actions/participant'
import { Card, CardContent } from '@/components/ui/card'

export function AirpodsLotterySection() {
  const [airpodsWinner, setAirpodsWinner] = useState<{ name: string } | null>(null)
  const [isSelectingAirpods, setIsSelectingAirpods] = useState(false)

  async function handleSelectAirpodsWinner() {
    try {
      setIsSelectingAirpods(true)
      const selected = await SelectAirpodsWinner()
      setAirpodsWinner(selected)
    } catch (error) {
      console.error('Failed to select winner:', error)
    } finally {
      setIsSelectingAirpods(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleSelectAirpodsWinner}
        disabled={isSelectingAirpods}
        className="w-full"
      >
        {isSelectingAirpods ? 'Selecting...' : 'Select Winner'}
      </Button>

      {airpodsWinner && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Winner!</h3>
              <p className="text-xl">{airpodsWinner.name}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}