import React from 'react'
import { useEffect} from "react";
import { menuItemModel } from '../../../Interfaces';
import MenuItemCards from './MenuItemCards';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { useDispatch } from 'react-redux';

function MenuItemList() {

    // const [menuItems,setMenuItems]=useState<menuItemModel[]>([]);
    const dispatch=useDispatch();
    const {data,isLoading}=useGetMenuItemsQuery(null);

    useEffect(()=>{
      if(!isLoading){
        dispatch(setMenuItem(data.result))
      }
    },[isLoading]);
   if(isLoading){
    return <div>Loading...</div>
   }
  return (
    <div className='container row'>
      {data.result.length >0 && 
        data.result.map((menuItem:menuItemModel,index:number)=>(
          <MenuItemCards menuItem={menuItem} key={index}/>
        ))
      }
     
    </div>
  )
}

export default MenuItemList
