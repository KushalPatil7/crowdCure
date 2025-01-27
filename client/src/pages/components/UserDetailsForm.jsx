import { Categories, developmentLanguages } from "@/config/data";
import Select from "react-select";
import { useState } from "react";


const UserDetailsForm = () => {
    

const [categoryOptions] = useState(
  Categories.map((category) => ({
    value: category.id,
    label: category.label,
  }))
);
const [tagOptions] = useState(
  developmentLanguages.map((lang) => ({ value: lang.id, label: lang.label }))
);
  return (
    <div
      //  className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between px-6 py-12 max-w-7xl mx-auto"
      className="  m-4 "
    >
      <form action="">
        {/* Username */}
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md  mb-6 "
        />
        {/* User email */}
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded-md mb-6"
        />
        {/* Skills */}
        <label htmlFor="Skills" className="block text-sm font-medium mb-2">
          Skills
        </label>
        {/* Select for designation */}

        <Select options={categoryOptions} isMulti isClearable />

        {/* Designation */}
        <label htmlFor="Designation" className="block text-sm font-medium mb-2">
          Designation
        </label>
        {/* Select for designation */}
        <Select options={tagOptions} isMulti isClearable />
        {/* Highest  Qualification */}
        <label
          htmlFor="Qualification"
          className="block text-sm font-medium mb-2"
        >
          Highest Qualification
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-6"
        />
        {/* Organization   */}
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Organization
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </form>
    </div>
  );
};

export default UserDetailsForm;
