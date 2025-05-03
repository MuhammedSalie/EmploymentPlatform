import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">NextLeaf</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Find your dream job with NextLeaf. We connect talented professionals with top companies.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">For Job Seekers</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/jobs" className="text-muted-foreground hover:text-primary">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/applications" className="text-muted-foreground hover:text-primary">
                  My Applications
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-muted-foreground hover:text-primary">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">For Recruiters</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/post-job" className="text-muted-foreground hover:text-primary">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/employer-resources" className="text-muted-foreground hover:text-primary">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NextLeaf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
