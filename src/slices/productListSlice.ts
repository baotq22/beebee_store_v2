import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../axios-instance";

export const addProductItem = createAsyncThunk(
    "productList/addProduct",
    async (data) => {
      const res = await api.post("/product", {
        productName: data.productName,
        price: data.price,
        image: data.image,
        quantity: data.quantity,
        ratingPoint: data.ratingPoint,
        discount: data.discount,
        special: data.special,
        description: data.description,
        soldQuantity: data.soldQuantity,
        createDate: data.createDate,
      });
    }
);

export const editProductItem = createAsyncThunk(
    "productList/editProduct",
    async (data) => {
      const res = await api.put(`/product/${data.productId}`, {
        productName: data.productName,
        price: data.price,
        image: data.image,
        quantity: data.quantity,
        ratingPoint: data.ratingPoint,
        discount: data.discount,
        special: data.special,
        description: data.description,
        soldQuantity: data.soldQuantity,
        createDate: data.createDate,
      });
    }
);

export const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        value: [],
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(addProductItem.fulfilled, (state, action) => {
                state.value.push(action.payload);
            })
            .addCase(editProductItem.fulfilled, (state, action) => {
              const updatedProduct = action.payload;
              const index = state.value.findIndex(product => product.id === updatedProduct.id);
              if (index !== -1) {
                  state.value[index] = updatedProduct;
              }
          })
    }
})