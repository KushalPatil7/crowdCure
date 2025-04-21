import Link from "next/link"
import { Button } from "@/components/ui/button"
import QuestionCard from "@/components/QuestionCard"
import CollaborationCard from "@/components/CollaborationCard"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Solve Problems. Collaborate on Projects.</h1>
        <p className="text-xl text-gray-600 mb-8">Join CrowdCure and be part of a community that makes a difference.</p>
        <Button size="lg" asChild>
          <Link href="/auth">Get Started</Link>
        </Button>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Featured Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuestionCard
            title="How to optimize React performance?"
            description="I'm working on a large React application and noticing some performance issues. What are some best practices for optimizing React apps?"
            tags={["react", "performance", "optimization"]}
            votes={42}
            answers={15}
          />
          <QuestionCard
            title="Best practices for API security?"
            description="I'm building a RESTful API and want to ensure it's secure. What are some essential security measures I should implement?"
            tags={["api", "security", "best-practices"]}
            votes={38}
            answers={12}
          />
          <QuestionCard
            title="Machine Learning for image recognition"
            description="I'm new to ML and want to build an image recognition model. Where should I start and what libraries are recommended?"
            tags={["machine-learning", "image-recognition", "python"]}
            votes={56}
            answers={23}
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Trending Collaborations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CollaborationCard
            title="Open-source React component library"
            description="We're building a comprehensive React component library and need skilled frontend developers to contribute."
            skills={["React", "TypeScript", "CSS"]}
            members={8}
          />
          <CollaborationCard
          
            title="AI-powered personal finance app"
            description="Join us in creating an innovative personal finance app that uses AI to provide personalized advice and insights."
            skills={["Python", "Machine Learning", "React Native"]}
            members={5}
          />
          <CollaborationCard
            title="Blockchain-based voting system"
            description="We're developing a secure and transparent voting system using blockchain technology. Looking for blockchain experts and security specialists."
            skills={["Blockchain", "Solidity", "Cybersecurity"]}
            members={6}
          />
        </div>
      </section>
    </div>
  )
}
