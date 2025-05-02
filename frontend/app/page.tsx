import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Briefcase, Building, MapPin } from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                   Spring Into <span className="text-primary">Your Career</span> Today
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Connect with top employers and discover opportunities that match your skills and career goals.
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
              <div className="relative rounded-lg bg-muted p-8 shadow-lg">
                <div className="space-y-4">
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
                        <Input type="text" id="location" className="pl-10" placeholder="City, State, or Remote" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Search Jobs</Button>
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Popular Job Categories</h2>
            <p className="mt-4 text-lg text-muted-foreground">Explore opportunities in these in-demand fields</p>
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-secondary p-8 md:p-12">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight text-secondary-foreground sm:text-3xl">
                  Ready to take the next step in your career?
                </h2>
                <p className="mt-4 text-lg text-secondary-foreground/90">
                  Join thousands of job seekers who have found their dream jobs through JobMatch.
                </p>
              </div>
              <div className="mt-8 md:mt-0">
                <Button
                  asChild
                  size="lg"
                  variant="primary"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
