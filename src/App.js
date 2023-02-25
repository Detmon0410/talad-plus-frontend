import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./page/login/login";
import Registor from "./page/register_main/registor_main";
import UserHomePage from "./page/u_homepage";
import UserProfile from "./page/u_profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import DefualtLoader from "./page/componenet/loader/Loader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/registor",
      element: <Registor />,
    },

    {
      path: "/profile",
      element: <UserProfile />,
      // children: [
      //   {
      //     path: "team",
      //     element: <Team />,
      //     loader: teamLoader,
      //   },
      // ],
    },
    {
      path: "/home",
      element: <UserHomePage />,
    },
    {
      path: "*",
      element: <LoginPage />,
      // loader: <DefualtLoader />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
