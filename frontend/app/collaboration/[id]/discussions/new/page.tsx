"use client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import NewDiscussionForm from "@/components/new-discussion-form"

// Mock data for the project
const projectData = {
  id: "1",
  title: "Open-source React component library",
}

export default function NewDiscussionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = params.id

  const handleSubmit = (title: string, content: string) => {
    // In a real app, this would create a new discussion on the server
    console.log("Creating new discussion:", { title, content, projectId })

    // Redirect to the project discussions page
    router.push(`/collaboration/${projectId}/discussions`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/collaboration/${projectId}/discussions`}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {projectData.title} Discussions
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <NewDiscussionForm projectId={projectId} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
