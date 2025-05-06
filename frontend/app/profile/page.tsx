"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: "",
    website: "",
    location: "",
    bio: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("https://your-api-id.execute-api.region.amazonaws.com/prod/profile", {
        method: "GET",
        headers: {
          "x-user-id": "muhammedsalie", // Replace with actual user ID securely
        },
      })
      const data = await res.json()
      setFormData(data)
    }

    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formDataUpload = new FormData()
    formDataUpload.append("file", file)

    const res = await fetch("https://your-api-id.execute-api.region.amazonaws.com/prod/upload", {
      method: "POST",
      body: formDataUpload,
      headers: {
        "x-user-id": "muhammedsalie",
      },
    })

    const { imageUrl } = await res.json()
    setFormData((prev) => ({ ...prev, profileImage: imageUrl }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("https://your-api-id.execute-api.region.amazonaws.com/prod/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": "muhammedsalie",
      },
      body: JSON.stringify(formData),
    })
    alert("Profile updated!")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={formData.name} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={formData.email} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="profileImage">Profile Image</Label>
        {formData.profileImage && (
          <img src={formData.profileImage} alt="Profile" className="w-20 h-20 rounded-full mb-2" />
        )}
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div>
        <Label htmlFor="website">Website URL</Label>
        <Input id="website" value={formData.website} onChange={handleChange} placeholder="https://yoursite.com" />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" value={formData.location} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" value={formData.bio} onChange={handleChange} rows={4} />
      </div>

      <Button type="submit">Save Profile</Button>
    </form>
  )
}