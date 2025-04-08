"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface Member {
  id: string
  name: string
  role: string
  avatar?: string
}

interface JoinProjectModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  projectTitle: string
  projectDescription: string
  skills: string[]
  members: Member[]
}

export default function JoinProjectModal({
  isOpen,
  onClose,
  projectId,
  projectTitle,
  projectDescription,
  skills,
  members,
}: JoinProjectModalProps) {
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // In a real app, you would send the request to the server
      console.log("Join request submitted", { projectId, message })
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Join Project</DialogTitle>
          <DialogDescription>Send a request to join this collaboration project.</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <h3 className="font-semibold text-lg mb-2">{projectTitle}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{projectDescription}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Current Team Members</h4>
            <div className="flex flex-wrap gap-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isSubmitted ? (
            <>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Why do you want to join this project?
                </label>
                <Textarea
                  id="message"
                  placeholder="Introduce yourself and explain why you're interested in this project and what skills you can contribute..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px]"
                  disabled={isSubmitting}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!message.trim() || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-center">
              <svg
                className="mx-auto h-12 w-12 text-green-500 dark:text-green-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">Request Submitted!</h3>
              <p className="text-green-600 dark:text-green-400 mb-4">
                Your request to join this project has been sent to the team. You'll be notified when they respond.
              </p>
              <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
