import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import {
  allproductReviewsReducer,
  deletereviewReducer,
  newProductReducer,
  newReviewReducer,
  productdetailsreducer,
  productReducer,
  productreducer,
} from "./Reducers/productreducer";
import { allUsersReducer, forgotPasswordReducer, otpreducer, profileReducer, timeelapsedreducer, userDetailsReducer, userreducer } from "./Reducers/userreducer";
import { cartreducer } from "./Reducers/cartreducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./Reducers/orderreducer";

const reducer = combineReducers({
  allproducts: productreducer,
  productDetails: productdetailsreducer,
  user: userreducer,
  otp:otpreducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartreducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  timeelapsed: timeelapsedreducer,
  
  // Admin
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: allproductReviewsReducer,
  review:deletereviewReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("Cart")
      ? JSON.parse(localStorage.getItem("Cart"))
      : [],
    shippingInfo: localStorage.getItem("ShippingInfo")
      ? JSON.parse(localStorage.getItem("ShippingInfo"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
