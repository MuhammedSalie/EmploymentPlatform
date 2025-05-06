"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin, Clock, DollarSign, BookmarkPlus, BookmarkCheck, Star, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    salary: string
    type: string
    remote: boolean
    posted: string
    description: string
    requirements: string[]
    logo: string
    matchScore?: number
    xpReward?: number
    featured?: boolean
  }
}

export default function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setIsSaved(!isSaved)

    if (!isSaved) {
      toast({
        title: "Job saved!",
        description: "You earned +5 XP for saving a job",
        duration: 3000,
      })
    }
  }

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${job.featured ? "border-primary/50 bg-primary/5" : ""}`}
    >
      {job.featured && (
        <div className="bg-primary px-4 py-1 text-center text-xs font-medium text-primary-foreground">
          <span className="flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" /> Featured Job
          </span>
        </div>
      )}
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
        <div className="h-16 w-16 overflow-hidden rounded-md border bg-muted">
          <Image
            src={job.logo || "/placeholder.svg"}
            alt={`${job.company} logo`}
            width={80}
            height={80}
            className="h-full w-full object-contain p-1"
          />
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <span className="font-medium text-foreground">{job.company}</span>
            <span className="flex items-center">
              <MapPin className="mr-1 h-3 w-3" />
              {job.location}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {job.posted}
            </span>
          </CardDescription>
        </div>
        {job.matchScore && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="ml-auto flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span className="text-xs font-medium text-primary">{job.matchScore}% Match</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>This job matches {job.matchScore}% of your skills and preferences</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {job.type}
          </Badge>
          {job.remote && (
            <Badge variant="outline" className="flex items-center gap-1">
              Remote
            </Badge>
          )}
          {job.xpReward && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />+{job.xpReward} XP
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <Button asChild variant="default">
          <Link href={`/jobs/${job.id}`}>View Job</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
