"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuestionCard from "@/components/QuestionCard";
import { getAllQuestions } from "../api/question.js";
import Link from "next/link";

interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[]; // Assuming tags are already an array
  votes: number;
  answer: any[]; // Assuming answers are an array
}

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await getAllQuestions();
        console.log("Fetched questions:", response.data); // response.data is your array
        setQuestions(response.data); // ✅ Assign only the array
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    

    fetchQuestions();
  }, []);

  if (loading) {
    return <div>Loading questions...</div>;
  }

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

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((q) => (
          <QuestionCard
            _id={q._id}
            key={q._id}
            title={q.title}
            description={q.description}
            tags={q.tags || []}  // Assuming tags is an array already
            votes={q.votes || 0}  // Assuming votes is part of the question
            answers={q.answer || []}
          />
        ))}
      </div>
    </div>
  );
}
