import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = (props) => {
 
  const [credentials, setCredentials] = useState({name:"", email:"", password: "", cpassword: ""})
 
 //The useHistory() hook has been deprecated and replaced by the useNavigate() hook in React v6. 
  let navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault(); 
  const {name,email,password} = credentials;
    const response = await fetch(`http://localhost:3001/api/auth/createuser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify({name,email,password})
        
       
      });
      const json = await response.json()
      console.log(json); //do chiz recieve karega success variable and authtoken
     if(json.success){
        //save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        navigate("/");  //redirect to home page
        props.showAlert("Account created successfully","success");
     }else{
        props.showAlert("invalid information","danger")
     }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
 
 
 
 

 
  return (
    <>
    <div className='container'>

<form onSubmit={handleSubmit}>
<div className="form-group">
    <label htmlFor="name">Enter your Name</label>
    <input type="text" className="form-control" id="name" name='name' onChange={onChange}  aria-describedby="nameHelp" placeholder="Enter Name"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your name with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange}  aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} placeholder="Password"/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword"> Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} placeholder="Confirm Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-4">Submit</button>
</form>
    </div>

    </>
  )
}

export default Signup
