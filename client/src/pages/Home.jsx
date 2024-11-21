import React from "react";
import { SiLintcode } from "react-icons/si";

function AnimatedGlobe() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-pulse"></div>
      <div className="absolute inset-2 rounded-full bg-blue-400 opacity-40 animate-ping"></div>
      <div className="absolute inset-4 rounded-full bg-blue-300 opacity-60 animate-spin"></div>
      <div className="absolute inset-6 rounded-full bg-blue-200 opacity-80 animate-bounce"></div>
      <SiLintcode className="absolute inset-0 m-auto h-16 w-16 text-blue-600 animate-pulse" />
    </div>
  );
}

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Animated Globe Section */}
      <section className="text-center mb-16">
        <AnimatedGlobe />
        <h1 className="text text-6xl font-bold tracking-tight drop-shadow-md mb-6">
          From Idea to Impact
        </h1>
      </section>

      {/* Description and Call to Action */}
      <section className="text-center mb-20">
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Join CrowdCure to collaborate, innovate, and tackle real-world
          challenges with a community of passionate problem-solvers.
        </p>
        <div>
          <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Why CrowdCure Section */}
      <section className="text-center bg-gray-100 py-12">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">
          Why CrowdCure?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          At CrowdCure, we believe in the power of collaboration. Together, we
          can bring groundbreaking ideas to life and drive meaningful change.
        </p>
        <div className="flex justify-center space-x-8 mt-8">
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-6 rounded-full mb-4">
              <i className="fas fa-users fa-3x"> </i>
            </div>
            <h3 className="text-xl font-semibold">Collaborate</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-6 rounded-full mb-4">
              <i className="fas fa-lightbulb fa-3x"></i>
            </div>
            <h3 className="text-xl font-semibold">Innovate</h3>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-6 rounded-full mb-4">
              <i className="fas fa-cogs fa-3x"></i>
            </div>
            <h3 className="text-xl font-semibold">Solve Problems</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
