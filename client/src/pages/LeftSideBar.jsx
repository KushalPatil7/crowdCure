
import { PiSignInBold } from "react-icons/pi";
import { TbLogin } from "react-icons/tb";
import { Link } from "react-router-dom";
import { SideBarMenu } from "../config/data.js"; 

const LeftSidebar = () => {
  const userId = null; 
  return (
    <div className="  sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto shadow-lg p-6 pt-32 max-sm:hidden lg:w-[174px] bg-light-800">
      <div className="flex flex-1 flex-col gap-6">
        {SideBarMenu.map((item) => {
          return (
            <Link
              to={item.link} 
              key={item.id} 
              className="text-light-500 hover:text-blue-300"
            >
              {item.title} 
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        <Link to="/sign-in">
          <button className= "  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <PiSignInBold className="lg:hidden size-7" />
            <span className="primary-text-gradient max-lg:hidden">Sign In</span>
          </button>
        </Link>
        <Link to="/sign-up">
          <button className="  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <TbLogin className="lg:hidden size-7" />
            <span className="primary-text-gradient max-lg:hidden">Sign Up</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
