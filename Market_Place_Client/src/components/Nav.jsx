import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { setUser } from "../store/slices/userSlice";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <nav className="bg-blue-500 flex items-center justify-between text-white p-4 sticky top-0 left-0 w-full z-10">
      <Link to={"/"} className="font-bold text-2xl">
        Trade{" "}
        <span className="text-blue-600 bg-white px-2 rounded-md">Hub</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/"}>Q&A</Link>
      </div>
      {user ? (
        <div className="flex items-center gap-2">
          <Link
            to={"/saved-products"}
            className="bg-white text-blue-600 px-2 py-1 flex items-center gap-1 rounded-md"
          >
            <BookmarkIcon width={20} />
          </Link>
          {user.role === "user" && (
            <Link
              to={"/profile"}
              className="bg-white text-blue-600 px-2 py-1 flex items-center gap-1 rounded-md"
            >
              <UserIcon width={20} />
              Profile
            </Link>
          )}
          {user.role === "admin" && (
            <Link
              to={"/admin"}
              className="bg-white text-blue-600 px-2 py-1 flex items-center gap-1 rounded-md"
            >
              <UserIcon width={20} />
              Admin Panel
            </Link>
          )}
          <div
            className="text-red-600 rounded-md bg-white flex items-center gap-1 px-2 py-1 cursor-pointer"
            onClick={() => {
              handleLogout();
            }}
          >
            <ArrowLeftEndOnRectangleIcon
              width={25}
              height={25}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 text-base font-medium ">
          <Link
            to={"/login"}
            className="bg-white text-blue-600 px-2 py-1 flex items-center gap-1 rounded-md"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="bg-white text-blue-600 px-2 py-1 flex items-center gap-1 rounded-md"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
