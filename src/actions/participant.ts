'use server'

import { prisma } from '@/lib/prisma'
import { Participant } from '@prisma/client'
import { revalidatePath } from 'next/cache'


export async function getParticipants(): Promise<Participant[]> {
  try {
    const participants = await prisma.participant.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })
    return participants
  } catch (error) {
    console.error('Failed to fetch participants:', error)
    throw new Error('Failed to fetch participants')
  }
}


export async function createParticipant(formData: FormData) {
  const name = formData.get('name') as string
  
  if (!name?.trim()) {
    throw new Error('Name is required')
  }

  try {
    await prisma.participant.create({
      data: {
        name: name.trim()
      }
    })
    
    revalidatePath('/')
  } catch {
    throw new Error('Failed to create participant')
  }
}

export async function deleteParticipant(formData: FormData) {
  const id = formData.get('id') as string
  
  if (!id) {
    throw new Error('Participant ID is required')
  }

  try {
    await prisma.participant.delete({
      where: {
        id
      }
    })
    
    revalidatePath('/')
  } catch {
    throw new Error('Failed to delete participant')
  }
}

export async function SelectAirpodsWinner() {
  try {
    // Get all participants
    const participants = await prisma.participant.findMany()
    
    if (participants.length === 0) {
      throw new Error('No participants available')
    }
    
    // Select random participant
    const randomIndex = Math.floor(Math.random() * participants.length)
    const winner = participants[randomIndex]
    
    return winner
  } catch {
    throw new Error('Failed to select winner')
  }
}

export async function SelectHuaweiWinner() {
  try {
    // Get all participants
    const participants = await prisma.participant.findMany()
    
    if (participants.length === 0) {
      throw new Error('No participants available')
    }
    
    // Select random participant
    const randomIndex = Math.floor(Math.random() * participants.length)
    const winner = participants[randomIndex]
    
    return winner
  } catch {
    throw new Error('Failed to select winner')
  }
}

export async function SelectMacbookWinner() {
  try {
    // Get all participants
    const participants = await prisma.participant.findMany()
    
    if (participants.length === 0) {
      throw new Error('No participants available')
    }
    
    // Select random participant
    const randomIndex = Math.floor(Math.random() * participants.length)
    const winner = participants[randomIndex]
    
    return winner
  } catch {
    throw new Error('Failed to select winner')
  }
}
