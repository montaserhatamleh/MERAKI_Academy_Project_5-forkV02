

// reducers/cartReducer.js
import { ADD_CART_ITEM, GET_CART_ITEMS, UPDATE_CART_ITEM, REMOVE_CART_ITEM } from '../actions/cartActions';

const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_ITEMS:
            return { ...state, items: action.payload.cart };
        case ADD_CART_ITEM:
        case UPDATE_CART_ITEM:
            return { ...state }; 
        case REMOVE_CART_ITEM:
            return { ...state }; 
        default:
            return state;
    }
};





 //</BrowserRouter>  <Route path="/cart" component={Cart} />
       