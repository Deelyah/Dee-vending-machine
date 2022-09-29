import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import MyAccount from "./pages/MyAccount";
import AllUsers from "./components/AllUsers";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />}></Route>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="" element={<Home />} />
            <Route path="my-account/*" element={<MyAccount />}>
              <Route path="all-users" element={<AllUsers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
