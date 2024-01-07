import React from "react";
import styles from "../styles/styles";
import { navItems } from "../static/data";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/user";
import toast from "react-hot-toast";

const Header = ({ activeHeading }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    dispatch(logout());
    toast.success("logout Successful!", { duration: 2000 });
  }

  return (
    <div className="flex items-center justify-between w-full bg-[#2D6F6D] h-[70px]">
      <div
        className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
      >
        {/* Left-aligned links */}
        <div className={`${styles.noramlFlex}`}>
          {navItems.slice(0, 3).map((item, index) => (
            <div className="flex" key={index}>
              <Link
                to={item.url}
                className={`${
                  activeHeading === index + 1 ? "text-black" : " text-[#fff]"
                }  pb-0 font-[500] px-6 cursor-pointer}`}
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>

        {/* Right-aligned user-related content */}
        <div className={`${styles.noramlFlex} items-center`}>
          {user ? (
            <>
              <span className="text-[#fff] pb-0 font-[500] px-6">
                Welcome&nbsp;{user.name.split(" ")[0]}{" "}
                {/* Display the user's name */}
              </span>
              <button
                onClick={handleLogout}
                className="text-[#fff] pb-0 font-[500] px-6 cursor-pointer bg-transparent border border-white rounded-md hover:bg-white hover:text-[#2D6F6D] transition duration-300"
              >
                Logout 
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${
                  activeHeading === 4 ? "text-black" : " text-[#fff]"
                }  pb-0 font-[500] px-6 cursor-pointer}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`${
                  activeHeading === 5 ? "text-black" : " text-[#fff]"
                }  pb-0 font-[500] px-6 cursor-pointer}`}
              >
                Register
              </Link>
            </> 
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;