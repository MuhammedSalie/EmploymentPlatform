"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Medal, Trophy, Award } from "lucide-react"

interface LeaderboardEntry {
  id: string
  name: string
  points: number
  avatar?: string
  rank: number
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      points: 1250,
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 1,
    },
    {
      id: "2",
      name: "Michael Chen",
      points: 980,
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 2,
    },
    {
      id: "3",
      name: "Jessica Williams",
      points: 840,
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 3,
    },
    {
      id: "4",
      name: "David Rodriguez",
      points: 720,
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 4,
    },
    {
      id: "5",
      name: "You",
      points: 685,
      avatar: "/placeholder.svg?height=40&width=40",
      rank: 5,
    },
  ])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />
      case 3:
        return <Medal className="h-4 w-4 text-amber-700" />
      default:
        return <span className="text-xs font-medium">{rank}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Leaderboard
        </CardTitle>
        <CardDescription>See how you rank against other job seekers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between rounded-lg border p-3 ${
                entry.name === "You" ? "border-primary/20 bg-primary/5" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                  {getRankIcon(entry.rank)}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.name} />
                  <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">Level {Math.floor(entry.points / 100)}</p>
                </div>
              </div>
              <div className="text-sm font-medium">{entry.points} XP</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
