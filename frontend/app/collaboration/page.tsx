import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CollaborationCard from "@/components/CollaborationCard"
import Link from "next/link"

export default function CollaborationPage() {
  const projects = [
    {
      id: "1",
      title: "Open-source React component library",
      description:
        "We're building a comprehensive React component library and need skilled frontend developers to contribute.",
      skills: ["React", "TypeScript", "CSS"],
      members: 8,
    },
    {
      id: "2",
      title: "AI-powered personal finance app",
      description:
        "Join us in creating an innovative personal finance app that uses AI to provide personalized advice and insights.",
      skills: ["Python", "Machine Learning", "React Native"],
      members: 5,
    },
    {
      id: "3",
      title: "Blockchain-based voting system",
      description:
        "We're developing a secure and transparent voting system using blockchain technology. Looking for blockchain experts and security specialists.",
      skills: ["Blockchain", "Solidity", "Cybersecurity"],
      members: 6,
    },
    {
      id: "4",
      title: "IoT home automation platform",
      description:
        "We're creating an open-source platform for integrating various IoT devices for home automation. Join us if you're passionate about IoT and smart homes!",
      skills: ["IoT", "Embedded Systems", "Cloud Computing"],
      members: 4,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Collaboration Projects</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Link href="/collaboration/create">Post a Project</Link>
        </Button>
      </div>

      <div className="mb-8">
        <Input placeholder="Search projects by title, skills, or description..." className="max-w-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <CollaborationCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            skills={project.skills}
            members={project.members}
          />
        ))}
      </div>
    </div>
  )
}
