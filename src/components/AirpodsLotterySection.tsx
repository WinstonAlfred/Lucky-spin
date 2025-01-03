'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SelectAirpodsWinner, getParticipants } from '@/actions/participant';

type Participant = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export function AirpodsLotterySection() {
  const [airpodsWinner, setAirpodsWinner] = useState<Participant | null>(null);
  const [isSelectingAirpods, setIsSelectingAirpods] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [animatingNames, setAnimatingNames] = useState<string[]>(['?']);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  // Animation configuration
  const INITIAL_SHUFFLE_SPEED = 1; // Start very fast (ms)
  const FINAL_SHUFFLE_SPEED = 150; // End slower (ms)
  const ANIMATION_DURATION = 8000; // 8 seconds total

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const fetchedParticipants = await getParticipants();
        setParticipants(fetchedParticipants);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch participants:', error);
        setError('Failed to load participants');
      }
    };
    loadParticipants();
  }, []);

  const shuffleNames = () => {
    if (participants.length === 0) return;
    
    // Get a random participant
    const randomIndex = Math.floor(Math.random() * participants.length);
    setAnimatingNames([participants[randomIndex].name]);
  };

  const startAnimation = () => {
    if (animationRef.current) return;
    
    let currentSpeed = INITIAL_SHUFFLE_SPEED;
    const startTime = Date.now();

    const updateAnimation = () => {
      const elapsedTime = Date.now() - startTime;
      
      // Calculate current speed based on elapsed time
      const progress = Math.min(elapsedTime / ANIMATION_DURATION, 1);
      currentSpeed = INITIAL_SHUFFLE_SPEED + (FINAL_SHUFFLE_SPEED - INITIAL_SHUFFLE_SPEED) * progress;
      
      shuffleNames();
      
      if (elapsedTime < ANIMATION_DURATION) {
        animationRef.current = setTimeout(updateAnimation, currentSpeed);
      }
    };

    updateAnimation();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  };

  async function handleSelectAirpodsWinner() {
    if (participants.length === 0) {
      setError('No participants available');
      return;
    }

    try {
      setIsSelectingAirpods(true);
      setError(null);
      startAnimation();
      
      // Delay winner selection until animation completes
      await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION));
      
      const selected = await SelectAirpodsWinner();
      stopAnimation();
      setAirpodsWinner(selected);
      setAnimatingNames([selected.name]);
    } catch (error) {
      console.error('Failed to select winner:', error);
      stopAnimation();
      setAnimatingNames(['Error']);
      setError('Failed to select winner');
    } finally {
      setIsSelectingAirpods(false);
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAnimation();
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-lg p-8 overflow-hidden shadow-xl">
            <div 
              className="relative bg-white rounded-lg p-8 mx-4 shadow-2xl transform hover:scale-105 transition-transform"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 rounded-lg transform -translate-z-2"></div>
              
              {/* Enhanced Name Display */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-b from-gray-100 to-white rounded-lg border-4 border-gray-300">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none z-10" />
                <div className="absolute inset-x-0 h-2 top-0 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300" />
                <div className="absolute inset-x-0 h-2 bottom-0 bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300" />
                
                <div className="absolute inset-x-0 h-20 top-1/2 -translate-y-1/2 
                     bg-gradient-to-b from-white/40 via-white/20 to-white/40 
                     border-y-4 border-gray-200 pointer-events-none z-[1]
                     shadow-[inset_0_4px_6px_rgba(0,0,0,0.2)]" />
                
                <div className="h-full flex items-center justify-center">
                  <div 
                    className="text-6xl font-bold bg-clip-text text-transparent 
                              bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600
                              transition-all duration-75"
                    style={{
                      textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                      transform: 'translateZ(30px)'
                    }}
                  >
                    {animatingNames[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-4">
        <p className="text-lg text-gray-600 font-semibold">
          🎯 Total Participants: {participants.length}
        </p>
      </div>

      <Button 
        onClick={handleSelectAirpodsWinner}
        disabled={isSelectingAirpods || participants.length === 0}
        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
                   hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 
                   text-white font-bold py-6 text-xl transform hover:scale-105 
                   transition-transform shadow-lg "
      >
        {isSelectingAirpods ? '🎰 Rolling the Lucky Draw...' : '🎰 Start Lucky Draw'}
      </Button>

      {airpodsWinner && !isSelectingAirpods && (
        <Card className="border-4 border-purple-400 transform hover:scale-105 transition-transform shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600">
                🎉 恭喜您! 🎉
              </h3>
              <p className="text-4xl font-bold text-blue-600">{airpodsWinner.name}</p>
              <p className="text-lg text-gray-600">You won a pair of AirPods! 🎧</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AirpodsLotterySection;