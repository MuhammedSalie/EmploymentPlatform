"use client"

import { useState } from "react"
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
        NextLeaf is built for your first big step. With a clean, easy-to-use design and real-time listings, we cut through the noise so you can focus on what matters: landing a job that fits <em>you</em>.
</p>
<p className="mt-4 text-muted-foreground">
  Every job stays live for 30 days—or until it’s filled—so you're not wasting time on outdated openings. We give you just what you need to find your next move, no stress, no fluff.
</p>
<p className="mt-4 text-muted-foreground">
  Start strong. Grow fast. We've got your back.
</p>
      </div>
    </div>
  );
}
