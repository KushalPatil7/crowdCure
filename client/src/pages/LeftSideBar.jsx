import { NavbarMenu } from "@/config/data";
import { Link } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { TbLogin } from "react-icons/tb";

const LeftSideBar = () => {
  return (
    <div className="flex flex-col justify-between h-full p-4 w-64 bg-white shadow-lg">
      {/* Navbar Menu */}
      <div className="flex flex-col gap-8 items-start overflow-auto mt-4">
        {NavbarMenu.map((item) => (
          <Link
            to={item.link}
            className="relative group flex items-center font-semibold text-gray-700  hover:text-blue-500 gap-4 rounded-3xl w-full p-2 transition-all duration-200 ease-in-out"
            key={item.title}
          >
            {/* Tooltip */}
            <div
              id={`tooltip-${item.title}`}
              role="tooltip"
              className="absolute -left-2 bottom-8 transform -translate-y-1/2 text-sm  text-blue-500 rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:hidden"
            >
              {item.title}
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            {/* Icon size adjusted */}
            <item.icon className="text-2xl" />
            <p className="hidden lg:block">{item.title}</p>
          </Link>
        ))}
      </div>

      {/* Authentication Links */}
      <div className="flex flex-col gap-6 p-2 mt-auto">
        <Link to="/#">
          <button className="relative group flex items-center font-semibold text-gray-700 hover:text-blue-500 gap-4 rounded-3xl w-full p-2 transition-all duration-200 ease-in-out">
            {/* Tooltip */}
            <div
              id="tooltip-signin"
              role="tooltip"
              className="absolute -left-2 bottom-8 transform -translate-y-1/2 text-sm text-blue-500  rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:hidden"
            >
              Sign In
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <PiSignInBold className="text-2xl" />
            <span className="hidden lg:block">Sign In</span>
          </button>
        </Link>
        <Link to="/#">
          <button className="relative group flex items-center font-semibold text-gray-700 hover:text-blue-500 gap-4 rounded-3xl w-full p-2 transition-all duration-200 ease-in-out">
            {/* Tooltip */}
            <div
              id="tooltip-signup"
              role="tooltip"
              className="absolute -left-2 bottom-8 transform -translate-y-1/2 text-sm text-blue-500 rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:hidden"
            >
              Sign Up
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <TbLogin className="text-2xl" />
            <span className="hidden lg:block">Sign Up</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;
