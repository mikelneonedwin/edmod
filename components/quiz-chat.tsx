"use client"

import { useState, useRef, useEffect } from "react"
import { Message } from "./message"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Timer, Trophy } from 'lucide-react'

interface QuizMessage {
  id: string
  content: string
  isBot: boolean
  options?: string[]
  correctAnswer?: string
  isCorrect?: boolean | null
  timestamp: string
}

const DUMMY_QUESTIONS = [
  {
    id: "q1",
    content: "Welcome to the quiz! Let's start with an easy one: What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    id: "q2",
    content: "Great! Now, which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: "q3",
    content: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale"
  }
]

export function QuizChat() {
  const [messages, setMessages] = useState<QuizMessage[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add initial question
    if (messages.length === 0) {
      setMessages([{
        id: DUMMY_QUESTIONS[0].id,
        content: DUMMY_QUESTIONS[0].content,
        isBot: true,
        options: DUMMY_QUESTIONS[0].options,
        timestamp: new Date().toLocaleTimeString()
      }])
    }
  }, [messages.length])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && !gameOver) {
      handleGameOver()
    }
  }, [timeLeft, gameOver])

  const handleAnswer = (answer: string) => {
    const currentQ = DUMMY_QUESTIONS[currentQuestion]
    const isCorrect = answer === currentQ.correctAnswer

    // Add user's answer
    setMessages(prev => [...prev, {
      id: `a${currentQ.id}`,
      content: answer,
      isBot: false,
      isCorrect,
      timestamp: new Date().toLocaleTimeString()
    }])

    if (isCorrect) {
      setScore(prev => prev + 1)
      
      // Move to next question if available
      if (currentQuestion + 1 < DUMMY_QUESTIONS.length) {
        const nextQ = DUMMY_QUESTIONS[currentQuestion + 1]
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: nextQ.id,
            content: nextQ.content,
            isBot: true,
            options: nextQ.options,
            timestamp: new Date().toLocaleTimeString()
          }])
          setCurrentQuestion(prev => prev + 1)
          setTimeLeft(30)
        }, 1000)
      } else {
        handleGameOver()
      }
    } else {
      handleGameOver()
    }
  }

  const handleGameOver = () => {
    setGameOver(true)
    setMessages(prev => [...prev, {
      id: 'game-over',
      content: `Game Over! Your final score is ${score} out of ${DUMMY_QUESTIONS.length}`,
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }])
  }

  const handleRestart = () => {
    setMessages([{
      id: DUMMY_QUESTIONS[0].id,
      content: DUMMY_QUESTIONS[0].content,
      isBot: true,
      options: DUMMY_QUESTIONS[0].options,
      timestamp: new Date().toLocaleTimeString()
    }])
    setCurrentQuestion(0)
    setScore(0)
    setGameOver(false)
    setTimeLeft(30)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <span className="font-medium">Score: {score}</span>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5" />
          <span className="font-medium">{timeLeft}s</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            isBot={message.isBot}
            options={message.options}
            onSelectOption={!gameOver ? handleAnswer : undefined}
            isCorrect={message.isCorrect}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t">
        {gameOver ? (
          <Button 
            className="w-full" 
            onClick={handleRestart}
          >
            Play Again
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Input disabled placeholder="Select an option above to answer..." />
            <Button variant="ghost" disabled>
              Send
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

