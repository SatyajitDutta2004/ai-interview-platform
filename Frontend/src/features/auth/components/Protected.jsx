import {useAuth} from "../hooks/useAuth";

// import{Navigate} from "react-router";
import { Navigate } from "react-router-dom";

const Protected=({children})=>{
  const { loading, user } = useAuth()

  // const navigate=useNavigate()

if(loading){
  return (<main><h1>Loading...</h1></main>)
}
if(!user){
return <Navigate to={'/'} />
}

  return children
}

export default Protected