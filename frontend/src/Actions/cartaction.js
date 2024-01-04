import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../Constants/cartconstants";

export const addItemsToCart = (id, quantity) => async (dispatch,getstate) => {
  const {data} = await axios.get(`/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      productid: data.product._id,
      name: data.product.Name,
      price: data.product.Price,
      image: data.product.Images[0].url,
      stock: data.product.Stock,
      quantity,
    }
  });
  
  localStorage.setItem('Cart',JSON.stringify(getstate().cart.cartItems))

};

export const removeItemsFromCart = (id)=>async (dispatch,getstate)=>{
  dispatch({
    type:REMOVE_CART_ITEM,
    payload:id
  })
  localStorage.setItem('Cart',JSON.stringify(getstate().cart.cartItems))
}

export const saveShippingInfo = (data)=>async(dispatch)=>{
  dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data,
  })
  localStorage.setItem('ShippingInfo',JSON.stringify(data))
}