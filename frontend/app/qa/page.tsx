import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import QuestionCard from "@/components/QuestionCard"
import Link from "next/link"

export default function QAPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Q&A Forum</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Link href="/qa/ask">Ask a Question</Link>
        </Button>
      </div>

      <div className="mb-8">
        <Input placeholder="Search questions..." className="max-w-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <QuestionCard
          title="Implementing WebSockets in Node.js"
          description="I need to add real-time functionality to my Node.js application. What's the best way to implement WebSockets?"
          tags={["node.js", "websockets", "real-time"]}
          votes={29}
          answers={8}
        />
      </div>
    </div>
  )
}
