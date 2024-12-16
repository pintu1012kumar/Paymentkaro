import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import RefrshHandler from "./privateroute";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/signin" />
  }
  return (
    <>
       <BrowserRouter>
       <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
         <Route path="/" element={<Signup />} />   
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>}/>} />
          <Route path="/send" element={<PrivateRoute element={<SendMoney/>}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App