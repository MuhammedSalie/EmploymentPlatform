"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Briefcase, Building, MapPin } from "lucide-react"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("query", searchTerm)
    if (location) params.set("location", location)
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-2xl">
                Spring Into <span className="text-primary">Your Career</span> Today
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Kickstart your career with NextLeaf. We help ambitious new talent connect with awesome companies looking for fresh ideas...
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative rounded-lg bg-muted p-3 shadow-lg">
                <div className="space-y-2">
                  <div>
                    <label htmlFor="search" className="text-sm font-medium">
                      Job Title, Keywords, or Company
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <Input
                          type="search"
                          id="search"
                          className="pl-10"
                          placeholder="Software Engineer, Marketing, etc."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MapPin className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                        </div>
                        <Input
                          type="text"
                          id="location"
                          className="pl-10"
                          placeholder="City, State, or Country"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-auto" onClick={handleSearch}>
                    Search Jobs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
      {/* Featured Job Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Popular Job Categories</h2>
            <p className="mt-2 text-lg text-muted-foreground">Explore opportunities in these in-demand fields</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Briefcase className="h-8 w-8" />, title: "Technology", count: 1243 },
              { icon: <Building className="h-8 w-8" />, title: "Finance", count: 876 },
              { icon: <Briefcase className="h-8 w-8" />, title: "Healthcare", count: 654 },
              { icon: <Building className="h-8 w-8" />, title: "Marketing", count: 432 },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/jobs?category=${category.title.toLowerCase()}`}
                className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">{category.icon}</div>
                  <h3 className="mt-4 text-xl font-medium">{category.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{category.count} open positions</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/jobs">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight sm:text-2xl">How It Works</p>
            <p className="mt-4 text-lg text-muted-foreground">Find and apply for jobs in just a few simple steps</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create an Account",
                description: "Sign up and complete your profile with your experience, skills, and resume.",
              },
              {
                step: "02",
                title: "Search Jobs",
                description: "Browse through thousands of jobs or use filters to find the perfect match.",
              },
              {
                step: "03",
                title: "Apply with Ease",
                description: "Apply with just a few clicks and track your application status.",
              },
            ].map((item, index) => (
              <div key={index} className="relative rounded-lg bg-card p-6 shadow-sm">
                <div className="absolute -top-4 left-6 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>
  )
}
