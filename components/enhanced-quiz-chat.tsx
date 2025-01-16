"use client"

import { useState, useRef, useEffect } from "react"
import { Message } from "./message"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Timer, Trophy, Brain, Send } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import type { GameMode, Message as MessageType, UserProgress } from "@/types/quiz"
import { generateQuestion } from "@/utils/question-generator"
// import { cn } from "@/lib/utils"

interface EnhancedQuizChatProps {
  gameMode: GameMode
  onUpdateProgress: (progress: UserProgress) => void
}

export function EnhancedQuizChat({ gameMode, onUpdateProgress }: EnhancedQuizChatProps) {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [input, setInput] = useState("")
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion(level))
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add initial message
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome',
        content: `Welcome to ${gameMode === 'survival' ? 'Survival' : 'Number Game'} Mode! ${
          gameMode === 'survival' 
            ? 'Answer as many questions as you can before time runs out!' 
            : 'Progress through increasingly difficult levels!'
        }`,
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      }, {
        id: currentQuestion.id,
        content: currentQuestion.content,
        isBot: true,
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer,
        timestamp: new Date().toLocaleTimeString(),
        difficulty: currentQuestion.difficulty
      }])
    }
  }, [])

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
    const isCorrect = answer === currentQuestion.correctAnswer

    // Add user's answer
    setMessages(prev => [...prev, {
      id: `a${currentQuestion.id}`,
      content: answer,
      isBot: false,
      isCorrect,
      timestamp: new Date().toLocaleTimeString()
    }])

    if (isCorrect) {
      setScore(prev => prev + 1)
      
      if (gameMode === 'number') {
        // Increase difficulty in number game mode
        setLevel(prev => prev + 1)
      }

      // Generate next question
      const nextQuestion = generateQuestion(gameMode === 'number' ? level + 1 : level)
      setCurrentQuestion(nextQuestion)

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: nextQuestion.id,
          content: nextQuestion.content,
          isBot: true,
          options: nextQuestion.options,
          correctAnswer: nextQuestion.correctAnswer,
          timestamp: new Date().toLocaleTimeString(),
          difficulty: nextQuestion.difficulty
        }])
        setTimeLeft(nextQuestion.timeLimit)
      }, 1000)
    } else {
      handleGameOver()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleAnswer(input.trim())
      setInput("")
    }
  }

  const handleGameOver = () => {
    setGameOver(true)
    onUpdateProgress({
      level,
      score,
      gameMode
    })
    setMessages(prev => [...prev, {
      id: 'game-over',
      content: `Game Over! Your final score is ${score} ${
        gameMode === 'number' ? `and you reached level ${level}` : ''
      }`,
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }])
  }

  const handleRestart = () => {
    const firstQuestion = generateQuestion(1)
    setMessages([{
      id: 'welcome',
      content: `Welcome to ${gameMode === 'survival' ? 'Survival' : 'Number Game'} Mode!`,
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }, {
      id: firstQuestion.id,
      content: firstQuestion.content,
      isBot: true,
      options: firstQuestion.options,
      correctAnswer: firstQuestion.correctAnswer,
      timestamp: new Date().toLocaleTimeString(),
      difficulty: firstQuestion.difficulty
    }])
    setLevel(1)
    setScore(0)
    setGameOver(false)
    setTimeLeft(30)
    setCurrentQuestion(firstQuestion)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto h-[calc(100vh-2rem)] flex flex-col bg-slate-900 border-slate-800">
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-medium text-slate-200">Score: {score}</span>
          </div>
          {gameMode === 'number' && (
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <span className="font-medium text-slate-200">Level: {level}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-blue-500" />
          <span className="font-medium text-slate-200">{timeLeft}s</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Message
                content={message.content}
                isBot={message.isBot}
                options={message.options}
                onSelectOption={!gameOver ? handleAnswer : undefined}
                isCorrect={message.isCorrect}
                timestamp={message.timestamp}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <div className="p-4 border-t border-slate-800">
        {gameOver ? (
          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" 
            onClick={handleRestart}
          >
            Play Again
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer or select an option..."
              className="bg-slate-800 border-slate-700 text-slate-200"
            />
            <Button 
              type="submit"
              variant="ghost"
              className="text-slate-200 hover:bg-slate-800"
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        )}
      </div>
    </Card>
  )
}

