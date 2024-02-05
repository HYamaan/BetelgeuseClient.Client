import {configureStore} from '@reduxjs/toolkit'
import shoppingBasketReducer from "@/redux/features/ShoppingBasket/shoppingBasketSlice";
import authTokenReducer from "@/redux/features/AuthToken/authTokenSlice";

export default configureStore({
    reducer: {
        shoppingBasket: shoppingBasketReducer,
        authToken: authTokenReducer
    }
});
