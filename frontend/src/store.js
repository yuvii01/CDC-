import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./reducers/CartSlice"
import UserReducer from "./reducers/UserReducer";
const store = configureStore(
    {
        reducer:{
            cart:CartReducer,
            user:UserReducer,
        }
    }
)

export default store;