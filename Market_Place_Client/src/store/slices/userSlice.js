import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isSavedProduct: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addSavedProduct: (state, action) => {
      state.isSavedProduct.push(action.payload);
    },
    removeSavedProduct: (state, action) => {
      state.isSavedProduct = state.isSavedProduct.filter(
        (productId) => productId !== action.payload
      );
    }
  },
});

export const {
  setUser,
  setLoading,
  setError,
  addSavedProduct,
  removeSavedProduct,
} = userSlice.actions;

export default userSlice.reducer;
