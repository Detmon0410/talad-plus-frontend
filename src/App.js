import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./page/login/login";
import Registor from "./page/register_main/registor_main";
import UserHomePage from "./page/u_homepage/u_homepage";
import UserProfile from "./page/u_profiles/u_profile";
import MarketRegistor from "./page/registor_owner/registor_owner";
import MarketProfile from "./page/m_profiles/m_profile";
import MarketControl from "./page/m_control/m_control2";
import MerchantRegistor from "./page/merchant_registor/registor_merchant";
import PMarketprofile from "./page/public_market_profile/public_marketprofile";
import BookingStall from "./page/m_booking/m_booking";
import RegistorWallet from "./page/wallet-registor/wallet-market-registor";
import WalletPage from "./page/wallet-market copy/wallet-market";
import BookinStallList from "./page/bookinglist/bookinglist_page";
import Receipt from "./page/receipt-booking/receipt-booking";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import DefualtLoader from "./page/componenet/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import Appbar from "./page/componenet/AppbarUser";
import { selectUserReducer } from "./redux/user/selector";
import { signOut } from "./redux/user/actions";
import { useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";
import AdminMain from "./page/admin-page/admin_main";

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
            img={userSelector.img}
            name={userSelector.name}
            role={userSelector.role}
            uid={userSelector.uid}
            signOut={handleSignOut}
          ></Appbar>
        )}

        <Routes>
          <Route path="/mybookinglist" element={<BookinStallList />} />
          <Route path="/registor" element={<Registor />} />
          <Route path="/Receipt" element={<Receipt />} />
          <Route path="/MProfile" element={<MarketProfile />} />
          <Route path="/MControl" element={<MarketControl />} />
          <Route path="/Viewmarket" element={<PMarketprofile />} />

          <Route path="/marketregistor" element={<MarketRegistor />} />
          <Route path="/merchantregistor" element={<MerchantRegistor />} />
          <Route path="/bookingstall" element={<BookingStall />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/walletregister" element={<RegistorWallet />} />
          <Route path="/walletPage" element={<WalletPage />} />
          <Route
            path="/asxdllkmkylix332422@co_n22323123"
            element={<AdminMain />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
