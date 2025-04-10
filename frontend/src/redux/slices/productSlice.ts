import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../types";
import { fetchProductsAPI } from "../apis/productAPI";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
      state.products = [];
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.products = [];
    });
  },
});

export const fetchProducts = createAsyncThunk<Product[], string>(
  "/products/fetchProducts",
  async (queryString, thunkAPI) => {
    try {
      const response = await fetchProductsAPI(queryString);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export default productSlice.reducer;
