import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LeaderboardEntry {
  rank: number
  username: string
  score: number
  mode: string
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: "QuizMaster", score: 1500, mode: "survival" },
  { rank: 2, username: "BrainGenius", score: 1200, mode: "number" },
  { rank: 3, username: "QuizWhiz", score: 1000, mode: "survival" },
  // Add more entries...
]

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Global Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {mockLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold w-8">
                    {entry.rank}
                  </span>
                  <div>
                    <p className="font-semibold">{entry.username}</p>
                    <p className="text-sm text-gray-500">
                      {entry.mode === 'survival' ? 'Survival Mode' : 'Number Game'}
                    </p>
                  </div>
                </div>
                <div className="text-xl font-bold">
                  {entry.score}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

