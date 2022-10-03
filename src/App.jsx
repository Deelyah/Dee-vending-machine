import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import MyAccount from "./pages/MyAccount";
import AllUsers from "./components/AllUsers";
import ViewProfile from "./components/user/ViewProfile";
import UpdateProfile from "./components/user/UpdateProfile";
import SellersProucts from "./pages/products/SellersProducts";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";
import SellersRoute from "./components/SellersRoute";
import VendingMachine from "./pages/VendingMachine";
import Deposit from "./pages/Deposit";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />}></Route>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index path="" element={<Home />} />
            <Route path="my-account/*" element={<MyAccount />}>
              <Route path="view-profile" element={<ViewProfile />} />
              <Route path="update-profile" element={<UpdateProfile />} />
              <Route path="all-users" element={<AllUsers />} />
              <Route path="vending-machine" element={<VendingMachine />} />
              <Route path="deposit" element={<Deposit />} />
              <Route path="seller/*" element={<SellersRoute />}>
                <Route path="my-products" element={<SellersProucts />} />
                <Route path="edit-product/:id" element={<EditProduct />} />
                <Route path="add-product" element={<AddProduct />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
