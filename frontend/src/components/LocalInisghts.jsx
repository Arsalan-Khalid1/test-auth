import React, { useEffect } from "react";
import NavigationBar from "../pages/NavigationBar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/auth/authSlice";

const LocalInisghts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    navigate("/");
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);
  return (
    <>
      <NavigationBar />
      <Header />
      <div className="container">
        <h1>LOCAL INSIGHTS</h1>
      </div>
    </>
  );
};

export default LocalInisghts;
