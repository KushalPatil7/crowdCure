import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { PinIcon, MessageCircle, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface Author {
  id: string
  name: string
  avatar: string
}

interface Reply {
  id: string
  author: Author
  date: Date
  content: string
  likes?: number
}

interface DiscussionListItemProps {
  id: string
  projectId: string
  title: string
  author: Author
  date: Date
  content: string
  isPinned: boolean
  replies: Reply[]
}

export default function DiscussionListItem({
  id,
  projectId,
  title,
  author,
  date,
  content,
  isPinned,
  replies,
}: DiscussionListItemProps) {
  return (
    <Link href={`/collaboration/${projectId}/discussions/${id}`}>
      <Card className="hover:border-blue-200 dark:hover:border-blue-800 transition-colors cursor-pointer">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{title}</h3>
                {isPinned && <PinIcon className="w-4 h-4 text-orange-500" />}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Started by {author.name} • {formatDistanceToNow(date, { addSuffix: true })}
              </p>
              <p className="line-clamp-2 text-gray-700 dark:text-gray-300">{content.replace(/[#*`]/g, "")}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {replies.length} {replies.length === 1 ? "reply" : "replies"}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Last activity{" "}
                  {formatDistanceToNow(replies.length > 0 ? replies[replies.length - 1].date : date, {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
