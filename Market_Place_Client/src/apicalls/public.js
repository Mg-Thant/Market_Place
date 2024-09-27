import { axiosInstance } from "./axiosInstance";

// get Products
export const getProducts = async (page, perPage) => {
  try {
    const res = await axiosInstance.get(
      `/api/products?page=${page}&perPage=${perPage}`,
      {
        validateStatus: () => true,
      }
    );
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// get Product details
export const getProductDetails = async (id) => {
  try {
    const res = await axiosInstance.get(`/api/product/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// get products by filter (search)
export const getProductsByFilter = async (key, value) => {
  try {
    const res = await axiosInstance.get(
      `/api/products/filter?${key}=${value}`,
      {
        validateStatus: () => true,
      }
    );
    return res.data;
  } catch (err) {
    return err.message;
  }
};
