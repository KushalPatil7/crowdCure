import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Calendar } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'

interface CollaborationCardProps {
  id: string
  title: string
  description: string
  skills: string[]
  members: number
  createdAt: string
  status?: 'open' | 'closed' | 'in-progress'
  onJoinClick?: () => void
}

export default function CollaborationCard({ 
  id, 
  title, 
  description, 
  skills, 
  members,
  createdAt,
  status = 'open',
  onJoinClick 
}: CollaborationCardProps) {
  const statusColors = {
    'open': 'bg-green-100 text-green-800',
    'closed': 'bg-red-100 text-red-800',
    'in-progress': 'bg-yellow-100 text-yellow-800'
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>
            <Link
              href={`/collaboration/${id}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {title}
            </Link>
          </CardTitle>
          <Badge variant="secondary" className={statusColors[status]}>
            {status}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Created {formatDistanceToNow(new Date(createdAt))} ago</span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Users className="w-4 h-4 mr-1" />
          <span>{members} members</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1" asChild>
          <Link href={`/collaboration/${id}`}>View Details</Link>
        </Button>
        {status === 'open' && (
          <Button 
            variant="secondary" 
            className="flex-1"
            onClick={onJoinClick}
          >
            Join Project
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}