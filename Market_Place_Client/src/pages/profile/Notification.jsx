import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";
import { message } from "antd";
import { markAsReadNoti, notiDelete } from "../../apicalls/notification";

const Notification = ({ notifications, getNoti }) => {
  useEffect(() => {
    getNoti();
  }, [getNoti]);

  const markAsRead = async (id) => {
    try {
      const res = await markAsReadNoti(id);
      if (res.isSuccess) {
        message.success(res.message);
        getNoti();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const deleteNoti = async (id = null) => {
    let api;
    if (id) {
      api = notiDelete(id);
    } else {
      api = notiDelete();
    }
    try {
      const res = await api;
      if (res.isSuccess) {
        message.success(res.message);
        getNoti();
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <section className="mt-4">
      <div className="flex items-center my-2 gap-96">
        <h1 className="text-3xl font-medium text-blue-600">Notifications</h1>
        {notifications.length > 0 && (
          <p
            className="font-semibold cursor-pointer underline text-sm"
            onClick={() => deleteNoti()}
          >
            Delete All Notifications
          </p>
        )}
      </div>
      <div>
        {notifications && notifications.length > 0 ? (
          notifications.map((noti) => (
            <div
              key={noti._id}
              className={`${
                noti.isRead ? "bg-gray-200" : "bg-white"
              } my-4 px-2 py-1 rounded-md mr-4 max-w-3xl`}
            >
              <h4
                className={`text-xl font-medium my-2 ${
                  noti.isRead ? "text-gray-600" : ""
                }`}
              >
                {noti.title}
              </h4>
              <p className="text-base font-medium text-gray-600 mb-1">
                {noti.comment}
              </p>
              <p
                className={`font-medium ${noti.isRead ? "text-gray-600" : ""}`}
              >
                <span className="font-bold">Contact</span> -
                <span className="tracking-wide">{noti.phone_number}</span>
              </p>
              <div className="flex items-center justify-between flex-row-reverse mt-2">
                <p className="text-sm font-medium text-gray-500 text-right">
                  {formatDistanceToNow(new Date(noti.createdAt))}ago
                </p>
                <Link
                  to={`/products/${noti.product_id}`}
                  className={`font-medium cursor-pointer underline ${
                    noti.isRead ? "text-gray-600" : ""
                  }`}
                >
                  View comments
                </Link>
                {noti.isRead ? (
                  <p
                    className={`font-medium cursor-pointer underline ${
                      noti.isRead ? "text-gray-600" : ""
                    }`}
                    onClick={() => deleteNoti(noti._id)}
                  >
                    Delete Notification
                  </p>
                ) : (
                  <p
                    className="font-medium cursor-pointer underline"
                    onClick={() => markAsRead(noti._id)}
                  >
                    Mark as read
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-600 font-medium">
            No notification not found!!!
          </p>
        )}
      </div>
    </section>
  );
};

export default Notification;
