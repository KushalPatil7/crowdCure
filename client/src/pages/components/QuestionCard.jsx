import React from "react";

import {FaThumbsUp } from "react-icons/fa";
const QuestionCard = ({ question, setShowModal }) => {
  // if (!question) {
  //   return (
  //     <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md text-center mb-6">
  //       <h3 className="text-xl font-semibold text-gray-800 mb-2">
  //         There's no question to show
  //       </h3>
  //       <p className="text-gray-600 mb-4">
  //         Be the first to break the silence! 🚀 Ask a Question and kickstart the
  //         discussion. Our query could be the next big thing others learn from.
  //         Get involved! 💡
  //       </p>
  //       <button
  //         className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold"
  //         onClick={() => setShowModal(true)} // Open the modal
  //       >
  //         Ask a Question
  //       </button>
  //     </div>
  //   );
  // }

 return (
   <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
     {/* Question Title */}
     <h4 className="text-xl font-semibold text-gray-800 mb-2">
       {question.title}
     </h4>

     {/* Question Description */}
     <p className="text-gray-600 text-justify mb-4">{question.description}</p>

     {/* Tags */}
     <div className="mb-4">
       <span className="text-sm text-gray-500">Tags: </span>
       {question.tags.map((tag, index) => (
         <span
           key={index}
           className="inline-block bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1 mr-2 mb-2"
         >
           {tag}
         </span>
       ))}
     </div>

     {/* Category */}
     <div className="text-sm text-gray-500 mb-4">
       <span className="font-semibold">Category: </span>
       {question.category}
     </div>

     {/* Attachments */}
     {question.attachments.length > 0 && (
       <div className="text-sm text-gray-500 mb-4">
         <span className="font-semibold">Attachments: </span>
         <ul className="list-disc pl-5">
           {question.attachments.map((attachment, index) => (
             <li key={index}>
               <a
                 href={attachment.url}
                 className="text-blue-600 hover:underline"
               >
                 {attachment.name}
               </a>
             </li>
           ))}
         </ul>
       </div>
     )}

     {/* Upvote Button */}
     <div className="flex justify-between items-center">
       <button
         type="button"
         className="bg-yellow-400 text-white py-2 px-4 rounded-md flex items-center hover:bg-yellow-700 transition-all duration-300"
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
