import { useEffect, useState } from "react";
import "./App.css";
import {Route, Switch } from "react-router-dom";
import { loaduseraction } from "./Actions/useraction";
import { useDispatch, useSelector } from "react-redux";
import loadable from 'react-loadable'

const ProtectedRoute = loadable({
  loader: ()=> import("./ProtectedRoute"),
  loading: ()=> <div></div>
})
const Header = loadable({
  loader: ()=> import("./Components/Layout/Header/Header"),
  loading: ()=> <div></div>
})
const Footer = loadable({
  loader: ()=> import("./Components/Layout/Footer/Footer"),
  loading: ()=> <div></div>
})
const UserOptions = loadable({
  loader: ()=> import("./Components/Layout/Header/UserOptions"),
  loading: ()=> <div></div>
})
const UserOptions2 = loadable({
  loader: ()=> import("./Components/Layout/Header/UserOptions2"),
  loading: ()=> <div></div>
})
const Home = loadable({
  loader: ()=> import("./Components/Home/Home"),
  loading: ()=> <div></div>
})
const ProductDetails = loadable({
  loader: ()=> import("./Components/Product/ProductDetails"),
  loading: ()=> <div></div>
})
const Products = loadable({
  loader: ()=> import("./Components/Product/Products"),
  loading: ()=> <div></div>
})
const Login_Register = loadable({
  loader: ()=> import("./Components/User/Login_Register"),
  loading: ()=> <div></div>
})
const Error404 = loadable({
  loader: ()=> import("./Components/Layout/404/Error404"),
  loading: ()=> <div></div>
})
const Cart = loadable({
  loader: ()=> import("./Components/Cart/Cart"),
  loading: ()=> <div></div>
})
const MyOrders = loadable({
  loader: ()=> import("./Components/Order/MyOrders"),
  loading: ()=> <div></div>
})
const OrderDetails = loadable({
  loader: ()=> import("./Components/Order/MyOrders"),
  loading: ()=> <div></div>
})
const Shipping = loadable({
  loader: ()=> import("./Components/Cart/Shipping"),
  loading: ()=> <div></div>
})
const ConfirmOrder = loadable({
  loader: ()=> import("./Components/Cart/ConfirmOrder"),
  loading: ()=> <div></div>
})
const Payment = loadable({
  loader: ()=> import("./Components/Cart/Payment"),
  loading: ()=> <div></div>
})
const Dashboard = loadable({
  loader: ()=> import("./Components/Admin/Dashboard"),
  loading: ()=> <div></div>
})
const ProductList = loadable({
  loader: ()=> import("./Components/Admin/ProductList"),
  loading: ()=> <div></div>
})
const OrderList = loadable({
  loader: ()=> import("./Components/Admin/OrderList"),
  loading: ()=> <div></div>
})
const UsersList = loadable({
  loader: ()=> import("./Components/Admin/UsersList"),
  loading: ()=> <div></div>
})
const UpdateUser = loadable({
  loader: ()=> import("./Components/Admin/UpdateUser"),
  loading: ()=> <div></div>
})
const NewProduct = loadable({
  loader: ()=> import("./Components/Admin/NewProduct"),
  loading: ()=> <div></div>
})
const UpdateProduct = loadable({
  loader: ()=> import("./Components/Admin/UpdateProduct"),
  loading: ()=> <div></div>
})
const ProductReviews = loadable({
  loader: ()=> import("./Components/Admin/ProductReviews"),
  loading: ()=> <div></div>
})
const Profile = loadable({
  loader: ()=> import("./Components/User/Profile"),
  loading: ()=> <div></div>
})
const UpdateProfile = loadable({
  loader: ()=> import("./Components/User/UpdateProfile"),
  loading: ()=> <div></div>
})
const UpdatePassword = loadable({
  loader: ()=> import("./Components/User/UpdatePassword"),
  loading: ()=> <div></div>
})
const About = loadable({
  loader: ()=> import("./Components/Layout/About/About"),
  loading: ()=> <div></div>
})
const Contact = loadable({
  loader: ()=> import("./Components/Layout/Contact/Contact"),
  loading: ()=> <div></div>
})
const ForgotPassword = loadable({
  loader: ()=> import("./Components/User/ForgotPassword"),
  loading: ()=> <div></div>
})
const ResetPassword = loadable({
  loader: ()=> import("./Components/User/ResetPassword"),
  loading: ()=> <div></div>
})




const App = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loaduseraction());
  }, [dispatch]);

  const [show, setshow] = useState()
  useEffect(() => {
    if(window.location.pathname !== '/login'){
        setshow(true)
    }else{
        setshow(false)
    }
  }, [])
  

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {!isAuthenticated && show && <UserOptions2/>}
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />

          <Route exact path="/login" component={Login_Register} />
          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
          <Route exact path="/reset/:token" component={ResetPassword} />
          {!isAuthenticated && <Route exact path="/password/forgot" component={ForgotPassword} /> }
          
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
          <ProtectedRoute exact path="/process/payment" component={Payment} />

          <ProtectedRoute exact path="/orders" component={MyOrders} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />



          <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />

          <ProtectedRoute isAdmin={true} exact path='/admin/products' component={ProductList} />
          <ProtectedRoute isAdmin={true} exact path='/admin/product/new' component={NewProduct} />
          <ProtectedRoute isAdmin={true} exact path='/admin/product/:id' component={UpdateProduct} />

          <ProtectedRoute isAdmin={true} exact path='/admin/orders' component={OrderList} />

          <ProtectedRoute isAdmin={true} exact path='/admin/users' component={UsersList} />
          <ProtectedRoute isAdmin={true} exact path='/admin/user/:id' component={UpdateUser} />

          <ProtectedRoute isAdmin={true} exact path='/admin/reviews' component={ProductReviews} />

          <Route exact component={Error404} />
        </Switch>
      <Footer />
    </>
  );
};

export default App;
