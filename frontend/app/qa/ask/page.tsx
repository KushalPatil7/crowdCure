"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createQuestion } from "../../api/question.js" // Adjust the import based on your API function location
export default function AskQuestionPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("write")

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault()
      if (!tags.includes(tagInput.trim().toLowerCase())) {
        setTags([...tags, tagInput.trim().toLowerCase()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const suggestedTags = ["javascript", "react", "nextjs", "typescript", "api", "database"]

  const filteredSuggestions = suggestedTags.filter(
    (tag) => tag.includes(tagInput.toLowerCase()) && !tags.includes(tag) && tagInput !== "",
  )
  const handleSubmit = async () => {
    const questionData = {
      title,
      description,
      category,
      tags
    }

    try {
      const result = await createQuestion(questionData)
      console.log("Question created successfully:", result)
      // You can add navigation here or reset form
      setTitle("")
      setDescription("")
      setCategory("")
      setTags([])
      alert("Question posted successfully!")
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ask a Question</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Write a clear and concise title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Be specific and imagine you're asking a question to another person
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about your question..."
                  className="min-h-[200px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Include all the information someone would need to answer your question
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend Development</SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="mobile">Mobile Development</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="ai">AI & Machine Learning</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tags"
                  placeholder="Add tags (press Enter after each tag)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                />
                {filteredSuggestions.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {filteredSuggestions.map((suggestion) => (
                        <Badge
                          key={suggestion}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => {
                            setTags([...tags, suggestion])
                            setTagInput("")
                          }}
                        >
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="upload">Attachments</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center dark:border-gray-700">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Drag and drop files here, or click to select files
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Supports images, code files, and PDFs up to 5MB
                  </p>
                  <Input id="upload" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-4">
                    Select Files
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview">
              {title || description ? (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-4">{title || "Your question title"}</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      {description || "Your question description will appear here."}
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Eye className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Your question preview will appear here.</p>
                  <p className="text-sm mt-2">Start writing in the "Write" tab to see a preview.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button variant="outline" className="mr-2">
              Save as Draft
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!title || !description || !category}
              onClick={handleSubmit}
            >
              Post Question
            </Button>

          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Tips for a great question</h3>
              <ul className="space-y-2 text-sm">
                <li>• Summarize your problem in a one-line title</li>
                <li>• Describe what you've tried and what you expected</li>
                <li>• Add code examples if applicable</li>
                <li>• Use proper formatting for code blocks</li>
                <li>• Add relevant tags to help categorize your question</li>
                <li>• Check for similar questions before posting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Community Guidelines</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Be respectful and constructive when asking questions. Avoid posting personal information or offensive
                content.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Questions that receive clear, specific answers are more likely to get helpful responses.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
