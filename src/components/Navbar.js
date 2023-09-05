import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';



 

const Navbar = () => {
  
  let location = useLocation();
  //did console to show it consoles path actually.
  // useEffect(() => {    
  //   console.log(location.pathname);
  // }, [location]);
 
 let navigate = useNavigate();

  const HandleLogOut = ()=>{
  localStorage.removeItem('token');
   navigate('/login');
  }

  return (
    <>
   <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">OurNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/About"? "active": ""}`} to="/About">About</Link>
        </li>
        
      </ul>
     {!localStorage.getItem('token')?<form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <Link className="btn btn-primary mx-1" to="/login" role="button">LogIn</Link>
        <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
      </form>:<button className='btn btn-primary mx-1' onClick={HandleLogOut}>LogOut</button> }
    </div>
  </div>
</nav>
      
    </div>
    </>
  )
}

export default Navbar
