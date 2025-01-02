'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { SelectAirpodsWinner, getParticipants } from '@/actions/participant'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// Define the Participant type
type Participant = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export function AirpodsLotterySection() {
  const [airpodsWinner, setAirpodsWinner] = useState<Participant | null>(null)
  const [isSelectingAirpods, setIsSelectingAirpods] = useState(false)
  const [animatingNames, setAnimatingNames] = useState<string[]>(['?'])
  const [participants, setParticipants] = useState<Participant[]>([])
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch participants on component mount
  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const fetchedParticipants = await getParticipants()
        setParticipants(fetchedParticipants)
      } catch (error) {
        console.error('Failed to fetch participants:', error)
      }
    }
    loadParticipants()
  }, [])

  const shuffleNames = () => {
    if (participants.length === 0) return
    const randomIndex = Math.floor(Math.random() * participants.length)
    setAnimatingNames([participants[randomIndex].name])
  }

  const startAnimation = () => {
    if (animationRef.current) return
    animationRef.current = setInterval(shuffleNames, 100)
  }

  const stopAnimation = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current)
      animationRef.current = null
    }
  }

  async function handleSelectAirpodsWinner() {
    if (participants.length === 0) {
      alert('No participants available')
      return
    }

    try {
      setIsSelectingAirpods(true)
      startAnimation()
      
      // Add delay for animation effect
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const selected = await SelectAirpodsWinner()
      stopAnimation()
      setAirpodsWinner(selected)
      setAnimatingNames([selected.name])
    } catch (error) {
      console.error('Failed to select winner:', error)
      stopAnimation()
      setAnimatingNames(['Error'])
    } finally {
      setIsSelectingAirpods(false)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAnimation()
  }, [])

  return (
    <div className="max-w-md mx-auto space-y-8 p-4">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="relative bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg p-8 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-4 h-full bg-yellow-400"></div>
            <div className="absolute top-0 right-0 w-4 h-full bg-yellow-400"></div>
            
            {/* Slot display */}
            <div className="relative bg-white rounded-lg p-6 mx-4">
              <div className="flex justify-center items-center h-20 overflow-hidden">
                {animatingNames.map((name, index) => (
                  <div
                    key={index}
                    className={cn(
                      "text-4xl font-bold transition-all duration-100 ease-in-out",
                      isSelectingAirpods && "animate-bounce"
                    )}
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">
          Total Participants: {participants.length}
        </p>
      </div>

      <Button 
        onClick={handleSelectAirpodsWinner}
        disabled={isSelectingAirpods || participants.length === 0}
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-4"
      >
        {isSelectingAirpods ? '🎰 Rolling...' : '🎰 Start Lucky Draw'}
      </Button>

      {airpodsWinner && !isSelectingAirpods && (
        <Card className="border-4 border-yellow-400">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">🎉 Winner! 🎉</h3>
              <p className="text-3xl font-bold text-blue-600">{airpodsWinner.name}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AirpodsLotterySection