"use client"
import { Progress } from "@/components/ui/progress"
import { Trophy, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UserLevelProps {
  level?: number
  points?: number
  nextLevelPoints?: number
  streak?: number
}

export default function UserLevel({ level = 1, points = 75, nextLevelPoints = 100, streak = 3 }: UserLevelProps) {
  const progress = (points / nextLevelPoints) * 100

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Trophy className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-medium">Level {level}</h3>
            <p className="text-xs text-muted-foreground">Job Seeker</p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1 rounded-full bg-accent px-2 py-1">
                <Zap className="h-3 w-3 text-accent-foreground" />
                <span className="text-xs font-medium text-accent-foreground">{streak} day streak!</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>You've been active for {streak} days in a row!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span>{points} XP</span>
          <span>{nextLevelPoints} XP</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="mt-3 text-xs text-muted-foreground">
        {nextLevelPoints - points} XP needed for Level {level + 1}
      </div>
    </div>
  )
}
