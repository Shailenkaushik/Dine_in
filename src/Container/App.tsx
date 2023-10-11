
import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "../Components/Layout";
import { AccessDenied, AuthenticationTest, AuthenticationTestAdmin, Home, Login, NotFound, Register } from "../Pages";
import MenuItemDetail from "../Pages/MenuItemDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import ShoppingCart from "../Pages/ShoppingCart";
import { userModel } from "../Interfaces";
import jwtDecode from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { RootState } from "../Storage/Redux/store";
function App() {
  const userData:userModel=useSelector((state:RootState)=>state.userAuthStore);
  const dispatch=useDispatch();
  const {data,isLoading}=useGetShoppingCartQuery(userData.id);
  useEffect(()=>{
    const localToken=localStorage.getItem("token");
    if(localToken){
      const {fullName,id,email,role}: userModel=jwtDecode(localToken);
      dispatch(setLoggedInUser({fullName,id,email,role}));
    }
  },[]);
   
  useEffect(()=>{
    if(!isLoading){
      console.log(data.result?.cartItems);
      dispatch(setShoppingCart(data.result?.cartItems))
    }
  },[data]);

  return (
    

   <>
   <Header></Header>
   <div>
   <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/MenuItemDetails/:menuItemId" element={<MenuItemDetail/>}/>
     <Route path="/shoppingcart" element={<ShoppingCart/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authenticationtestadmin"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/accessDenied" element={<AccessDenied />} />
     <Route path="*" element={<NotFound/>}/>
   </Routes>
   </div>
   <Footer></Footer>
   </>
  );
}

export default App;
