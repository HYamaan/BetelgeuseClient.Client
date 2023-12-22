import { createSlice,current } from '@reduxjs/toolkit'
const initialState={
        totalQuantity: 0,
        Price :{totalPrice:0, discountPrice:0},
        shoppingBasketValue:[]
};
export const shoppingBasketSlice = createSlice({
    name: 'shoppingBasket',
    initialState,
    reducers: {
        addToBasket: (state,action) => {
            state.totalQuantity += 1;
            const guidToCheck = action.payload.guid;
            const existingItemIndex = state.shoppingBasketValue.findIndex(item => item.guid === guidToCheck);
            if (existingItemIndex === -1) {
                state.shoppingBasketValue.push(action.payload);

                state.Price = state.Price || {};

                const discountedPrice = parseInt(action.payload.discountedPrice) || 0;
                const price = parseInt(action.payload.price) || 0;

                state.Price.discountPrice = (state.Price.discountPrice || 0) + discountedPrice;
                state.Price.totalPrice = (state.Price.totalPrice || 0) + price;
            }
            console.log("ShoppingBasket",current(state.shoppingBasketValue))
        },
        removeToBasket: (state, action) => {
            if (action.payload && action.payload.guid) {
                const guidToRemove = action.payload.guid;
                const itemToRemove = state.shoppingBasketValue.find(item => item.guid === guidToRemove);

                if (itemToRemove) {
                    state.Price.discountPrice -= parseInt(itemToRemove.discountedPrice) || 0;
                    state.Price.totalPrice -= parseInt(itemToRemove.price) || 0;
                    state.shoppingBasketValue = state.shoppingBasketValue.filter(item => item.guid !== guidToRemove);
                }
            }

            state.totalQuantity -= 1;
            // console.log("decrement", current(state));
        },

        incrementByAmount: (state, action) => {
            state.totalQuantity += action.payload
        }
    }
})

export const { addToBasket, removeToBasket, incrementByAmount } = shoppingBasketSlice.actions

export default shoppingBasketSlice.reducer
