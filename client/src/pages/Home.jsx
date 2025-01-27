import React from "react";
import { SiLintcode } from "react-icons/si";

function AnimatedGlobe() {
  return (
    <div className="relative w-40 h-40 mx-auto mb-12">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-20 animate-pulse"></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-40 animate-ping"></div>
      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 opacity-60 animate-spin"></div>
      <div className="absolute inset-6 rounded-full bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 opacity-80 animate-bounce"></div>
      <SiLintcode className="absolute inset-0 m-auto h-20 w-20 text-blue-600 animate-pulse" />
    </div>
  );
}

const Home = () => {
  return (
    <div className=" mx-auto px-4 py-12 h-full flex flex-col justify-center items-center">
      {/* Animated Globe Section */}
      <section className="text-center mb-6">
        <AnimatedGlobe />
        <h1 className="text-5xl font-bold tracking-tight text-gray-800 drop-shadow-lg mb-6">
          From Idea to Impact
        </h1>
      </section>

      {/* Description and Call to Action */}
      <section className="text-center">
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
          Join CrowdCure to collaborate, innovate, and tackle real-world
          challenges with a community of passionate problem-solvers.
        </p>
        <div>
          <button className="bg-blue-600 text-white text-lg font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
