import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./page/login/login";
import Registor from "./page/register_main/registor_main";
import UserHomePage from "./page/u_homepage";
import UserProfile from "./page/u_profile";
import MarketRegistor from "./page/registor_owner/registor_owner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import DefualtLoader from "./page/componenet/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import Appbar from "./page/componenet/AppbarUser";
import { selectUserReducer } from "./redux/user/selector";
import { signOut } from "./redux/user/actions";
import { useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const userSelector = useSelector(selectUserReducer);
  const signIn = userSelector.signIn;
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className="App">
      <BrowserRouter>
        {signIn && (
          <Appbar
            name={userSelector.name}
            role={userSelector.role}
            signOut={handleSignOut}
          ></Appbar>
        )}

        <Routes>
          <Route path="/registor" element={<Registor />} />
          <Route path="/marketregistor" element={<MarketRegistor />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
