import { axiosInstance } from "./axiosInstance";

export const getProducts = async (page, perPage) => {
  try {
    const res = await axiosInstance.get(
      `/admin/products?page=${page}&perPage=${perPage}`,
      {
        validateStatus: () => true,
      }
    );
    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const approveProduct = async (payload) => {
  const { id } = payload;
  try {
    const res = await axiosInstance.post(
      `/admin/product-approve/${id}`,
      payload,
      {
        validateStatus: () => true,
      }
    );
    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const rejectProduct = async (payload) => {
  const { id } = payload;
  try {
    const res = await axiosInstance.post(
      `/admin/product-reject/${id}`,
      payload,
      {
        validateStatus: () => true,
      }
    );
    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const rollBackProduct = async (payload) => {
  const { id } = payload;
  try {
    const res = await axiosInstance.post(
      `/admin/product-rollBack/${id}`,
      payload,
      {
        validateStatus: () => true,
      }
    );
    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const getAllUser = async () => {
  try {
    const res = await axiosInstance.get("/admin/users", {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const handleUserStatus = async (payload) => {
  const { id, status } = payload;

  let url =
    status === "unban" ? `/admin/unban-user/${id}` : `/admin/ban-user/${id}`;
  try {
    const res = await axiosInstance.post(url, payload, {
      validateStatus: () => true,
    });
    console.log(url);
    return res.data;
  } catch (err) {
    return err.message;
  }
};
