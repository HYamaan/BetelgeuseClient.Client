import { configureStore } from '@reduxjs/toolkit'
import shoppingBasketReducer from "@/redux/features/ShoppingBasket/shoppingBasketSlice";
export default configureStore({
    reducer: {
        shoppingBasket: shoppingBasketReducer
    }
});
