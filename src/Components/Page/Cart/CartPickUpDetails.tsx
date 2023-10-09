import React,{useState} from 'react'
import { cartItemModel } from '../../../Interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Storage/Redux/store';
import inputHelper from '../../../Helper/inputHelper';
import { MiniLoader } from '../../../Pages/Common';
export default function CartPickUpDetails() {
    const [loading,setLoading]=useState(false);
    const shoppingCartFromStore:cartItemModel[]=useSelector(
        (state: RootState)=>state.shoppingCartStore.cartItems??[]
   );
   let grandTotal=0;
   let totalItems=0;
   shoppingCartFromStore?.map((cartItem:cartItemModel)=>{
         totalItems+=cartItem.quantity??0;
         grandTotal+=((cartItem.quantity??0)*(cartItem.menuItem?.price??0))
         return null;
   })
   const initialUserData={
    name:"",
    email:"",
    phoneNumber:"",
   }
   const [userInput, setUserInput] = useState(initialUserData);
   const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit=async(e:React.FormEvent<HTMLInputElement>)=>{
    e.preventDefault();
    setLoading(true);
  }
  return (
    <div className="border pb-5 pt-3">
    <h1 style={{ fontWeight: "300" }} className="text-center text-success">
      Pickup Details
    </h1>
    <hr />
    <form className="col-10 mx-auto" >
      <div className="form-group mt-3">
        Pickup Name
        <input
          type="text"
          className="form-control"
          value={userInput.name}
          onChange={handleUserInput}
          placeholder="name..."
          name="name"
          required
        />
      </div>
      <div className="form-group mt-3">
        Pickup Email
        <input
          type="email"
          className="form-control"
          value={userInput.email}
          placeholder="email..."
          onChange={handleUserInput}
          name="email"
          required
        />
      </div>

      <div className="form-group mt-3">
        Pickup Phone Number
        <input
          type="number"
          className="form-control"
          value={userInput.phoneNumber}
          placeholder="phone number..."
          name="phoneNumber"
          onChange={handleUserInput}
          required
        />
      </div>
      <div className="form-group mt-3">
        <div className="card p-3" style={{ background: "ghostwhite" }}>
          <h5>Grand Total : ${grandTotal}</h5>
          <h5>No of items : {totalItems}</h5>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-success form-control mt-3" disabled={loading}
      >
        {loading?<MiniLoader></MiniLoader>:"Looks Good? Place Order!"}
        
      </button>
    </form>
  </div>
  )
}
