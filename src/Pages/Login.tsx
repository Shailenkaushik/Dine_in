import React,{useState} from 'react'
import { useLoginUserMutation, useRegisterUserMutation } from '../Apis/authApi';
import inputHelper from '../Helper/inputHelper';
import { apiResponse, userModel } from '../Interfaces';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { useNavigate } from 'react-router-dom';
import { MainLoader, MiniLoader } from './Common';
import { toast } from 'react-toastify';


export default function Login() {
  const [error,setError]=useState("");
  const [loginUser]=useLoginUserMutation();
  const[loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const notify = () => toast("Logged in successfully!!");
  const[userInput,setUserInput]=useState({
    userName: "",
    password: "",
    
  })

  const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const tempData=inputHelper(e,userInput);
    setUserInput(tempData);
  };
  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    const response: apiResponse=await loginUser({
         userName: userInput.userName,
         password: userInput.password
         
    })
    if(response.data){ 
      console.log(response.data);
      const {token}=response.data.result;
      localStorage.setItem("token",token);
      const {fullName,id,email,role}: userModel=jwtDecode(token);
      dispatch(setLoggedInUser({fullName,id,email,role}));
      navigate("/");
      notify();
    }
    else if(response.error){
      console.log(response.error.data.errorMessages[0]);
      setError(response.error.data.errorMessages[0]);
    }
    setLoading(false);
}
  return (
    <div className="container text-center">
    {loading && <MainLoader></MainLoader>}
    <form method="post" onSubmit={handleSubmit}>
      <h1 className="mt-5">Login</h1>
      <div className="mt-5">
        <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            required
            onChange={handleUserInput}
            name='userName'
            value={userInput.userName}
          />
        </div>

        <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            required
            onChange={handleUserInput}
            name='password'
            value={userInput.password}
          />
        </div>
      </div>

      <div className="mt-2">
        {error && <p className='text-danger'>{error}</p>}
        <button
          type="submit"
          className="btn btn-success"
          style={{ width: "200px" }}
          disabled={loading}
        >
          Login
        </button>
      </div>
    </form>
  </div>
  )
}
