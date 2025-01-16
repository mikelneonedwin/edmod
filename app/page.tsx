import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Brain, Trophy, Timer } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Brain className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold text-white">Edmod</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium text-white hover:underline underline-offset-4" href="/quiz">
            Play
          </Link>
          <Link className="text-sm font-medium text-white hover:underline underline-offset-4" href="/leaderboard">
            Leaderboard
          </Link>
          <Link className="text-sm font-medium text-white hover:underline underline-offset-4" href="/login">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Challenge Your Knowledge
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Test your skills with timed quizzes. Choose between Survival Mode for endless challenges or Number Game Mode for progressive difficulty.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Start Playing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Timer className="h-8 w-8 text-white" />
                <h3 className="text-xl font-bold text-white">Survival Mode</h3>
                <p className="text-center text-gray-400">
                  Answer as many questions as you can within the time limit. One wrong move and it's game over!
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Brain className="h-8 w-8 text-white" />
                <h3 className="text-xl font-bold text-white">Number Game Mode</h3>
                <p className="text-center text-gray-400">
                  Progress through increasingly difficult levels. Each level brings more challenging questions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Trophy className="h-8 w-8 text-white" />
                <h3 className="text-xl font-bold text-white">Leaderboards</h3>
                <p className="text-center text-gray-400">
                  Compete with others and climb the rankings. Can you make it to the top?
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-800">
        <p className="text-xs text-gray-400">© 2024 Edmod. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-400 hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-400 hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

