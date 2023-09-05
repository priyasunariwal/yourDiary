import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"", password: ""})
 
 //The useHistory() hook has been deprecated and replaced by the useNavigate() hook in React v6. 
  let navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault(); 

    const response = await fetch(`http://localhost:3001/api/auth/login`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
        
       
      });
      const json = await response.json()
      console.log(json); //do chiz recieve karega success variable and authtoken
     if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        props.showAlert("Account logged In successfully","success");
        navigate("/");  //redirect to home page
        
     }else{
      props.showAlert("invalid credentials","danger")
     }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
 
    return (
    <>
    <div>
    <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>

    </>
  )
}

export default Login
