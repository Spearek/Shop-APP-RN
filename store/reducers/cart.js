import { ADD_TO_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';


const initialState = {
    items: {},
    totalAmmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            if (state.items[addedProduct.id]) {
                //already hane the item in the cart
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                );
                return {
                    ...state,
                    items: {...state.items, [addedProduct.id]: updatedCartItem},
                    totalAmmount: state.totalAmmount + productPrice
                }
            } else {
                const newCartItem = new CartItem(1, productPrice, productTitle, productPrice);
                return {
                    ...state,
                    items: {
                        ...state.items, [addedProduct.id]: newCartItem
                    },
                    totalAmmount: state.totalAmmount + productPrice
                }
            }
    }
    return state
};
