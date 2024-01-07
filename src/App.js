import React, { useEffect} from "react";
import "./App.css";
/* eslint-disable */
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookingsPage from "./pages/BookingsPage";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/reducers/user";
import { Toaster } from "react-hot-toast";
import BookTrain from "./pages/BookTrain";

const App = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      if (localStorage.getItem('user')) {
        const id = JSON.parse(localStorage.getItem('user'))
        const res = await fetch('http://localhost:5500/users/' + `${id}`);
        const data = await res.json();
        console.log(data);

        let { password, ...rest } = data;

        dispatch(loginSuccess(data));
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/book" element={<BookTrain />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
