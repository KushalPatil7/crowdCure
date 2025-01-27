import React from "react";
import { FaThumbsUp } from "react-icons/fa";

const QuestionCard = ({ question, setShowModal }) => {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
      {/* Question Title */}
      <h4 className="text-xl font-medium text-gray-800 mb-2">
        {question.title}
      </h4>

      {/* Question Description */}
      <p className="p-4 text-gray-600 text-justify mb-4">
        {question.description}
      </p>

      {/* Tags */}
      <div className="mb-4">
        <span className="text-sm text-gray-500">Tags: </span>
        {(question.tags || []).map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 mr-2"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Categories */}
      <div className="mb-4">
        <span className="text-sm text-gray-500">Category: </span>
        {/* but it's possible that in some cases, they are either not defined or are null. */}
        {(question.category || []).map((category, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 mr-2 mb-2"
          >
            {category}
          </span>
        ))}
      </div>

      {/* Attachments */}
      {question.attachments && question.attachments.length > 0 && (
        <div className="text-sm text-gray-500 mb-4">
          <span className="font-semibold">Attachments: </span>
          <ul className="list-disc pl-5">
            {question.attachments.map((attachment, index) => {
              const fileExtension = attachment.name
                .split(".")
                .pop()
                .toLowerCase();
              if (
                fileExtension === "jpg" ||
                fileExtension === "jpeg" ||
                fileExtension === "png"
              ) {
                return (
                  <li key={index}>
                    <img
                      src={attachment.url}
                      alt={attachment.name}
                      className="max-w-full h-auto rounded-md mb-2"
                    />
                  </li>
                );
              }
              return (
                <li key={index}>
                  <a
                    href={attachment.url}
                    className="text-blue-600 hover:underline"
                  >
                    {attachment.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Upvote Button */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="bg-blue-400 text-white py-2 px-4 rounded-md flex items-center hover:bg-blue-800 transition-all duration-300"
        >
          <FaThumbsUp className="mr-2" /> Upvote
        </button>

        {/* View Details Button */}
        <button className="text-blue-500 hover:text-blue-700 transition-all duration-300 font-semibold">
          View Details
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
