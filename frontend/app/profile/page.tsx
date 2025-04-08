import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuestionCard from "@/components/QuestionCard"
import CollaborationCard from "@/components/CollaborationCard"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-8 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold mb-2">John Doe</h1>
          <p className="text-gray-600 mb-4">
            Full-stack developer passionate about solving problems and building innovative solutions.
          </p>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </div>
      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
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
          </div>
        </TabsContent>
        <TabsContent value="collaborations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
