import React, { useState } from "react";
import { FaPlus, FaSave, FaTimes } from "react-icons/fa";
import Select from "react-select";
import {
  developmentLanguages,
  initialQuestionData,
  qaFormControls,
  Categories,
  SampleQuestionData,
} from "../config/data.js";
import QuestionCard from "./components/QuestionCard.jsx";
import SearchBar from "./components/SearchBar.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";

const QuestionContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialQuestionData);
  const [questions, setQuestions] = useState(SampleQuestionData);
  const [categoryOptions] = useState(
    Categories.map((category) => ({
      value: category.id,
      label: category.label,
    }))
  );
  const [tagOptions] = useState(
    developmentLanguages.map((lang) => ({ value: lang.id, label: lang.label }))
  );

  // Handle input changes (including multi-select)
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value, // For multi-select, this will be an array of selected options
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: e.target.files,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      ...formData,
      tags: formData.tags.map((tag) => tag.value), // Ensure we map tags to their 'value' fields
      category: formData.category.map((cat) => cat.value), // Ensure we map categories to their 'value' fields
      attachments: Array.from(formData.attachments || []),
    };

    // Add new question to the list and reset the form
    setQuestions([...questions, newQuestion]);
    setFormData(initialQuestionData); // Reset to initial form state
    setShowModal(false); // Close the modal after submission
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData(initialQuestionData); // Reset the form when closing
  };

  return (
    <div className="flex flex-col mx-auto px-4 py-16 max-w-4xl">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Ask a Question</h1>
        <div className="flex justify-between items-center">
          <button className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700">
            All Questions
          </button>
          <SearchBar />
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 flex items-center"
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
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <ScrollArea className="h-[90vh] p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Submit Your Question</h2>
                <button onClick={handleCloseModal}>
                  <FaTimes className="text-xl text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {qaFormControls.map((control) => {
                  if (control.name === "category" || control.name === "tags") {
                    return (
                      <div key={control.name} className="mb-4">
                        <label
                          htmlFor={control.name}
                          className="block text-sm font-medium mb-2"
                        >
                          {control.label}
                        </label>
                        <Select
                          options={
                            control.name === "category"
                              ? categoryOptions
                              : tagOptions
                          }
                          value={formData[control.name]} // Multi-select value
                          onChange={(selectedOptions) =>
                            handleInputChange(control.name, selectedOptions)
                          }
                          placeholder={control.placeholder}
                          isMulti
                          isClearable
                          className="mt-2"
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={control.name} className="mb-4">
                      <label
                        htmlFor={control.name}
                        className="block text-sm font-medium mb-2"
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
                          onChange={(e) =>
                            handleInputChange(control.name, e.target.value)
                          }
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
                          onChange={(e) =>
                            handleInputChange(control.name, e.target.value)
                          }
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
                    </div>
                  );
                })}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
                  >
                    <FaSave className="mr-2" /> Save Question
                  </button>
                </div>
              </form>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;
