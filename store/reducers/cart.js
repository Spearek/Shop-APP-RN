import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from '../actions/orders';
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
                    items: { ...state.items, [addedProduct.id]: updatedCartItem },
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
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
                //need to reduce it
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
            } else {
                //erase it
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmmount: state.totalAmmount - selectedCartItem.productPrice
            }
        case ADD_ORDER:
            return initialState
    }
    return state
};
