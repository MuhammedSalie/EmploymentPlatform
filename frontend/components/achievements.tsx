"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Star, Award, Clock, Target, BookOpen, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
  total?: number
}

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "profile-complete",
      name: "Profile Pro",
      description: "Complete your profile 100%",
      icon: <Star className="h-4 w-4" />,
      unlocked: true,
      progress: 100,
      total: 100,
    },
    {
      id: "first-application",
      name: "First Step",
      description: "Submit your first job application",
      icon: <Briefcase className="h-4 w-4" />,
      unlocked: true,
    },
    {
      id: "five-applications",
      name: "Persistent",
      description: "Apply to 5 jobs",
      icon: <Award className="h-4 w-4" />,
      unlocked: true,
      progress: 5,
      total: 5,
    },
    {
      id: "streak-7",
      name: "Consistent",
      description: "Maintain a 7-day streak",
      icon: <Clock className="h-4 w-4" />,
      unlocked: false,
      progress: 3,
      total: 7,
    },
    {
      id: "interview-ready",
      name: "Interview Ready",
      description: "Complete interview preparation quiz",
      icon: <Target className="h-4 w-4" />,
      unlocked: false,
    },
    {
      id: "skill-master",
      name: "Skill Master",
      description: "Add 10 verified skills to your profile",
      icon: <BookOpen className="h-4 w-4" />,
      unlocked: false,
      progress: 6,
      total: 10,
    },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Achievements
        </CardTitle>
        <CardDescription>Track your progress and earn rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {achievements.map((achievement) => (
            <TooltipProvider key={achievement.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`flex flex-col items-center justify-center rounded-lg border p-3 text-center transition-all ${
                      achievement.unlocked ? "border-primary/20 bg-primary/5" : "border-muted bg-muted/50 opacity-70"
                    }`}
                  >
                    <div
                      className={`mb-2 rounded-full p-2 ${
                        achievement.unlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {achievement.unlocked ? achievement.icon : <Lock className="h-4 w-4" />}
                    </div>
                    <h4 className="text-sm font-medium">{achievement.name}</h4>
                    {achievement.progress !== undefined && achievement.total !== undefined && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {achievement.progress}/{achievement.total}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{achievement.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
