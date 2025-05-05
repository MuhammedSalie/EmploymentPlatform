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
  const [keywords, setKeywords] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("all")
  const [experience, setExperience] = useState("all")
  const [remoteOptions, setRemoteOptions] = useState({
  remote: false,
  hybrid: false,
  onsite: false,
  })
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
              <Input id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Job title, skills, or company" className="pl-9" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, state, or Country" className="pl-9" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-type">Job Type</Label>
            <Select defaultValue="all" value={jobType} onValueChange={setJobType}>
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
            <Select defaultValue="all" value={experience} onValueChange={setExperience}>
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

          <div className="space-y-3">
            <Label>Remote Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remote-yes" checked={remoteOptions.remote}
                  onCheckedChange={(checked) =>
                  setRemoteOptions((prev) => ({ ...prev, remote: !!checked }))
} />
                <label
                  htmlFor="remote-yes"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remote
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remote-hybrid" checked={remoteOptions.hybrid}
                  onCheckedChange={(checked) =>
                  setRemoteOptions((prev) => ({ ...prev, hybrid: !!checked }))
} />
                <label
                  htmlFor="remote-hybrid"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Hybrid
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remote-onsite" checked={remoteOptions.onsite}
                  onCheckedChange={(checked) =>
                  setRemoteOptions((prev) => ({ ...prev, onsite: !!checked }))
}/>
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
          <Button type="button" variant="outline" className="w-full" onClick={() => {
            setKeywords("")
            setLocation("")
            setJobType("all")
            setExperience("all")
            setRemoteOptions({
             remote: false,
             hybrid: false,
             onsite: false,
            })
          }}>
            Reset Filters
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
