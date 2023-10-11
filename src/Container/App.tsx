
import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "../Components/Layout";
import { Home, Login, NotFound, Register } from "../Pages";
import MenuItemDetail from "../Pages/MenuItemDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import ShoppingCart from "../Pages/ShoppingCart";
function App() {

  const dispatch=useDispatch();
  const {data,isLoading}=useGetShoppingCartQuery("68b0079c-682f-4369-97aa-932be9b15c63");
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
     <Route path="*" element={<NotFound/>}/>
   </Routes>
   </div>
   <Footer></Footer>
   </>
  );
}

export default App;
