import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductState } from "../types";

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

export const fetchProducts = createAsyncThunk<Product[]>(
  "/products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await new Promise<Product[]>((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: "Adidas", price: 3000.0 },
            { id: 2, name: "Nike", price: 3700.0 },
          ]);
        }, 1000);
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export default productSlice.reducer;
