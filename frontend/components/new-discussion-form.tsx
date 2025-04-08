"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarkdownRenderer from "@/components/markdown-renderer"

interface NewDiscussionFormProps {
  projectId: string
  onSubmit?: (title: string, content: string) => void
}

export default function NewDiscussionForm({ projectId, onSubmit }: NewDiscussionFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [activeTab, setActiveTab] = useState("write")

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(title, content)
    }
    // Reset form
    setTitle("")
    setContent("")
    setActiveTab("write")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Start a New Discussion</h2>
        <div className="space-y-4">
          <div>
            <Input placeholder="Discussion title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="write">
              <Textarea
                placeholder="What would you like to discuss? You can use Markdown for formatting."
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Supports Markdown: **bold**, *italic*, `code`, ```code blocks```, [links](url), and more.
              </p>
            </TabsContent>

            <TabsContent value="preview">
              {content ? (
                <div className="border rounded-md p-4 min-h-[200px]">
                  <h3 className="text-lg font-semibold mb-4">{title || "Discussion Title"}</h3>
                  <MarkdownRenderer content={content} />
                </div>
              ) : (
                <div className="border rounded-md p-4 min-h-[200px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <p>Preview will appear here. Start writing to see a preview.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!title.trim() || !content.trim()}
              onClick={handleSubmit}
            >
              Post Discussion
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
