import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const nameRef = useRef(null);
  const dispatch = useDispatch();
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);

  const handleSignUp = async () => {
    try {
      if (!isPasswordValid || !isEmailValid) {
        toast.error("Invalid email or password format!", {
          position: "top-center",
        });
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      // Update user profile with the provided name
      await updateProfile(auth.currentUser, {
        displayName: nameRef.current.value,
      });

      // Fetch updated user details after profile update
      const updatedUser = auth.currentUser;

      // Dispatch user details to Redux store
      dispatch(
        adduser({
          uid: updatedUser.uid,
          email: updatedUser.email,
          displayName: updatedUser.displayName,
        })
      );

      toast.success("Account created successfully!", {
        position: "top-center",
      });

      navigate("/mainPage"); // Redirect to the main page after successful signup
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast(`${errorCode} - ${errorMessage}`, {
        position: "top-center",
      });
    }
  };

  const validatePassword = () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    // Ensure the password is alphanumeric
    const isAlphanumeric = /^[0-9a-zA-Z]+$/.test(password);

    setPasswordValid(password === confirmPassword && isAlphanumeric);
  };

  const validateEmail = () => {
    const email = emailRef.current.value;
    const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setEmailValid(isEmailFormatValid);
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container flex justify-center items-center h-[80vh] pt-24">
        <div className="w-[25rem]">
          <h1 className="text-center text-2xl font-bold ">
            Welcome to the Room Buddy
          </h1>
          <h1 className="text-center mt-1 font-bold">
            Find your Best Room Mates
          </h1>
          <form className="mt-5">
            <div className="mt-4">
              <label>Name</label>
              <input
                ref={nameRef}
                className="block bg-gray-100 w-full py-1 px-2 mt-2"
                type="text"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mt-4">
              <label>Email</label>
              <input
                ref={emailRef}
                className={`block bg-gray-100 w-full py-1 px-2 mt-2 ${
                  !isEmailValid ? "border-red-500" : ""
                }`}
                type="email"
                placeholder="Enter your email"
                required
                onChange={validateEmail}
              />
              {!isEmailValid && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email address
                </p>
              )}
            </div>
            <div className="mt-4">
              <label>Password</label>
              <input
                ref={passwordRef}
                className={`block bg-gray-100 w-full py-1 px-2 mt-2 ${
                  !isPasswordValid ? "border-red-500" : ""
                }`}
                type="password"
                placeholder="Password"
                required
                onChange={validatePassword}
              />
            </div>
            <div className="mt-4">
              <label>Confirm Password</label>
              <input
                ref={confirmPasswordRef}
                className={`block bg-gray-100 w-full py-1 px-2 mt-2 ${
                  !isPasswordValid ? "border-red-500" : ""
                }`}
                type="password"
                placeholder="Confirm Password"
                required
                onChange={validatePassword}
              />
              {!isPasswordValid && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match or are not alphanumeric
                </p>
              )}
            </div>
          </form>
          <button
            onClick={handleSignUp}
            className="border px-2 py-1 w-full mt-4 cursor-pointer bg-purple-400 text-white font-bold "
          >
            Sign up
          </button>
          <p className="text-center font-bold mt-4">
            Already have an account?{" "}
            <Link className="hover:underline" to={"/"}>
              Login in
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
