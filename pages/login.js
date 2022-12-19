import Link from "next/link";
import { Router } from "next/router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user-context";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const [log, setLog] = useState({ username: "", password: "" });
  const setUser = (k) => {
    setLog({ ...log, username: k });
  };
  const setPassword = (k) => {
    setLog({ ...log, password: k });
  };
  const login = async () => {
    log;
    const isExist = await axios.post("/api/check", {
      email: log.username,
      password: log.password,
    });
    isExist;
    if (isExist.data.user) {
      console.log("amjilttaii");
      let token = await axios.post("/api/session", {
        _user: isExist.data.user._id,
      });
      token;
      setCookie("token", token.data.token);
      setCookie("userId", token.data._user);
      userCtx.setErr("");
      router.replace("/");
    } else {
      userCtx.setErr("Access Denid");
    }
  };
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-no-repeat bg-cover bg-[#FAFAFA]">
        <div className="block p-8 shadow-lg bg-[#FFFFFF] max-w-sm border border-gray-300 w-4/12">
          <form>
            <div className="form-group mb-6">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Email address
              </label>
              <input
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                type="email"
                className="form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label inline-block mb-2 text-gray-700"
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <div className="w-full flex justify-center items-center">
              <p className="text-red-600">{userCtx.err}</p>
            </div>
            

            <p
              onClick={() => {
                login();
              }}
              className="cursor-pointer 
px-6
py-2.5
bg-blue-600
text-white
font-medium
text-xs
flex justify-center
w-full
leading-tight
uppercase
rounded
shadow-md
hover:bg-blue-700 hover:shadow-lg
focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
active:bg-blue-800 active:shadow-lg
transition
duration-150
ease-in-out"
            >
              log in
            </p>
          </form>
        </div>
        <div className="block px-10 py-5 shadow-lg bg-[#FFFFFF] max-w-sm border border-gray-300 w-4/12 mt-4">
            <div className="flex items-center justify-center">
                Dont have an account?  
              <Link href="/register">
                <p className="mx-1 text-[#359BFB] hover:underline"> Sign up </p>
              </Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default Login;
