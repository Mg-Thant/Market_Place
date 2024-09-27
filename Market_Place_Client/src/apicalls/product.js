import { axiosInstance } from "./axiosInstance";

// sell product
export const sellProduct = async (payload) => {
  try {
    const res = await axiosInstance.post("/create-product", payload, {
      validateStatus: () => true,
    });

    return res.data;
  } catch (err) {
    return err.message;
  }
};

// get products
export const getProducts = async () => {
  try {
    const res = await axiosInstance.get("/products", {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Get old data product
export const getOldDataProduct = async (id) => {
  try {
    const res = await axiosInstance.get(`/product/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Update Product
export const updateProduct = async (payload) => {
  try {
    const res = await axiosInstance.post("/update-product", payload, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Delete Product
export const deleteProduct = async (id) => {
  try {
    const res = await axiosInstance.delete(`/product/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Upload Image
export const UploadProductImages = async (payload) => {
  try {
    const res = await axiosInstance.post("/upload-image", payload, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Get product image
export const getProductImages = async (id) => {
  try {
    const res = await axiosInstance.get(`/product-images/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Delete product saved images
export const delSavedImages = async (payload) => {
  const { productId, imgUrl } = payload;
  const encodeImageToDelete = encodeURIComponent(imgUrl);
  try {
    const res = await axiosInstance.delete(
      `/product/images/destroy/${productId}/${encodeImageToDelete}`,
      {
        validateStatus: () => true,
      }
    );
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Saved Products
export const savedProducts = async (id) => {
  try {
    const res = await axiosInstance.post(`/saved-products/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Unsaved Products
export const unSavedProduct = async (id) => {
  try {
    const res = await axiosInstance.delete(`/unsaved-products/${id}`, {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};

// Get Saved Products
export const getSavedProducts = async () => {
  try {
    const res = await axiosInstance.get("/saved-product", {
      validateStatus: () => true,
    });
    return res.data;
  } catch (err) {
    return err.message;
  }
};
