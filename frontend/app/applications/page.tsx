"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock data for applications
const APPLICATIONS = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    appliedDate: "2023-05-01",
    status: "applied",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    jobTitle: "UX Designer",
    company: "DesignStudio",
    location: "Remote",
    appliedDate: "2023-04-28",
    status: "interview",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    jobTitle: "Product Manager",
    company: "InnovateCo",
    location: "New York, NY",
    appliedDate: "2023-04-15",
    status: "rejected",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    jobTitle: "Backend Developer",
    company: "DataSystems",
    location: "Austin, TX",
    appliedDate: "2023-04-10",
    status: "offered",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

const statusLabels = {
  applied: { label: "Applied", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
  interview: { label: "Interview", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" },
  offered: { label: "Offered", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" },
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [applications, setApplications] = useState(APPLICATIONS)
  const [showSuccess, setShowSuccess] = useState(false)
  const [xpEarned, setXpEarned] = useState(0)
  const { toast } = useToast()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if redirected from successful application
    if (searchParams?.get("success") === "true") {
      const xp = Number.parseInt(searchParams?.get("xp") || "50")
      setXpEarned(xp)
      setShowSuccess(true)

      toast({
        title: "Achievement Unlocked!",
        description: "Quick Applicant: Apply to a job in under 5 minutes",
        duration: 5000,
      })

      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, toast])

  const filteredApplications =
    activeTab === "all" ? applications : applications.filter((app) => app.status === activeTab)

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-900">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-300">Application Submitted Successfully!</h3>
              <p className="text-green-700 dark:text-green-400">Your application has been received.</p>
            </div>
            <div className="bg-green-100 dark:bg-green-800 px-3 py-1 rounded-full flex items-center">
              <span className="text-green-800 dark:text-green-300 font-medium">+{xpEarned} XP</span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg">Application Progress</h3>
                <p className="text-muted-foreground">Track your job application journey</p>
              </div>
              <div className="bg-green-100 dark:bg-green-800 px-3 py-1 rounded-full">
                <span className="text-green-800 dark:text-green-300 font-medium">Level 2 Applicant</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{applications.length}</div>
                <div className="text-sm text-muted-foreground">Total Applications</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{applications.filter((a) => a.status === "interview").length}</div>
                <div className="text-sm text-muted-foreground">Interviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{applications.filter((a) => a.status === "offered").length}</div>
                <div className="text-sm text-muted-foreground">Offers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">75%</div>
                <div className="text-sm text-muted-foreground">Response Rate</div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between mb-1 text-sm">
                <span>Progress to Level 3</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="interview">Interviews</TabsTrigger>
          <TabsTrigger value="offered">Offers</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No applications found.</p>
              </div>
            ) : (
              filteredApplications.map((application) => (
                <Card key={application.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start">
                      <Avatar className="h-12 w-12 rounded-md">
                        <img src={application.logo || "/placeholder.svg"} alt={application.company} />
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="font-semibold text-lg">{application.jobTitle}</h3>
                          <Badge className={statusLabels[application.status].color}>
                            {statusLabels[application.status].label}
                          </Badge>
                        </div>

                        <div className="text-muted-foreground mt-1">
                          {application.company} • {application.location}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                          <div className="text-sm text-muted-foreground">Applied on {application.appliedDate}</div>

                          <div className="flex gap-2 mt-2 sm:mt-0">
                            {application.status === "interview" && (
                              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                                Prepare for Interview +25 XP
                              </Badge>
                            )}
                            {application.status === "applied" && (
                              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                                Follow Up +15 XP
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
