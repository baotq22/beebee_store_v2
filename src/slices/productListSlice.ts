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
      console.log(res)
    }
);

// export const editProductItem = createAsyncThunk(
//     "productList/editProduct",
//     async (data) => {
//       const response = await api.put("/product", {
//         productName: data.productName,
//         price: data.price,
//         image: data.image,
//         quantity: data.quantity,
//         ratingPoint: data.ratingPoint,
//         discount: data.discount,
//         special: data.special,
//         description: data.description,
//         soldQuantity: data.soldQuantity,
//         createDate: data.createDate,
//       });
//       console.log(response.data)
//       return response.data;
//     }
// );

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
    }
})