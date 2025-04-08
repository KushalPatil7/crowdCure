"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PinIcon, ArrowLeft, ThumbsUp, Flag, Share2 } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow, format } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

// Mock data for the project and discussions
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
        "# Welcome to our React component library project!\n\nThis thread contains important information for new contributors. Please read through our contribution guidelines and code of conduct before getting started.\n\n## Getting Started\n\n1. Clone the repository\n2. Install dependencies with `npm install`\n3. Run the development server with `npm run dev`\n\n## Code Guidelines\n\nWe follow a specific coding style. Please make sure your code adheres to our linting rules.\n\n```javascript\n// Example component structure\nimport React from 'react';\n\ninterface ButtonProps {\n  variant?: 'primary' | 'secondary' | 'outline';\n  size?: 'sm' | 'md' | 'lg';\n  children: React.ReactNode;\n}\n\nexport const Button = ({ variant = 'primary', size = 'md', children }: ButtonProps) => {\n  return (\n    <button className={`btn btn-${variant} btn-${size}`}>\n      {children}\n    </button>\n  );\n};\n```",
      replies: [
        {
          id: "2",
          author: { id: "3", name: "Michael Brown", avatar: "/placeholder.svg" },
          date: new Date(2023, 2, 16),
          content:
            "I've added links to our documentation and setup guide in the README. Let me know if anything is unclear!",
          likes: 3,
        },
        {
          id: "9",
          author: { id: "4", name: "Emily Davis", avatar: "/placeholder.svg" },
          date: new Date(2023, 2, 17),
          content:
            "Thanks for setting this up! I've been looking through the code and I have a few questions about the accessibility implementation:\n\n1. Are we using `aria-label` attributes for all interactive elements?\n2. How are we handling keyboard navigation?\n\nI'd be happy to help with the accessibility aspects of this project.",
          likes: 5,
        },
      ],
      likes: 12,
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
          likes: 2,
        },
        {
          id: "5",
          author: { id: "4", name: "Emily Davis", avatar: "/placeholder.svg" },
          date: new Date(2023, 3, 7),
          content:
            "I like the API so far. For accessibility, we should ensure that the button has proper focus states and keyboard navigation support. Also, we should make sure that the contrast ratio meets WCAG standards for all color variants.",
          likes: 4,
        },
      ],
      likes: 8,
    },
  ],
}

export default function DiscussionThreadPage() {
  const params = useParams()
  const projectId = params.id as string
  const discussionId = params.discussionId as string

  // Find the discussion from the mock data
  const discussion = projectData.discussions.find((d) => d.id === discussionId)

  const [replyContent, setReplyContent] = useState("")
  const [isPinned, setIsPinned] = useState(discussion?.isPinned || false)

  if (!discussion) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Discussion not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The discussion you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href={`/collaboration/${projectId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Project
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmitReply = () => {
    // In a real app, this would submit the reply to the server
    console.log("Submitting reply:", replyContent)
    setReplyContent("")
  }

  const togglePin = () => {
    // In a real app, this would update the pinned status on the server
    setIsPinned(!isPinned)
    console.log(`Discussion ${isPinned ? "unpinned" : "pinned"}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <div className="mb-6">
        <Link
          href={`/collaboration/${projectId}`}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {projectData.title}
        </Link>
      </div>

      {/* Main discussion thread */}
      <div className="space-y-6">
        {/* Original post */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      {discussion.title}
                      {isPinned && <PinIcon className="w-5 h-5 text-orange-500" />}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Posted by {discussion.author.name} • {format(discussion.date, "PPP")} (
                      {formatDistanceToNow(discussion.date, { addSuffix: true })})
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={togglePin}>
                            <PinIcon className={`w-4 h-4 ${isPinned ? "text-orange-500" : ""}`} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isPinned ? "Unpin discussion" : "Pin discussion"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            ></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none my-6">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "")
                        return !inline && match ? (
                          <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        )
                      },
                    }}
                  >
                    {discussion.content}
                  </ReactMarkdown>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{discussion.likes || 0}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-red-600 dark:text-red-400">
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Replies ({discussion.replies.length})</h2>

          <div className="space-y-6">
            {discussion.replies.map((reply) => (
              <Card key={reply.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                      <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{reply.author.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {format(reply.date, "PPP")} ({formatDistanceToNow(reply.date, { addSuffix: true })})
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                ></path>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="prose dark:prose-invert max-w-none my-4">
                        <ReactMarkdown>{reply.content}</ReactMarkdown>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{reply.likes || 0}</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reply form */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Add Your Reply</h3>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your reply here... You can use Markdown for formatting."
                className="min-h-[120px]"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Supports Markdown formatting</p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!replyContent.trim()}
                  onClick={handleSubmitReply}
                >
                  Post Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
