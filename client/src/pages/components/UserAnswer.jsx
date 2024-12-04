import React from "react";

const UserAnswer = () => {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">Answer 1</h4>
      <p className="text-gray-600">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, officiis magni reiciendis ut sit consectetur ad amet rem pariatur maxime, in numquam corporis eum? Numquam.  </p>
      <button className="mt-4 text-blue-500 hover:text-blue-700 transition-all duration-300 font-semibold">
        Edit Answer
      </button>
    </div>
  );
};

export default UserAnswer;
