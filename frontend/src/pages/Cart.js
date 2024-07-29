// import React, { useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';

// const Cart = () => {

// const ADD_CART_ITEM = 'ADD_CART_ITEM';
// const GET_CART_ITEMS = 'GET_CART_ITEMS';
// const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
// const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

// const addCartItem = (cartId, menuItemId, quantity, token) => async (dispatch) => {
//     try {
//         const response = await axios.post('/cart-items', { cartId, menuItemId, quantity }, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         dispatch({ type: ADD_CART_ITEM, payload: response.data });
//     } catch (error) {
//         console.error(error);
//     }
// };

// const getCartItems = (userId, token) => async (dispatch) => {
//     try {
//         const response = await axios.get(`/carts/${userId}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         dispatch({ type: GET_CART_ITEMS, payload: response.data });
//     } catch (error) {
//         console.error(error);
//     }
// };

// const updateCartItem = (id, quantity, token) => async (dispatch) => {
//     try {
//         const response = await axios.put(`/cart-items/${id}`, { quantity }, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         dispatch({ type: UPDATE_CART_ITEM, payload: response.data });
//     } catch (error) {
//         console.error(error);
//     }
// };

// const removeCartItem = (id, token) => async (dispatch) => {
//     try {
//         const response = await axios.delete(`/cart-items/${id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         dispatch({ type: REMOVE_CART_ITEM, payload: response.data });
//     } catch (error) {
//         console.error(error);
//     }
// };


//     const dispatch = useDispatch();
//     const cartItems = useSelector(state => state.cart.items);
//     const token = 'YOUR_TOKEN_HERE'; 

//     useEffect(() => {
//         const userId = 'USER_ID_HERE'; 
//         dispatch(getCartItems(userId, token));
//     }, [dispatch, token]);

//     const handleAddToCart = (cartId, menuItemId, quantity) => {
//         dispatch(addCartItem(cartId, menuItemId, quantity, token));
//     };

//     const handleUpdateCartItem = (id, quantity) => {
//         dispatch(updateCartItem(id, quantity, token));
//     };

//     const handleRemoveCartItem = (id) => {
//         dispatch(removeCartItem(id, token));
//     };

//     return (
//         <div>
//             <h1>Your Cart</h1>
//             {cartItems.map(item => (
//                 <div key={item.id}>
//                     <h2>{item.name}</h2>
//                     <p>Quantity: {item.quantity}</p>
//                     <button onClick={() => handleUpdateCartItem(item.id, newQuantity)}>Update</button>
//                     <button onClick={() => handleRemoveCartItem(item.id)}>Remove</button>
//                 </div>
//             ))}
//             <button onClick={() => handleAddToCart(cartId, menuItemId, quantity)}>Add to Cart</button>
//         </div>
//     );
// };


// export default Cart