"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function JobSearch() {
  const [salaryRange, setSalaryRange] = useState([50000])

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle>Filter Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="keywords" placeholder="Job title, skills, or company" className="pl-9" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="location" placeholder="City, state, or remote" className="pl-9" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-type">Job Type</Label>
            <Select defaultValue="all">
              <SelectTrigger id="job-type">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Level</Label>
            <Select defaultValue="all">
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="salary-range">Salary Range</Label>
              <span className="text-sm font-medium">${salaryRange[0].toLocaleString()}+</span>
            </div>
            <Slider
              id="salary-range"
              min={0}
              max={200000}
              step={10000}
              value={salaryRange}
              onValueChange={setSalaryRange}
            />
          </div>

          <div className="space-y-3">
            <Label>Remote Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remote-yes" />
                <label
                  htmlFor="remote-yes"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remote
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remote-hybrid" />
                <label
                  htmlFor="remote-hybrid"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hybrid
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remote-onsite" />
                <label
                  htmlFor="remote-onsite"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  On-site
                </label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Apply Filters
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Reset Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
