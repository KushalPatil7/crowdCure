"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Github, ExternalLink, PinIcon, Clock, MessageCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import JoinProjectModal from "@/components/JoinProjectModal"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

// Mock data for the project
const projectData = {
  id: "1",
  title: "Open-source React component library",
  description:
    "We're building a comprehensive React component library with accessibility and customization in mind. The goal is to create a set of reusable components that can be used in any React project, with a focus on developer experience and performance.",
  longDescription:
    "Our component library aims to solve common UI challenges while maintaining flexibility and performance. We're focusing on creating components that are accessible by default, customizable through a simple API, and performant even in large applications. The library will include form elements, navigation components, data display components, and more.",
  skills: ["React", "TypeScript", "CSS", "Accessibility", "Design Systems"],
  members: [
    { id: "1", name: "Alex Johnson", role: "Project Lead", avatar: "/placeholder.svg" },
    { id: "2", name: "Sarah Chen", role: "UI Designer", avatar: "/placeholder.svg" },
    { id: "3", name: "Michael Brown", role: "Frontend Developer", avatar: "/placeholder.svg" },
    { id: "4", name: "Emily Davis", role: "Accessibility Expert", avatar: "/placeholder.svg" },
  ],
  githubUrl: "https://github.com/example/react-component-library",
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
        "I've completed the accessibility audit for the form components. There are a few issues we need to address, especially with keyboard navigation and screen reader support. Here's a summary of the findings:\n\n1. Input component needs proper aria-labels\n2. Select component needs keyboard navigation improvements\n3. Checkbox and Radio components need better focus indicators",
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

export default function ProjectDetailsPage() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("")
  const [newDiscussionContent, setNewDiscussionContent] = useState("")

  const handleCreateDiscussion = () => {
    // In a real app, this would create a new discussion
    console.log("Creating new discussion:", { title: newDiscussionTitle, content: newDiscussionContent })
    // Reset form
    setNewDiscussionTitle("")
    setNewDiscussionContent("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{projectData.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-3xl">{projectData.description}</p>
          <div className="flex flex-wrap gap-2">
            {projectData.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => window.open(projectData.githubUrl, "_blank")}
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsJoinModalOpen(true)}>
            Join Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="discussions">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="contributors">Contributors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                  <p className="mb-6">{projectData.longDescription}</p>

                  <h3 className="text-lg font-semibold mb-3">Project Goals</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Create a comprehensive set of accessible React components</li>
                    <li>Ensure all components are fully customizable and themeable</li>
                    <li>Maintain excellent performance even in large applications</li>
                    <li>Provide thorough documentation and examples</li>
                    <li>Build a community around the library</li>
                  </ul>

                  <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
                  <p className="mb-4">
                    To contribute to this project, you'll need to have experience with React and TypeScript. Familiarity
                    with accessibility standards and component design is a plus.
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-6">
                    <h4 className="text-sm font-semibold mb-2">Clone the repository</h4>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                      git clone {projectData.githubUrl}
                    </pre>
                  </div>

                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => window.open(projectData.githubUrl, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussions">
              <div className="space-y-6">
                {/* Post a New Discussion */}
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Start a New Discussion</h2>
                    <div className="space-y-4">
                      <div>
                        <Input
                          placeholder="Discussion title"
                          value={newDiscussionTitle}
                          onChange={(e) => setNewDiscussionTitle(e.target.value)}
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="What would you like to discuss? You can use Markdown for formatting."
                          className="min-h-[120px]"
                          value={newDiscussionContent}
                          onChange={(e) => setNewDiscussionContent(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={!newDiscussionTitle.trim() || !newDiscussionContent.trim()}
                          onClick={handleCreateDiscussion}
                        >
                          Post Discussion
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pinned Discussions */}
                {projectData.discussions.some((d) => d.isPinned) && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <PinIcon className="w-5 h-5 mr-2 text-orange-500" />
                      Pinned Discussions
                    </h2>
                    <div className="space-y-4">
                      {projectData.discussions
                        .filter((discussion) => discussion.isPinned)
                        .map((discussion) => (
                          <Link
                            href={`/collaboration/${projectData.id}/discussions/${discussion.id}`}
                            key={discussion.id}
                          >
                            <Card className="hover:border-blue-200 dark:hover:border-blue-800 transition-colors cursor-pointer">
                              <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-lg">{discussion.title}</h3>
                                      <PinIcon className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                      Started by {discussion.author.name} •{" "}
                                      {formatDistanceToNow(discussion.date, { addSuffix: true })}
                                    </p>
                                    <p className="line-clamp-2 text-gray-700 dark:text-gray-300">
                                      {discussion.content}
                                    </p>
                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="flex items-center">
                                        <MessageCircle className="w-4 h-4 mr-1" />
                                        {discussion.replies.length}{" "}
                                        {discussion.replies.length === 1 ? "reply" : "replies"}
                                      </span>
                                      <span className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Last activity{" "}
                                        {formatDistanceToNow(
                                          discussion.replies.length > 0
                                            ? discussion.replies[discussion.replies.length - 1].date
                                            : discussion.date,
                                          { addSuffix: true },
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}

                {/* Recent Discussions */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Discussions</h2>
                  <div className="space-y-4">
                    {projectData.discussions
                      .filter((discussion) => !discussion.isPinned)
                      .map((discussion) => (
                        <Link
                          href={`/collaboration/${projectData.id}/discussions/${discussion.id}`}
                          key={discussion.id}
                        >
                          <Card className="hover:border-blue-200 dark:hover:border-blue-800 transition-colors cursor-pointer">
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                                  <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg mb-1">{discussion.title}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Started by {discussion.author.name} •{" "}
                                    {formatDistanceToNow(discussion.date, { addSuffix: true })}
                                  </p>
                                  <p className="line-clamp-2 text-gray-700 dark:text-gray-300">{discussion.content}</p>
                                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center">
                                      <MessageCircle className="w-4 h-4 mr-1" />
                                      {discussion.replies.length}{" "}
                                      {discussion.replies.length === 1 ? "reply" : "replies"}
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      Last activity{" "}
                                      {formatDistanceToNow(
                                        discussion.replies.length > 0
                                          ? discussion.replies[discussion.replies.length - 1].date
                                          : discussion.date,
                                        { addSuffix: true },
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contributors">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-6">Project Contributors</h2>

                  <div className="space-y-6">
                    {projectData.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-start gap-4 pb-6 border-b dark:border-gray-800 last:border-0"
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{member.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button variant="ghost" size="sm">
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Join as a Contributor</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Interested in contributing to this project? Click the button below to apply.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsJoinModalOpen(true)}>
                      Apply to Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Team Members</h3>
              <div className="space-y-4">
                {projectData.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Project Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Team Members</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Components</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">35</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Commits</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Open Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Skills Needed</h3>
              <div className="flex flex-wrap gap-2">
                {projectData.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <JoinProjectModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        projectId={projectData.id}
        projectTitle={projectData.title}
        projectDescription={projectData.description}
        skills={projectData.skills}
        members={projectData.members}
      />
    </div>
  )
}
