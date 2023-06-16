import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"

export const Auth = () => {
  return (
    <div>
      <Login />
      <Register />
    </div>
  );
};

//Components used only for this page

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies("access_token")

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", { //////////////////// CHANGE IT AFTER DEPLOYMENT
        username,
        password,
      });

      setCookies("access_token", response.data.token) //check 'const token' in server > src > routes > users.js
      window.localStorage.setItem("userID", response.data.userID) //store the userID that is sent back insire a local storage to have quick access to it
      navigate("/")//redirect to home page


      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault(); //won't refresh the page
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      }); //////////////////// CHANGE IT AFTER DEPLOYMENT
      alert("Registration completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="bg-gray-300 rounded flex flex-col justify-center mx-10 py-12 lg:px-8">
      <form className="flex flex-col items-center" onSubmit={onSubmit}>
        <h1 className="text-2xl text-center">{label}</h1>
        <div className="flex items-center justify-center mt-8">
          <label htmlFor="username" className="mr-2">
            Username:{" "}
          </label>
          <input
            type="text"
            id="username"
            className="rounded-md"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="flex items-center justify-center mt-8">
          <label htmlFor="password" className="mr-2">
            Password:{" "}
          </label>
          <input
            type="password"
            id="password"
            className="rounded-md"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 mt-6 self-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {label}
        </button>
      </form>
    </div>
  );
};
