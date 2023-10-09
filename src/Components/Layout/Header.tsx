import React from 'react'
import { NavLink } from 'react-router-dom'
import { cartItemModel } from '../../Interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../Storage/Redux/store'
let logo=require("../../Assets/Images/mango.png")
function Header() {

    const shoppingCartFromStore:cartItemModel[]=useSelector(
         (state: RootState)=>state.shoppingCartStore.cartItems??[]
    );

  return (
    <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <img src={logo} style={{height: "40px"}} className='m-1'/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/shoppingcart"> <i className="bi bi-cart3">
         {" "} {shoppingCartFromStore?.length?`(${shoppingCartFromStore.length})`:""}
          </i> <span className="sr-only"></span></NavLink>
      </li>
     
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Admin Panel
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      
    </ul>
   
  </div>
</nav>
    </>
  )
}

export default Header
