import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpCircle, MessageCircle } from "lucide-react"

// Define the Answer interface if answers are more than just strings
interface Answer {
  text: string
  userId: string
}

interface QuestionCardProps {
  _id: string
  title: string
  description: string
  tags: string[]
  votes: number
  answers: any[] // Use Answer[] if answers are complex objects
}

export default function QuestionCard({ title, description, tags, votes, answers }: QuestionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-gray-600">
        <div className="flex items-center">
          <ArrowUpCircle className="w-4 h-4 mr-1" />
          <span>{votes} votes</span>
        </div>
        <div className="flex items-center">
          <MessageCircle className="w-4 h-4 mr-1" />
          <span>{answers.length} answers</span> {/* Display the number of answers */}
        </div>
      </CardFooter>
    </Card>
  )
}
