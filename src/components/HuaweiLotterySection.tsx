'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SelectHuaweiWinner } from '@/actions/participant'
import { Card, CardContent } from '@/components/ui/card'

export function HuaweiLotterySection() {
  const [huaweiWinner, setHuaweiWinner] = useState<{ name: string } | null>(null)
  const [isSelectingHuawei, setIsSelectingHuawei] = useState(false)

  async function handleSelectHuaweiWinner() {
    try {
      setIsSelectingHuawei(true)
      const selected = await SelectHuaweiWinner()
      setHuaweiWinner(selected)
    } catch (error) {
      console.error('Failed to select winner:', error)
    } finally {
      setIsSelectingHuawei(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleSelectHuaweiWinner}
        disabled={isSelectingHuawei}
        className="w-full"
      >
        {isSelectingHuawei ? 'Selecting...' : 'Select Winner'}
      </Button>

      {huaweiWinner && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Winner!</h3>
              <p className="text-xl">{huaweiWinner.name}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}