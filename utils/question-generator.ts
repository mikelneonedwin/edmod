import type { Question } from "@/types/quiz"

const questions: Record<number, Question[]> = {
  1: [
    {
      id: '1-1',
      content: 'What is 5 + 3?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '8',
      timeLimit: 30,
      difficulty: 1
    },
    {
      id: '1-2',
      content: 'What is 4 + 6?',
      options: ['8', '9', '10', '11'],
      correctAnswer: '10',
      timeLimit: 30,
      difficulty: 1
    }
  ],
  2: [
    {
      id: '2-1',
      content: 'What is 12 × 5?',
      options: ['55', '60', '65', '70'],
      correctAnswer: '60',
      timeLimit: 25,
      difficulty: 2
    },
    {
      id: '2-2',
      content: 'What is 18 × 3?',
      options: ['51', '54', '57', '60'],
      correctAnswer: '54',
      timeLimit: 25,
      difficulty: 2
    }
  ],
  3: [
    {
      id: '3-1',
      content: 'What is 156 ÷ 12?',
      options: ['11', '12', '13', '14'],
      correctAnswer: '13',
      timeLimit: 20,
      difficulty: 3
    },
    {
      id: '3-2',
      content: 'What is 225 ÷ 15?',
      options: ['13', '14', '15', '16'],
      correctAnswer: '15',
      timeLimit: 20,
      difficulty: 3
    }
  ]
}

export function generateQuestion(level: number): Question {
  // Ensure level stays within bounds
  const normalizedLevel = Math.min(Math.max(1, level), Object.keys(questions).length)
  
  const levelQuestions = questions[normalizedLevel]
  if (!levelQuestions || levelQuestions.length === 0) {
    // Fallback to level 1 if no questions found for the level
    return questions[1][0]
  }
  
  return levelQuestions[Math.floor(Math.random() * levelQuestions.length)]
}