"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Target } from "lucide-react"

export default function ApplicationProgress() {
  const totalApplications = 12
  const weeklyGoal = 15
  const progress = (totalApplications / weeklyGoal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Application Goal
        </CardTitle>
        <CardDescription>Track your weekly application progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span>Weekly Progress</span>
            <span className="font-medium">
              {totalApplications}/{weeklyGoal} applications
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3 text-center">
            <div className="text-2xl font-bold">{totalApplications}</div>
            <div className="text-xs text-muted-foreground">Applications This Week</div>
          </div>
          <div className="rounded-lg border p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold">3</span>
              <Badge className="bg-green-500 text-white">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">Interviews Secured</div>
          </div>
        </div>

        {progress >= 100 && (
          <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Weekly goal achieved! +50 XP bonus
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
