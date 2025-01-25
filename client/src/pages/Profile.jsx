import React from "react";
import SearchBar from "./components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "./components/QuestionCard";
import UserAnswer from "./components/UserAnswer";
import { SampleQuestionData } from "../config/data";

const Profile = () => {
  return (
    <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between px-6 py-12 max-w-7xl mx-auto">
      <div className="w-full">
        {/* Upper part of column */}
        {/* Profile Header */}
        <div className="flex items-center flex-col lg:flex-row lg:items-start gap-6 lg:gap-10 mb-10">
          <img
            src="/assets/icons/stars.svg"
            alt="User Avatar"
            className="w-[150px] h-[150px] rounded-full object-cover border-4 border-gray-300 shadow-lg"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">Username</h2>
            <p className="text-lg text-gray-500">@Username</p>
          </div>
          {/* Align Edit Profile Button to the Right */}
          <div className="lg:ml-auto">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Lower part of column (Content Sections) */}
        <div className="w-full flex flex-col gap-10 lg:flex-row lg:gap-16">
          <Tabs defaultValue="Questions" className="w-full">
            <TabsList className="flex mb-4 gap-4" >
              <TabsTrigger
                value="Questions"
                className="text-lg font-semibold py-2 px-4 rounded-t-lg hover:bg-blue-500 hover:text-white focus:outline-none transition-all duration-300 ease-in-out"
              >
                Questions
              </TabsTrigger>
              <TabsTrigger
                value="Answers"
                className="text-lg font-semibold py-2 px-4 rounded-t-lg hover:bg-blue-500 hover:text-white focus:outline-none transition-all duration-300 ease-in-out"
              >
                Answers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Questions">
              <div className="flex-1 border rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Questions
                </h3>
                <SearchBar />
                <div className="mt-6 space-y-6">
                  {SampleQuestionData.map((question, index) => (
                    <QuestionCard key={index} question={question} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Answers">
              <div className="flex-1 border rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Answers
                </h3>
                <SearchBar />
                <div className="mt-6 space-y-6">
                  <div className="flex flex-col space-y-4">
                    <UserAnswer />
                    <UserAnswer />
                    <UserAnswer />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
