import {useState} from 'react'
// import {useNavigat,Link} from "react-router"
import { useNavigate, Link } from "react-router-dom";
import {useAuth} from '../hooks/useAuth'

const Register=( )=>{

const navigate=useNavigate()

const[username, setUsername]=useState("")
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const {handleRegister}=useAuth()



  const handleSubmit= async(e)=>
{
  e.preventDefault()
await handleRegister({username,email,password})
navigate("/")
}


  return(
    // <div>Register</div>

     <main>
      <div className="from-container">
        <h1>Register</h1>
        
<form onSubmit={handleSubmit}>


<div className="input-group">
  <label htmlFor="Username">Username</label>
  <input 
  onChange={(e)=>{
    setUsername(e.target.value)}
  }
  
  type="text" id="Username" name="Username"  placeholder="Enter your username" />
</div>


<div className="input-group">
  <label htmlFor="email">Email</label>
  <input 
  onChange={(e)=>{
    setEmail(e.target.value)}
  }
  
  type="email" id="email" name="email"  placeholder="Enter your email" />
</div>

<div className="input-group">
  <label htmlFor="password">Password</label>
  <input 
  onChange={(e)=>{
    setPassword(e.target.value)}
  }
  
  
  type="password" id="password" name="password"  placeholder="Enter your password" />
</div>


<button className="button primary-button">
  Register
</button>


</form>
 <p>Already have an account?<Link to="/">Login</Link></p>

      </div>
      </main>
    
  )
}

export default Register
