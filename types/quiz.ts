export type GameMode = 'survival' | 'number'

export interface Question {
  id: string
  content: string
  options?: string[]
  correctAnswer: string
  difficulty: number
  timeLimit: number
}

export interface UserProgress {
  level: number
  score: number
  gameMode: GameMode
}

export interface Message {
  id: string
  content: string
  isBot: boolean
  options?: string[]
  correctAnswer?: string
  isCorrect?: boolean | null
  timestamp: string
  difficulty?: number
}

