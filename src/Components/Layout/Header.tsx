import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { cartItemModel, userModel } from '../../Interfaces'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '../../Storage/Redux/store'
import { emptyUserState, setLoggedInUser } from '../../Storage/Redux/userAuthSlice'
let logo=require("../../Assets/Images/mango.png")
function Header() {

   const dispatch=useDispatch();
   const navigate=useNavigate();
    const shoppingCartFromStore:cartItemModel[]=useSelector(
         (state: RootState)=>state.shoppingCartStore.cartItems??[]
    );
     
    const userData: userModel=useSelector((state:RootState)=>state.userAuthStore)
     
    const handleLogout=()=>{
      localStorage.removeItem("token");
      dispatch(setLoggedInUser({...emptyUserState}))
      navigate("/")
    }

  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <img src={logo} style={{height: "40px"}} className='m-1'/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/shoppingcart"> <i className="bi bi-cart3">
         {" "} {shoppingCartFromStore?.length?`(${shoppingCartFromStore.length})`:""}
          </i> <span className="sr-only"></span></NavLink>
      </li>
     
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Admin Panel
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <div className='d-flex' style={{marginLeft:"auto"}} >
       {userData.id && (<>
       
         <li className='nav-item'>
            <button className='nav-link active'
            style={{
               cursor:"pointer",
               background:"transparent",
               border:0,
            }}>Welcome,{userData.fullName}</button>
         </li>
       
        <li className='nav-item '>
           <button
             className='btn btn-success btn-outlined rounded-pill text-white mx-2'
             style={{
              border:"none",
              height:"40px",
              width:"100px"
             }}
             onClick={handleLogout}
           >Logout</button>
       </li></>) }
      {!userData.id && (<><li className='nav-item text-white'>
          <NavLink  to="/register" className=' btn  btn-outlined rounded-pill text-white mx-2'
             style={{
              border:"none",
              height:"40px",
              width:"100px"
             }}>
             Register
          </NavLink>
       </li>
       <li className='nav-item text-white'>
          <NavLink className=' btn btn-success btn-outlined rounded-pill text-white mx-2'
             style={{
              border:"none",
              height:"40px",
              width:"100px"
             }} to="/login">
             Login
          </NavLink>
       </li></>)}
       
     
      </div>
    </ul>
   
  </div>
</nav>
    </>
  )
}

export default Header
