import { axiosInstance } from "./axiosInstance";

// add new comment
export const savedNewComment = async (payload) => {
  try {
    const res = await axiosInstance.post("/add-comment", payload, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// get all comment
export const getAllComment = async (id) => {
  try {
    const res = await axiosInstance.get(`/comments/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};
