import React from "react";
import Header from "./Component/Header";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Main from "./Component/Main";
import Footer from "./Component/Footer";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import Create from "./Component/Create";
import DisplayUserInfo from "./Component/DisplayUserInfo";

const App = () => {
  return (
    <>
     <Provider store={store}>
     <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
     </Provider>
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/mainPage",
        element: <Main />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/displayUser",
        element: <DisplayUserInfo/>
      },
    ],
  },
]);

export default App;
