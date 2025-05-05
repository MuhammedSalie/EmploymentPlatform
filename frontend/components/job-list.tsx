"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import JobCard from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for jobs with gamification elements
const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    category: "technology",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    remote: true,
    posted: "2 days ago",
    description: "We are looking for a Senior Frontend Developer to join our team...",
    requirements: [
      "Proficient in React, TypeScript, and Next.js",
      "5+ years of frontend development experience",
      "Experience with state management libraries",
    ],
    logo: "/placeholder.svg?height=80&width=80",
    matchScore: 92,
    xpReward: 30,
    featured: true,
  },
  {
    id: "2",
    title: "Backend Engineer",
    category: "technology",
    company: "DataSystems",
    location: "New York, NY",
    salary: "$130,000 - $160,000",
    type: "Full-time",
    remote: false,
    posted: "1 week ago",
    description: "Join our backend team to build scalable services...",
    requirements: [
      "Strong experience with Node.js and Express",
      "Knowledge of database systems like MongoDB and PostgreSQL",
      "Understanding of microservices architecture",
    ],
    logo: "/placeholder.svg?height=80&width=80",
    matchScore: 85,
    xpReward: 25,
  },
  {
    id: "3",
    title: "UX/UI Designer",
    category: "marketing",
    company: "CreativeMinds",
    location: "Remote",
    salary: "$90,000 - $120,000",
    type: "Contract",
    remote: true,
    posted: "3 days ago",
    description: "We need a talented UX/UI Designer to create beautiful interfaces...",
    requirements: [
      "Portfolio showcasing UI/UX projects",
      "Experience with Figma and Adobe Creative Suite",
      "Understanding of user-centered design principles",
    ],
    logo: "/placeholder.svg?height=80&width=80",
    matchScore: 78,
    xpReward: 20,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    category: "finance",
    company: "CloudTech",
    location: "Austin, TX",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    remote: true,
    posted: "5 days ago",
    description: "Help us build and maintain our cloud infrastructure...",
    requirements: [
      "Experience with AWS, Docker, and Kubernetes",
      "Knowledge of CI/CD pipelines",
      "Scripting skills in Python or Bash",
    ],
    logo: "/placeholder.svg?height=80&width=80",
    matchScore: 65,
    xpReward: 25,
  },
  {
    id: "5",
    title: "Product Manager",
    category: "finance",
    company: "InnovateCo",
    location: "Chicago, IL",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    remote: false,
    posted: "1 day ago",
    description: "Lead product development and strategy for our SaaS platform...",
    requirements: [
      "3+ years of product management experience",
      "Strong analytical and communication skills",
      "Experience with agile methodologies",
    ],
    logo: "/placeholder.svg?height=80&width=80",
    matchScore: 72,
    xpReward: 20,
  },
]

export default function JobList() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get("category")?.toLowerCase()
  const [jobs, setJobs] = useState(MOCK_JOBS)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("match")
  const [dailyProgress, setDailyProgress] = useState(60)

  useEffect(() => {
    const timer = setTimeout(() => {
      let filtered = MOCK_JOBS

      if (categoryFilter) {
        filtered = MOCK_JOBS.filter((job) =>
          job.category.toLowerCase().includes(categoryFilter)
        )
      }

      setJobs(filtered)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [categoryFilter])

  const handleSortChange = (value: string) => {
    setSortBy(value)
    // In a real app, you would sort the jobs based on the selected value
    if (value === "match") {
      setJobs([...jobs].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)))
    } else if (value === "newest") {
      setJobs([...jobs].sort((a, b) => (a.posted.includes("day") ? -1 : 1)))
    } else if (value === "xp") {
      setJobs([...jobs].sort((a, b) => (b.xpReward || 0) - (a.xpReward || 0)))
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading jobs...</span>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 rounded-lg border bg-card p-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold">{jobs.length} jobs found</h2>
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span>Daily browsing goal</span>
                <span>{dailyProgress}%</span>
              </div>
              <Progress value={dailyProgress} className="h-2" />
              <p className="mt-1 text-xs text-muted-foreground">View 10 more jobs to earn +15 XP</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="newest">Most Recent</SelectItem>
                <SelectItem value="xp">Highest XP</SelectItem>
                <SelectItem value="salary-high">Highest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          Load More Jobs
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">+5 XP</span>
        </Button>
      </div>
    </div>
  )
}
