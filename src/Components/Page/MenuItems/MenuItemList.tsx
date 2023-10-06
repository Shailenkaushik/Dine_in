import React from 'react'
import { useEffect, useState } from "react";
import { menuItemModel } from '../../../Interfaces';
import MenuItemCards from './MenuItemCards';


function MenuItemList() {

    const [menuItems,setMenuItems]=useState<menuItemModel[]>([]);
  
    useEffect(()=>{
      fetch("https://redmangoapi.azurewebsites.net/api/MenuItem")
      .then((response)=>response.json())
      .then((data)=>{
        
        setMenuItems(data.result);
        console.log(menuItems);
      });
    },[]);
   
  return (
    <div className='container row'>
      {menuItems.length >0 && 
        menuItems.map((menuItem,index)=>(
          <MenuItemCards menuItem={menuItem} key={index}/>
        ))
      }
     
    </div>
  )
}

export default MenuItemList
