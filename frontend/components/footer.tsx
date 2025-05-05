import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">NextLeaf</h3>
            <p className="mt-4 text-sm text-muted-foreground">
            Kickstart your career with NextLeaf. We help ambitious new talent connect with awesome companies looking for fresh ideas.
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
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">For Recruiters</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/job-post" className="text-muted-foreground hover:text-primary">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Important Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
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
