import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../../store/slices/userSlice";
import { PowerIcon } from "@heroicons/react/24/solid";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, username, role } = useSelector(
    (state) => state.reducer.user.user
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <section className="mr-4">
      <div className="flex items-end justify-between mb-4">
        <h1 className=" text-3xl font-semibold my-2">
          {role === "user" ? "User Profile" : "Admin Profile"}
        </h1>
        <button
          type="button"
          className=" text-white bg-red-500 font-medium px-3 py-2 rounded-md flex gap-2 items-center"
          onClick={logoutHandler}
        >
          <PowerIcon className="w-5 h-5" /> logout
        </button>
      </div>
      <div className="flex items-center justify-between border-b border-blue-200 font-medium mb-3">
        <p className="font-semibold">Email</p>
        <p>{email}</p>
      </div>
      <div className="flex items-center justify-between border-b border-blue-200 font-medium mb-3">
        <p className="font-semibold">Username</p>
        <p>{username}</p>
      </div>
      <div className="flex items-center justify-between border-b border-blue-200 font-medium mb-3">
        <p className="font-semibold">Role</p>
        <p>{role}</p>
      </div>
    </section>
  );
};

export default General;
