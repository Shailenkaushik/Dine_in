import React, { useState } from 'react'
import { menuItemModel } from '../../../Interfaces';
import { Link } from 'react-router-dom';
import { useUpdateShoppingCartMutation } from '../../../Apis/shoppingCartApi';
import MiniLoader from '../../../Pages/Common/MiniLoader';
interface Props {
  menuItem: menuItemModel;
}

function MenuItemCards(props: Props) {
  const [updateShoppingCart] = useUpdateShoppingCartMutation();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const handleAddToCart = async (menuItemId: number) => {
    setIsAddingToCart(true);

    const response = await updateShoppingCart({ menuItemId: menuItemId, updateQuantityBy: 1, userId: "68b0079c-682f-4369-97aa-932be9b15c63" });
    console.log(response);
    setIsAddingToCart(false);
  }

  return (

    <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/MenuItemDetails/${props.menuItem.id}`}>
              <img
                src={props.menuItem.image}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>
          {props.menuItem.specialTag && props.menuItem.specialTag.length > 0 && (<i
            className="bi bi-star btn btn-success"
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          >
            &nbsp; {props.menuItem.specialTag}
          </i>)}

          {!isAddingToCart ? (<i
            className="bi bi-cart-plus btn btn-outline-danger"
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
            onClick={() => handleAddToCart(props.menuItem.id)}
          ></i>) : (<div style={{ position: "absolute", top: "15px", right: "15px" }}>
            <MiniLoader type='success'></MiniLoader>
            </div>)}


          <div className="text-center">
            <Link to={`/MenuItemDetails/${props.menuItem.id}`} style={{ textDecoration: "None", color: "green" }}>
              <p className="card-title m-0 text-success fs-3" >{props.menuItem.name}</p>
            </Link>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MenuItemCards
