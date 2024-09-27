import { axiosInstance } from "./axiosInstance";

// add new noti
export const notify = async (payload) => {
  try {
    const res = await axiosInstance.post(`/notify`, payload, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Get All Noti
export const getAllNoti = async () => {
  try {
    const res = await axiosInstance.get("/notifications", {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Mark as read
export const markAsReadNoti = async (id) => {
  try {
    const res = await axiosInstance.get(`/notifications-read/${id}`, {
      validateStatus: () => true,
    });

    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Delete One
export const notiDelete = async (id = null) => {
  let api;
  if (id) {
    api = `/notifications-delOne/${id}`;
  } else {
    api = `/notifications-delAll`;
  }
  try {
    const res = await axiosInstance.delete(api, {
      validateStatus: () => true,
    });

    return res.data;
  } catch (err) {
    return err.message;
  }
};
