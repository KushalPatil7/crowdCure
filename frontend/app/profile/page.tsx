"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "@/components/QuestionCard";
import CollaborationCard from "@/components/CollaborationCard";
import { getUser } from "../api/user"; // Import the getUser function
import { getUserId } from "../../utils/decode"; // For decoding token

export default function ProfilePage() {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [userId, setUserId] = useState<string | null>(null); // State for userId

  // Use useEffect to get the userId from the token after the component mounts
  useEffect(() => {
    const fetchedUserId = getUserId(); // Get userId (client-side only)
    console.log("Fetched User ID:", fetchedUserId); // 👈 Add this line
    setUserId(fetchedUserId); // Set the userId state
  }, []);
  

  useEffect(() => {
    if (!userId) {
      console.log("No user ID found.");
      setLoading(false); // Stop loading if no userId is found
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getUser(userId); // Fetch user data using getUser
        setUser(data); // Update state with user data
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUser();
  }, [userId]); // Fetch user data when userId changes

  // If data is still loading, show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found or please log in</div>; // Handle case where user data is not available
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-8 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
          <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.fullName}</h1>
          <p className="text-gray-600 mb-4">{user.bio}</p>
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
            {user.questions && user.questions.map((question) => (
              <QuestionCard
                key={question._id}
                title={question.title}
                description={question.content}
                tags={question.tags || []}
                votes={question.votes || 0}
                answers={question.answers || 0}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="collaborations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.collaborations && user.collaborations.map((collaboration) => (
              <CollaborationCard
                key={collaboration._id}
                title={collaboration.title}
                description={collaboration.description}
                skills={collaboration.skills || []}
                members={collaboration.members || 0}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
