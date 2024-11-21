import React, { useState } from "react";
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";
import {
  developmentLanguages,
  initialQuestionData,
  qaFormControls,
  Categories,
  SampleQuestionData,
} from "../config/data.js";
import QuestionCard from "./components/QuestionCard";
import SearchBar from "./components/SearchBar.jsx";

const AskQuestion = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialQuestionData);
  const [questions, setQuestions] = useState(SampleQuestionData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: e.target.files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      attachments: Array.from(formData.attachments || []),
    };

    setQuestions([...questions, newQuestion]);
    setFormData(initialQuestionData);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col mx-auto px-4 py-16">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Ask a Question</h1>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg py-2 px-4 rounded-md shadow-md">
            All Questions
          </h3>
          <SearchBar />
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> Add Question
          </button>
        </div>
      </section>

      <div className="mt-6 space-y-6">
        {questions.map((question, index) => (
          <QuestionCard
            setShowModal={setShowModal}
            key={index}
            question={question}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold">Submit Your Question</h2>
              <button onClick={handleCloseModal}>
                <FaTimes className="text-xl text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {qaFormControls.map((control) => (
                <div key={control.name}>
                  <label
                    htmlFor={control.name}
                    className="block text-lg font-medium mb-2"
                  >
                    {control.label}
                  </label>
                  {control.componentType === "input" && (
                    <input
                      type={control.type}
                      name={control.name}
                      id={control.name}
                      placeholder={control.placeholder}
                      value={formData[control.name]}
                      onChange={handleInputChange}
                      required={control.required}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                  {control.componentType === "textarea" && (
                    <textarea
                      name={control.name}
                      id={control.name}
                      placeholder={control.placeholder}
                      value={formData[control.name]}
                      onChange={handleInputChange}
                      required={control.required}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                  {control.componentType === "file" && (
                    <input
                      type={control.type}
                      name={control.name}
                      id={control.name}
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                  {control.componentType === "input" &&
                    control.name === "category" && (
                      <select
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="" disabled>
                          Select category
                        </option>
                        {Categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    )}
                  {control.componentType === "input" &&
                    control.name === "tags" && (
                      <select
                        name="tags"
                        id="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="" disabled>
                          Select tags
                        </option>
                        {developmentLanguages.map((language) => (
                          <option key={language.id} value={language.id}>
                            {language.label}
                          </option>
                        ))}
                      </select>
                    )}
                </div>
              ))}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
                >
                  <FaSave className="mr-2" /> Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskQuestion;
