import JobSearch from "@/components/job-search"
import JobList from "@/components/job-list"

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Find Jobs</h1>
      <p className="mt-2 text-muted-foreground">Search and filter through thousands of opportunities</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <JobSearch />
        </div>
        <div className="lg:col-span-3">
          <JobList />
        </div>
      </div>
    </div>
  )
}
