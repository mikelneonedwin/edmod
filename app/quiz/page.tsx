'use client'

import { useState } from "react"
// import { useRouter } from 'next/navigation'
import { EnhancedQuizChat } from "@/components/enhanced-quiz-chat"
import { Button } from "@/components/ui/button"
import type { GameMode, UserProgress } from "@/types/quiz"
import { motion } from "framer-motion"
// import { useAuthContext } from '@/context/auth-provider'
// import { Loader2 } from 'lucide-react'

export default function QuizPage() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null)
  const [leaderboard, setLeaderboard] = useState<UserProgress[]>([])
  // const { user, loading } = useAuthContext()
  // const router = useRouter()

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/login')
  //   }
  // }, [user, loading, router])

  const handleUpdateProgress = (progress: UserProgress) => {
    setLeaderboard(prev => [...prev, progress].sort((a, b) => b.score - a.score))
  }

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-slate-950">
  //       <Loader2 className="w-8 h-8 animate-spin text-white" />
  //     </div>
  //   )
  // }

  // if (!user) {
  //   return null
  // }

  if (!selectedMode) {
    return (
      <div className="min-h-screen p-4 bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold text-white">
            Choose Your Game Mode
          </h1>
          <div className="flex gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setSelectedMode('survival')}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 p-8 text-lg"
              >
                Survival Mode
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setSelectedMode('number')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 p-8 text-lg"
              >
                Number Game
              </Button>
            </motion.div>
          </div>
          {leaderboard.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Leaderboard
              </h2>
              <div className="space-y-2">
                {leaderboard.slice(0, 5).map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800 p-4 rounded-lg flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-slate-400">
                        #{index + 1}
                      </span>
                      <div className="text-left">
                        <div className="text-white">
                          Score: {entry.score}
                        </div>
                        <div className="text-sm text-slate-400">
                          {entry.gameMode === 'number' ? `Level ${entry.level}` : 'Survival'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-slate-950">
      <div className="max-w-3xl mx-auto mb-4">
        <Button
          onClick={() => setSelectedMode(null)}
          variant="ghost"
          className="text-white hover:bg-slate-800"
        >
          ← Back to Mode Selection
        </Button>
      </div>
      <EnhancedQuizChat
        gameMode={selectedMode}
        onUpdateProgress={handleUpdateProgress}
      />
    </div>
  )
}

