import { configureStore } from '@reduxjs/toolkit'
import userLoginSlice from "./slices/userLoginSlice"
// import productChosenListSlice from "./slices/productChosenListSlice"

export default configureStore({
  reducer: {
    userLogin: userLoginSlice,
    // productChosenList: productChosenListSlice
  }
})