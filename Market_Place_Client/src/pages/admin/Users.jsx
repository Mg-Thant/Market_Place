import { message } from "antd";
import React, { useEffect } from "react";
import { handleUserStatus } from "../../apicalls/admin";
import moment from "moment";

const Users = ({ users, getUsers }) => {
  
  useEffect(() => {
    getUsers();
  }, []);

  const handleBan = async (id, status) => {
    const handlePayload = {
      id,
      status,
    };
    try {
      const res = await handleUserStatus(handlePayload);
      if (res.isSuccess) {
        message.success("Users Banned");
        getUsers();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleUnban = async (id, status) => {
    const handlePayload = {
      id,
      status,
    };
    try {
      const res = await handleUserStatus(handlePayload);
      if (res.isSuccess) {
        message.success("User Unbaned!!!");
        getUsers();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">Users List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm rtl:text-right text-gray-500 text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              <>
                {users.map((user) => (
                  <tr
                    className="odd:bg-white even:bg-gray-50 border-b"
                    key={user._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {user.username}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.role === "admin" ? (
                        <span className="text-blue-600 font-medium text-sm italic">
                          {user.role}
                        </span>
                      ) : (
                        <span className="text-green-600">{user.role}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.status === "ban" ? (
                        <span className="bg-red-600 text-white text-sm font-semibold p-1 rounded-md">
                          {user.status}
                        </span>
                      ) : (
                        <span className="bg-green-700 text-white text-sm font-semibold p-1 rounded-md">
                          {user.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {moment(user.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {false ? (
                        <div className="w-fit h-fit mx-auto">
                          <BeatLoader
                            color={"#0000ff"}
                            loading={loading}
                            size={7}
                            speedMultiplier={1}
                          />
                        </div>
                      ) : (
                        <>
                          {user.status === "active" ? (
                            <button
                              type="button"
                              className="font-medium bg-red-600 text-white py-1 px-2 me-2 rounded-md hover:underline"
                              onClick={() => {
                                handleBan(user._id, "ban");
                              }}
                            >
                              Ban
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="font-medium bg-green-700 text-white py-1 px-2 me-2 rounded-md hover:underline"
                              onClick={() => {
                                handleUnban(user._id, "unban");
                              }}
                            >
                              Unban
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4">
                  No users added to sell list!!!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
