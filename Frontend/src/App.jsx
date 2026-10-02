// // import {RouterProvider} from "react-router"
// import { RouterProvider } from "react-router-dom";
// import {router} from "./app.routes.jsx"
// import { AuthProvider } from "./features/auth/auth.provider.jsx";

// function App() {
 

//   return (
//     <AuthProvider>
//       <RouterProvider router={router}/>

//     </AuthProvider>
  

//   )
// }

// export default App


import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.provider.jsx"
import { InterviewProvider } from "./features/interview/interview.provider.jsx"

function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App
