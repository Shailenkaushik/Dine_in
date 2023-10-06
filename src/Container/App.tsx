
import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "../Components/Layout";
import { Home, NotFound } from "../Pages";
import MenuItemDetail from "../Pages/MenuItemDetail";
function App() {

  

  return (
   <>
   <Header></Header>
   <div>
   <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/MenuItemDetails/:menuItemId" element={<MenuItemDetail/>}/>
     <Route path="*" element={<NotFound/>}/>
   </Routes>
   </div>
   <Footer></Footer>
   </>
  );
}

export default App;
