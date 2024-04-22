import React, { useState } from "react";
import Custominput from "../components/Custominput";
import { Link } from "react-router-dom";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className={`p-6 w-full h-screen flex items-center justify-center`}>
      <div className="flex flex-col gap-6 w-full">
        <h3 className="capitalize font-semibold">sign in to your journal</h3>
        <form action="" className="flex flex-col gap-4">
          <label htmlFor="username">
            <Custominput
              type={"text"}
              placeHolder={"username"}
              value={formData.username}
              handleChange={handleInputChange}
              name={"username"}
            />
          </label>
          <label htmlFor="password">
            <Custominput
              type={"password"}
              placeHolder={"password"}
              value={formData.password}
              handleChange={handleInputChange}
              name={"password"}
            />
          </label>
          <button
            onClick={handleSubmit}
            className="bg-[#333] text-[#fff] p-2 capitalize rounded-sm font-semibold"
          >
            sign in
          </button>

          <p className="flex items-center gap-2">
            Don't have an account?
            <span className="text-blue-500 underline">
              <Link to={"/signup"}>create account</Link>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
