"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  BookmarkPlus,
  BookmarkCheck,
  Building,
  Share2,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JobApplicationForm from "@/components/job-application-form"

// Mock job data (in a real app, this would come from an API)
const JOB = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp",
  location: "San Francisco, CA",
  type: "Full-time",
  remote: true,
  posted: "2 days ago",
  description:
    "We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining user interfaces for our web applications.",
  responsibilities: [
    "Develop new user-facing features using React.js",
    "Build reusable components and front-end libraries for future use",
    "Translate designs and wireframes into high-quality code",
    "Optimize components for maximum performance across devices and browsers",
    "Coordinate with various stakeholders from product, design, and engineering teams",
  ],
  requirements: [
    "Proficient in React, TypeScript, and Next.js",
    "5+ years of frontend development experience",
    "Experience with state management libraries (Redux, Zustand, etc.)",
    "Familiarity with modern frontend build pipelines and tools",
    "Understanding of server-side rendering and its benefits",
    "Experience with responsive design and cross-browser compatibility",
    "Strong problem-solving skills and attention to detail",
  ],
  benefits: [
    "Competitive salary and equity package",
    "Health, dental, and vision insurance",
    "Flexible work hours and remote work options",
    "Unlimited PTO policy",
    "401(k) with company match",
    "Professional development budget",
    "Regular team events and retreats",
  ],
  companyDescription:
    "TechCorp is a leading technology company specializing in building innovative web applications for enterprise clients. Founded in 2010, we have grown to over 200 employees across 5 offices worldwide.",
  logo: "/placeholder.svg?height=80&width=80",
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<typeof JOB | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    // Simulate API call to fetch job details
    const timer = setTimeout(() => {
      setJob(JOB)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading job details...</span>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <p className="mt-4 text-muted-foreground">The job you are looking for does not exist or has been removed.</p>
        <Button asChild className="mt-6">
          <Link href="/jobs">Browse Jobs</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Button variant="ghost" className="mb-6 flex items-center gap-1" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
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
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center font-medium text-foreground">
                    <Building className="mr-1 h-4 w-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {job.posted}
                  </span>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {job.type}
                </Badge>
                {job.remote && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Remote
                  </Badge>
                )}
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="space-y-4 pt-4">
                  <div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Responsibilities</h3>
                    <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Requirements</h3>
                    <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                      {job.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="company" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">About {job.company}</h3>
                    <p className="text-muted-foreground">{job.companyDescription}</p>
                  </div>
                </TabsContent>
                <TabsContent value="benefits" className="pt-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Benefits & Perks</h3>
                    <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Apply Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Apply for {job.title}</DialogTitle>
                      <DialogDescription>
                        Complete the form below to submit your application to {job.company}.
                      </DialogDescription>
                    </DialogHeader>
                    <JobApplicationForm jobId={job.id} jobTitle={job.title} company={job.company} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsSaved(!isSaved)}
                  aria-label={isSaved ? "Unsave job" : "Save job"}
                >
                  {isSaved ? <BookmarkCheck className="h-5 w-5 text-primary" /> : <BookmarkPlus className="h-5 w-5" />}
                </Button>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3 border-b pb-4 last:border-0 last:pb-0">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Company logo"
                      width={40}
                      height={40}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Frontend Developer</h4>
                    <p className="text-sm text-muted-foreground">TechCorp • San Francisco</p>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Full-time</span>
                      <span>•</span>
                      <span>$100k-$130k</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/jobs">View More Jobs</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src={job.logo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{job.company}</h4>
                  <p className="text-sm text-muted-foreground">Technology • 201-500 employees</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="line-clamp-3">{job.companyDescription}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/companies/${job.company.toLowerCase().replace(/\s+/g, "-")}`}>View Company Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
