import { NavbarMenu } from "@/config/data";
import { Link } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { TbLogin } from "react-icons/tb";

const LeftSideBar = () => {
  return (
    <div className="flex flex-col justify-between h-full p-4 w-64 bg-white shadow-lg">
      <div className="flex flex-col mt-10 gap-8 items-start overflow-auto">
        {NavbarMenu.map((item) => (
          <Link
            to={item.link}
            className="flex items-center font-semibold text-gray-700 hover:text-blue-500 gap-4 rounded-3xl w-full p-2 transition-all duration-200 ease-in-out hover:bg-gray-200"
            key={item.title}
          >
            {/* Show icon on all screen sizes, text only on large screens */}
            <item.icon className="size-6" />
            <p className="hidden lg:block">{item.title}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-6 p-2 mt-auto">
        <Link to="/#">
          <button className="flex items-center font-semibold text-gray-700 hover:text-blue-500 gap-4 rounded-3xl w-full p-2 transition-all duration-200 ease-in-out hover:bg-gray-200">
            <PiSignInBold className="size-6" />
            <span className="hidden lg:block">Sign In</span>
          </button>
        </Link>
        <Link to="/#">
          <button className="flex items-center font-semibold text-gray-700 hover:text-blue-500 gap-4 rounded-3xl w-full p-2 transition-all duration-200 ease-in-out hover:bg-gray-200">
            <TbLogin className="size-6" />
            <span className="hidden lg:block">Sign Up</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBar;
