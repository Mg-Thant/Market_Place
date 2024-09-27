import React from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const SavedComments = ({ comment }) => {
  return (
    <>
      <h1>Recent Comments</h1>
      <div className="mb-2 bg-white px-2 py-4 rounded-lg rounded-bl-none w-96">
        <h1 className="font-medium text-base">{comment.bider_id.username}</h1>
        <p className="text-gray-600 text-sm font-medium">{comment.comment}</p>
        <p className="text-xs text-gray-400 text-right">{formatDistanceToNow(new Date(comment.createdAt))} ago</p>
      </div>
    </>
  );
};

export default SavedComments;
