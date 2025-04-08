import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PinIcon } from "lucide-react"
import Link from "next/link"
import DiscussionListItem from "@/components/discussion-list-item"

// Mock data for the project
const projectData = {
  id: "1",
  title: "Open-source React component library",
  discussions: [
    {
      id: "1",
      isPinned: true,
      title: "Welcome to the project! Read this first",
      author: { id: "1", name: "Alex Johnson", avatar: "/placeholder.svg" },
      date: new Date(2023, 2, 15),
      content:
        "Welcome to our React component library project! This thread contains important information for new contributors. Please read through our contribution guidelines and code of conduct before getting started.",
      replies: [
        {
          id: "2",
          author: { id: "3", name: "Michael Brown", avatar: "/placeholder.svg" },
          date: new Date(2023, 2, 16),
          content:
            "I've added links to our documentation and setup guide in the README. Let me know if anything is unclear!",
        },
      ],
    },
    {
      id: "3",
      isPinned: false,
      title: "Button component API design discussion",
      author: { id: "1", name: "Alex Johnson", avatar: "/placeholder.svg" },
      date: new Date(2023, 3, 5),
      content:
        "I've pushed the initial setup for the Button component. Please review and provide feedback on the API design. I'm particularly interested in how we should handle variants and sizes.",
      replies: [
        {
          id: "4",
          author: { id: "2", name: "Sarah Chen", avatar: "/placeholder.svg" },
          date: new Date(2023, 3, 6),
          content:
            "The design looks good! I would suggest adding a size prop to make it more flexible. Maybe we could have 'sm', 'md', and 'lg' as options?",
        },
        {
          id: "5",
          author: { id: "4", name: "Emily Davis", avatar: "/placeholder.svg" },
          date: new Date(2023, 3, 7),
          content:
            "I like the API so far. For accessibility, we should ensure that the button has proper focus states and keyboard navigation support. Also, we should make sure that the contrast ratio meets WCAG standards for all color variants.",
        },
      ],
    },
    {
      id: "6",
      isPinned: false,
      title: "Accessibility audit for form components",
      author: { id: "4", name: "Emily Davis", avatar: "/placeholder.svg" },
      date: new Date(2023, 3, 10),
      content:
        "I've completed the accessibility audit for the form components. There are a few issues we need to address, especially with keyboard navigation and screen reader support.",
      replies: [],
    },
    {
      id: "7",
      isPinned: false,
      title: "Documentation site planning",
      author: { id: "3", name: "Michael Brown", avatar: "/placeholder.svg" },
      date: new Date(2023, 3, 12),
      content:
        "We should start planning our documentation site. I'm thinking of using Docusaurus or Nextra. Any preferences or suggestions?",
      replies: [
        {
          id: "8",
          author: { id: "1", name: "Alex Johnson", avatar: "/placeholder.svg" },
          date: new Date(2023, 3, 13),
          content:
            "I've had good experiences with Nextra for Next.js projects. It's simple to set up and has good MDX support. Let's go with that unless anyone has strong objections.",
        },
      ],
    },
  ],
}

export default function DiscussionsPage({ params }: { params: { id: string } }) {
  const projectId = params.id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{projectData.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">Project Discussions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Link href={`/collaboration/${projectId}#new-discussion`}>Start New Discussion</Link>
        </Button>
      </div>

      <div className="mb-8">
        <Input placeholder="Search discussions..." className="max-w-3xl" />
      </div>

      {/* Pinned Discussions */}
      {projectData.discussions.some((d) => d.isPinned) && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PinIcon className="w-5 h-5 mr-2 text-orange-500" />
            Pinned Discussions
          </h2>
          <div className="space-y-4">
            {projectData.discussions
              .filter((discussion) => discussion.isPinned)
              .map((discussion) => (
                <DiscussionListItem
                  key={discussion.id}
                  id={discussion.id}
                  projectId={projectId}
                  title={discussion.title}
                  author={discussion.author}
                  date={discussion.date}
                  content={discussion.content}
                  isPinned={discussion.isPinned}
                  replies={discussion.replies}
                />
              ))}
          </div>
        </div>
      )}

      {/* All Discussions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Discussions</h2>
        <div className="space-y-4">
          {projectData.discussions
            .filter((discussion) => !discussion.isPinned)
            .map((discussion) => (
              <DiscussionListItem
                key={discussion.id}
                id={discussion.id}
                projectId={projectId}
                title={discussion.title}
                author={discussion.author}
                date={discussion.date}
                content={discussion.content}
                isPinned={discussion.isPinned}
                replies={discussion.replies}
              />
            ))}
        </div>
      </div>

      {/* Create New Discussion Card */}
      <div className="mt-12" id="new-discussion">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Start a New Discussion</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Have a question or want to discuss something about the project? Start a new discussion thread.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href={`/collaboration/${projectId}#new-discussion`}>Create Discussion</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
