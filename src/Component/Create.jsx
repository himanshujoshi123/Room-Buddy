import React, { useState, useRef, useEffect } from "react";
import {
  FoodChoice,
  LookingFor,
  Occupation,
  Habits,
  Gender,
} from "../utils/constant";
import { useSelector } from "react-redux";
import { firestore } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Create = () => {

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [occupation, setOccupation] = useState("");
  const [foodChoice, setFoodChoice] = useState("");
  const [lookingForVal, setlookingForVal] = useState("");
  const [gender, setgender] = useState("");
  const [location_search, setLocationSearch] = useState("");
  const [email, setEmail] = useState(user === null ? "NA" : user.email);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const name = useRef(null);
  const budget = useRef(null);
  const age = useRef(null);
  const date = useRef(null);
  const description = useRef(null);
  const suggestionRef = useRef(null);


  const apiKey = "81c244c254ba4bfe82ea4f10f5100beb";
  const geoapifyAutocompleteEndpoint = `https://api.geoapify.com/v1/geocode/autocomplete?apiKey=${apiKey}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        // Click outside suggestion div
        setSuggestions([]);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionRef]);
  

  // calling data api
  const handletoggle = async (e) => {
    try {
      setLocationSearch(e.currentTarget.value);

      const response = await fetch(
        `${geoapifyAutocompleteEndpoint}&text=${location_search}`
      );

      const result = await response.json();

      // Ensure result.features is an array before setting suggestions
      if (Array.isArray(result?.features)) {
        setSuggestions(result.features);
      } else {
        setSuggestions([]); // Set empty array if features is not an array
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]); // Set empty array in case of an error
    }
  };


  // Validate mobile number
  const validateMobileNumber = () => {
    const regex = /^[0-9]{10}$/; // Simple validation for a 10-digit mobile number
    if (!regex.test(mobileNumber)) {
      setMobileNumberError("Please enter a valid 10-digit mobile number.");
      return false;
    }
    setMobileNumberError("");
    return true;
  };
  const handleCheckboxChange = (habitValue) => {
    // Check if the habitValue is already in the selectedHabits array
    if (selectedHabits.includes(habitValue)) {
      // If it is, remove it
      setSelectedHabits((prevSelectedHabits) =>
        prevSelectedHabits.filter((habit) => habit !== habitValue)
      );
    } else {
      // If it is not, add it
      setSelectedHabits((prevSelectedHabits) => [
        ...prevSelectedHabits,
        habitValue,
      ]);
    }
  };

  // upload the data to the firebase
  const handleData = async () => {
    if (
      name.current.value === "" &&
      date.current.value === "" &&
      location_search === "" &&
      gender === "" &&
      lookingForVal === "" &&
      description.current.value === "" &&
      mobileNumber === ""
    ) {
      toast.error("Please Fill out All fields", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
      });
    } else {
      toast.success("Successfully Data Uploaded", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
      });
      await addDoc(collection(firestore, "users"), {
        userName: name.current.value,
        Age: age.current.value,
        budget: budget.current.value,
        date: date.current.value,
        Occupation: occupation,
        FoodChoices: foodChoice,
        gender: gender,
        location: location_search,
        email: user.email,
        mobileNumber: mobileNumber,
        uid: user.uid,
        looking: lookingForVal,
        habits: selectedHabits,
        userDescription: description.current.value,
      });
      navigate("/mainPage");
    }

    setOccupation("");
    setFoodChoice("");
    setlookingForVal("");
    setgender("");
    setLocationSearch("");
    setEmail(user === null ? "NA" : user.email);
    setMobileNumber("");
    name.current.value = "";
    budget.current.value = "";
    age.current.value = "";
    date.current.value = "";
    description.current.value = "";
  };

  // getting the search values we want specific city
  const getValue = (id) => {
    const filter = suggestions.filter((items) => {
      return items.properties.place_id === id;
    });
    setLocationSearch(
      `${filter[0]?.properties?.city}, ${filter[0]?.properties?.state}, ${filter[0]?.properties?.country}, ${filter[0]?.properties?.postcode}`
    );
    
    document.getElementById("searchResult").style.display = "none";
  };
  return (
    <>
      <ToastContainer />
      <div className="bg-gray-50 flex flex-col min-h-screen pt-20">
        <div className="container py-6">
          <div className="max-w-lg mx-auto py-8 mb-1">
            <h1 className="text-blue-500 font-bold">
              Roommate Information Form
            </h1>
            <p>Create your roommate profile for a room.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-8">
              <div className="max-w-xl mx-auto border relative flex-col pl-10 pr-10 py-6 rounded-md shadow-md ">
                <label className="font-semibold  ">Search location:</label>
                <input
                  value={location_search}
                  onChange={(e) => handletoggle(e)}
                  type="search"
                  className="block create-input "
                  placeholder="enter the location"
                />
                {suggestions.length > 0 ? (
                  <>
                    <div
                      className="absolute top-25 bg-gray-300 overflow-y-scroll w-[85%] rounded-md h-[20vh] text-lg"
                      id="searchResult" ref={suggestionRef}
                    >
                      {suggestions.map((items) => {
                        return (
                          <>
                            <ul>
                              <li
                                onClick={() =>
                                  getValue(items.properties.place_id)
                                }
                                className="ml-3 hover:bg-yellow-50 cursor-pointer"
                              >
                                {`${items.properties.city}, ${items.properties.state}, ${items.properties.country}, ${items.properties.postcode}`}
                              </li>
                            </ul>
                          </>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div>
                  <div className="mt-4">
                    <label htmlFor="">Budget</label>
                    <input
                      ref={budget}
                      className="block create-input"
                      type="number"
                      placeholder="$"
                    />
                  </div>

                  <div className="mt-5">
                    <label htmlFor="">I'm Looking for</label>
                    <select
                      onChange={(e) => setlookingForVal(e.currentTarget.value)}
                      className="block create-input"
                    >
                      {LookingFor.map((items) => {
                        return (
                          <option value={items.value}>{items.text}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mt-4">
                    <label>Gender : </label>
                    <select
                      value={gender}
                      onChange={(e) => setgender(e.currentTarget.value)}
                      className="block create-input"
                    >
                      {Gender.map((items) => {
                        return (
                          <option value={items.value}>{items.value}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mt-4">
                    <label>Full Name</label>
                    <input
                      ref={name}
                      className="block create-input"
                      type="text"
                      placeholder="your name"
                    />
                  </div>
                  <div className="mt-4">
                    <label>Email</label>
                    <input
                      readOnly
                      value={email}
                      className="block create-input"
                      type="email"
                      placeholder="your name"
                    />
                  </div>
                  <div className="mt-4">
                  <label htmlFor="">Mobile Number</label>
                  <input
                    className="block create-input"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    onBlur={validateMobileNumber}
                  />
                  {mobileNumberError && (
                    <p className="text-red-500 text-sm mt-1">
                      {mobileNumberError}
                    </p>
                  )}
                </div>
                  <div className="mt-4">
                    <label htmlFor="">Age</label>
                    <input
                      ref={age}
                      className="block create-input"
                      type="number"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">Date to Move</label>
                    <input
                      ref={date}
                      className="block create-input"
                      type="date"
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">Occupation</label>
                    <select
                      value={occupation}
                      onChange={(e) => setOccupation(e.currentTarget.value)}
                      className="block create-input"
                      name=""
                      id=""
                    >
                      {Occupation.map((items) => {
                        return (
                          <option key={items.id} value={items.value}>
                            {items.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">Food</label>
                    <select
                      value={foodChoice}
                      onChange={(e) => setFoodChoice(e.currentTarget.value)}
                      className="create-input block"
                      name=""
                      id=""
                    >
                      {FoodChoice.map((items) => {
                        return (
                          <option key={items.id} value={items.value}>
                            {items.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="habits">Habit</label>
                    {Habits.map((items) => (
                      <div key={items.id}>
                        <input
                          type="checkbox"
                          id={items.id}
                          value={items.value}
                          checked={selectedHabits.includes(items.value)}
                          onChange={() => handleCheckboxChange(items.value)}
                        />
                        <label htmlFor={items.id} className="ml-3 font-bold">
                          {items.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label htmlFor="">Description</label>
                    <div id="textareaContainer">
                    <textarea
                      ref={description}
                      className="block border-2 w-64 rounded-md"
                      type="textarea"
                      placeholder="Enter short description of yourself"
                    />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleData}
                  className="px-[12.2rem] mt-4 border rounded-md py-2 bg-blue-500 text-white font-bold cursor-pointer"
                >
                  Create Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
