"use client"

import { useState } from "react"
import UserLevel from "@/components/user-level"
import DailyTasks from "@/components/daily-tasks"
import Achievements from "@/components/achievements"
import Leaderboard from "@/components/leaderboard"
import Rewards from "@/components/rewards"
import ApplicationProgress from "@/components/application-progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Trophy, Gift } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Track your progress and earn rewards</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/profile">Update Profile</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-3">
          <UserLevel level={3} points={275} nextLevelPoints={400} streak={5} />
        </div>

        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-1">
                <Gift className="h-4 w-4" />
                <span className="hidden sm:inline">Rewards</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6 space-y-6">
              <ApplicationProgress />
              <DailyTasks />
            </TabsContent>
            <TabsContent value="achievements" className="mt-6">
              <Achievements />
            </TabsContent>
            <TabsContent value="rewards" className="mt-6">
              <Rewards />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Activity Streak
              </CardTitle>
              <CardDescription>Keep your streak going!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => {
                  const isActive = i < 5
                  const isToday = i === 4
                  return (
                    <div
                      key={i}
                      className={`flex aspect-square flex-col items-center justify-center rounded-md p-1 text-center ${
                        isActive
                          ? isToday
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/20 text-primary"
                          : "bg-muted"
                      }`}
                    >
                      <span className="text-xs">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                      {isActive && <Sparkles className="mt-1 h-3 w-3" />}
                    </div>
                  )
                })}
              </div>
              <p className="mt-3 text-center text-sm">
                <span className="font-medium text-primary">5 day streak!</span> Come back tomorrow to continue.
              </p>
            </CardContent>
          </Card>

          <Leaderboard />
        </div>
      </div>
    </div>
  )
}
