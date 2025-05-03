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

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-4 text-muted-foreground">
        NextLeaf simplifies your job search with a clean design and live job listings, making it easier to connect great talent with great companies.
        </p>
        <p className="mt-4 text-muted-foreground">
          Listings stay up for 30 days and disappear once the role is filled—keeping results relevant and your search efficient. With smart tools designed to help you land the right opportunity, NextLeaf takes the stress out of the process.
        </p>
        <p className="mt-4 text-muted-foreground">No clutter, no confusion—just clarity.</p>
      </div>
    </div>
  );
}
