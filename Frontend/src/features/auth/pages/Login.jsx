import {useState} from 'react'
import "../auth.form.scss"
// import {Link} from 'react-router'
// import {Link} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'
// import {useNavigate} from 'react-router'
import { Link, useNavigate } from "react-router-dom";

const Login=() =>
{

const {loading,handleLogin}=useAuth()
const navigate=useNavigate()


const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const [error, setError] = useState("")


const handleSubmit=async(e)=>
{
  e.preventDefault()
setError("")

try {
  const isLoggedIn = await handleLogin({email,password})
  if (isLoggedIn) {
    navigate('/home')
  }
} catch (err) {
  setError(err.message)
}


}

if(loading){
  return (<main><h1>Loading..........</h1></main>)
}



  return(
    <main>
      <div className="from-container">
        <h1>Login</h1>

        {error && <p role="alert">{error}</p>}
        
<form onSubmit={handleSubmit}>


<div className="input-group">
  <label htmlFor="email">Email or username</label>
  <input
  
  onChange={(e) => setEmail(e.target.value)}

  
  type="text" id="email" name="email" required placeholder="Enter your email or username" />
</div>


<div className="input-group">
  <label htmlFor="password">Password</label>
  <input
 onChange={(e) => setPassword(e.target.value)}

  type="password" id="password" name="password" required placeholder="Enter your password" />
</div>


<button type="submit" className="button primary-button">
  Login
</button>


</form>

<p>Don't have an account?<Link to="/register">Register</Link></p>
      </div>
    </main>
    
  )
}
export default Login