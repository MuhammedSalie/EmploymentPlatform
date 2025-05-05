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

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Recruiters</h1>
              
      </div>
    </div>
  );
}
