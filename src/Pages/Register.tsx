import React,{useState} from 'react'
import { SD_Roles } from '../Utility/SD'
import inputHelper from '../Helper/inputHelper';
import { useRegisterUserMutation } from '../Apis/authApi';
import { apiResponse } from '../Interfaces';




export default function Register() {

  const [registerUser]=useRegisterUserMutation();
  const[loading,setLoading]=useState(false);
  const[userInput,setUserInput]=useState({
    userName: "",
    password: "",
    role: "",
    name: "",
  })

  const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const tempData=inputHelper(e,userInput);
    setUserInput(tempData);
  };
  
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setLoading(true);
      const response: apiResponse=await registerUser({
           userName: userInput.userName,
           password: userInput.password,
           role: userInput.role,
            name: userInput.name,
      })
      if(response.data){
        console.log(response.data);
      }
      else if(response.error){
        console.log(response.error.data.errorMessages[0]);
      }
      setLoading(false);
  }

  return (
    <div className="container text-center">
      <form method="post"  onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              value={userInput.userName}
              name='userName'
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              value={userInput.name}
              name='name'
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              value={userInput.password}
              name='password'
              onChange={handleUserInput}
            />
          </div> 
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select className="form-control form-select" required  value={userInput.role} name='role'
              onChange={handleUserInput}>
              <option value="">--Select Role--</option>
              <option value="customer">{`${SD_Roles.CUSTOMER}`}</option>
              <option value="admin">{`${SD_Roles.ADMIN}`}</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success">
            Register
          </button>
        </div>
      </form>
    </div>
  )
}
