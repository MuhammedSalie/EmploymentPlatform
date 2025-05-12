"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import { Loader2, Sparkles, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  experience: z.string({
    required_error: "Please select your experience level.",
  }),
  resume: z
    .any()
    .refine((file) => file?.length === 1, "Resume is required.")
    .refine((file) => file?.[0]?.size <= 5000000, "Max file size is 5MB."),
  coverLetter: z.string().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
})

interface JobApplicationFormProps {
  jobId: string
  jobTitle: string
  company: string
  xpReward?: number
}

export default function JobApplicationForm({ jobId, jobTitle, company, xpReward = 50 }: JobApplicationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formProgress, setFormProgress] = useState(0)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      termsAccepted: false,
    },
  })

  // Update progress as fields are filled
  const watchedFields = form.watch()

  // Calculate form completion percentage
  const calculateProgress = () => {
    const fields = Object.entries(watchedFields)
    let completedFields = 0

    fields.forEach(([key, value]) => {
      if (key === "termsAccepted" && value === true) completedFields++
      else if (key === "resume" && value?.length > 0) completedFields++
      else if (key !== "termsAccepted" && key !== "resume" && value) completedFields++
    })

    return Math.round((completedFields / fields.length) * 100)
  }

  // Update progress when form values change
  useState(() => {
    setFormProgress(calculateProgress())
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    console.log("Form values:", values)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)

    // Redirect to applications page
    router.push(`/applications?success=true`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span>Application Progress</span>
            <span>{formProgress}% Complete</span>
          </div>
          <Progress value={formProgress} className="h-2" />
          {formProgress === 100 && (
            <div className="mt-2 flex items-center justify-center gap-1 text-xs text-primary">
              <Sparkles className="h-3 w-3" />
              Perfect! Your application is ready to submit
            </div>
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setFormProgress(calculateProgress())
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setFormProgress(calculateProgress())
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(123) 456-7890"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setFormProgress(calculateProgress())
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setFormProgress(calculateProgress())
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                    <SelectItem value="lead">Lead/Manager (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      onChange(e.target.files)
                      setFormProgress(calculateProgress())
                    }}
                    className="cursor-pointer"
                  />
                </FormControl>
                <FormDescription>Upload your resume (PDF, DOC, or DOCX, max 5MB)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us why you're interested in this position..."
                    className="min-h-[120px] resize-y"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setFormProgress(calculateProgress())
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked)
                      setFormProgress(calculateProgress())
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </a>
                  </FormLabel>
                  <FormDescription>
                    By submitting this application, you agree to our privacy policy and terms of service.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Apply for {jobTitle} at {company}
                <Badge className="ml-2 bg-primary/20 text-primary">+{xpReward} XP</Badge>
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
