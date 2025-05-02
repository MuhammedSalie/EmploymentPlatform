"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Star, Lock, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Reward {
  id: string
  name: string
  description: string
  pointsCost: number
  unlocked: boolean
  claimed: boolean
}

export default function Rewards() {
  const { toast } = useToast()
  const [userPoints, setUserPoints] = useState(350)
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: "resume-review",
      name: "Professional Resume Review",
      description: "Get your resume reviewed by a career expert",
      pointsCost: 200,
      unlocked: true,
      claimed: false,
    },
    {
      id: "premium-week",
      name: "1 Week Premium Access",
      description: "Unlock premium features for 1 week",
      pointsCost: 300,
      unlocked: true,
      claimed: false,
    },
    {
      id: "interview-prep",
      name: "Mock Interview Session",
      description: "30-minute mock interview with feedback",
      pointsCost: 500,
      unlocked: false,
      claimed: false,
    },
    {
      id: "featured-profile",
      name: "Featured Profile",
      description: "Get your profile highlighted to employers for 3 days",
      pointsCost: 750,
      unlocked: false,
      claimed: false,
    },
  ])

  const claimReward = (id: string) => {
    const reward = rewards.find((r) => r.id === id)
    if (!reward || !reward.unlocked || reward.claimed || userPoints < reward.pointsCost) return

    setRewards(rewards.map((r) => (r.id === id ? { ...r, claimed: true } : r)))
    setUserPoints(userPoints - reward.pointsCost)

    toast({
      title: "Reward claimed!",
      description: `You've successfully claimed: ${reward.name}`,
      duration: 3000,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Rewards
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span>{userPoints} points available</span>
          </Badge>
        </div>
        <CardDescription>Redeem your points for exclusive rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`rounded-lg border p-4 ${
                reward.claimed
                  ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                  : reward.unlocked
                    ? "border-primary/20 bg-card"
                    : "border-muted bg-muted/50 opacity-70"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{reward.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{reward.description}</p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span>{reward.pointsCost}</span>
                </Badge>
              </div>
              <div className="mt-4">
                {reward.claimed ? (
                  <Button variant="outline" className="w-full" disabled>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Claimed
                  </Button>
                ) : reward.unlocked ? (
                  <Button
                    variant="default"
                    className="w-full"
                    disabled={userPoints < reward.pointsCost}
                    onClick={() => claimReward(reward.id)}
                  >
                    {userPoints >= reward.pointsCost ? "Claim Reward" : "Not Enough Points"}
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    <Lock className="mr-2 h-4 w-4" />
                    Locked
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
