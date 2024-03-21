import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { adduser, removeUser } from "../utils/userSlice";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isOpen, setisOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const { email, displayName } = auth.currentUser;
        dispatch(
          adduser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/mainPage");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const handeLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const isCreatePage = location.pathname === "/Create";
  const isHomePage = location.pathname === "/mainPage";
  const isDisplayUserInfo = location.pathname === "/displayUser";
  const isLogin = location.pathname === "/";

  const handleToggle = () => {
    setisOpen(!isOpen);
  }

  return (
    <>
      <nav className="flex justify-between fixed w-full items-center px-10 z-40 min-h-[8vh] bg-white shadow-md">
        <a href="/mainPage">
          <div className="text-2xl uppercase tracking-wide font-bold ">
            Room<span className="text-red-500">Buddy.</span>
          </div>
        </a>
        {user && (
          <input
            className="bg-gray-100 w-[30rem] outline-none rounded-md px-2 py-1 mx-2"
            type="text"
            placeholder="search your location....."
          />
        )}
        <ul className="flex space-x-4 items-center max-md:hidden">
        {user && <h2>I am, <span className="font-bold text-blue-500 text-nowrap">{user.displayName}</span></h2>}
          {!user && !isLogin && (
            <>
              <Link to={"/"}>
                <button className="font-bold cursor-pointer text-nowrap">Login</button>
              </Link>
            </>
            )}
            {!user && (
            <>
              <Link to={"/signup"}>
                {" "}
                <button className="border px-3 py-2 bg-purple-400 text-white font-bold rounded-md text-nowrap">
                  Signup
                </button>
              </Link>
            </>
            )}
          
          {user && !isDisplayUserInfo && (
            <Link to={"/displayUser"}>
              <button className="font-bold cursor-pointer text-nowrap">
                Listed Roommates
              </button>
            </Link>
          )}
          {user && !isCreatePage && (
            <Link to={"/Create"}>
              <button className="font-bold cursor-pointer text-nowrap">Create</button>
            </Link>
          )}
          {user && !isHomePage && (
            <Link to={"/mainPage"}>
              <button className="font-bold cursor-pointer text-nowrap">Home</button>
            </Link>
          )}
          {user && (
            <button
              className="border px-3 py-2 bg-purple-400 text-white font-bold rounded-md text-nowrap"
              onClick={handeLogout}
            >
              Logout
            </button>
          )}
        </ul>
        <FaBars onClick={handleToggle} className="hidden text-3xl cursor-pointer ml-4 max-md:block" />
      </nav>



      <div>
      <ul className={` hidden ${isOpen ? "max-md:block" : "max-md:hidden"} pt-[100px] text-center bg-gray-200 pb-5 shadow-md `}>
        {user && <h2>I am, <span className="font-bold text-blue-500">{user.displayName}</span></h2>}
          {!user && !isLogin && (
            <>
              <Link to={"/"}>
                <button className="font-bold cursor-pointer shadow-md">Login</button>
              </Link>
            </>
            )}
            {!user && (
            <>
              <Link to={"/signup"}>
                {" "}
                <button className="border px-3 py-2 bg-purple-400 text-white font-bold rounded-md">
                  Signup
                </button>
              </Link>
            </>
            )}
          
          {user && !isDisplayUserInfo && (
            <Link to={"/displayUser"}>
              <button className="font-bold cursor-pointer block mx-auto">
                Listed Roommates
              </button>
            </Link>
          )}
          {user && !isCreatePage && (
            <Link to={"/Create"}>
              <button className="font-bold cursor-pointer block mx-auto">Create</button>
            </Link>
          )}
          {user && !isHomePage && (
            <Link to={"/mainPage"}>
              <button className="font-bold cursor-pointer block mx-auto">Home</button>
            </Link>
          )}
          {user && (
            <button
              className="border px-3 py-2 bg-purple-400 text-white font-bold rounded-md block mx-auto"
              onClick={handeLogout}
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </>
  );
};
export default Header;
