import React from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

const Notification = ({ notifications }) => {
  return (
    <section className="mt-4">
      <h1 className="text-3xl font-medium text-blue-600">Notifications</h1>
      <div>
        {notifications &&
          notifications.length > 0 &&
          notifications.map((noti) => (
            <div
              key={noti._id}
              className="bg-white my-4 px-2 py-1 rounded-md mr-4 max-w-3xl"
            >
              <h4 className="text-xl font-medium my-2">{noti.title}</h4>
              <p className="text-base font-medium text-gray-600 mb-1">
                {noti.comment}
              </p>
              <p className="font-medium">
                <span className="font-bold">Contact</span> -{" "}
                <span className="tracking-wide">{noti.phone_number}</span>
              </p>
              <div className="flex items-center justify-between flex-row-reverse mt-2">
                <p className="text-sm font-medium text-gray-500 text-right">
                  {formatDistanceToNow(new Date(noti.createdAt))}ago
                </p>
                <Link
                  to={`/products/${noti.product_id}`}
                  className="underline font-medium"
                >
                  View comments
                </Link>
              </div>
            </div>
          ))}
        {notifications.length === 0 && <p className="font-medium text-base text-red-600 my-7">Notification not found!!!</p>}
      </div>
    </section>
  );
};

export default Notification;
