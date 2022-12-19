import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
const Layout = ({ children }) => {

  const router = useRouter();
  console.log('====================================');
  console.log( );
  console.log('====================================');
  const [ name, nameSet ] = useState( router.pathname );
const signOut = () => {
  deleteSession();
  deleteCookie("token");
  deleteCookie("userId");
  router.replace("/login");
};
const deleteSession = async () => {
  const token = getCookie("token");
  token;
  axios
    .delete(`/api/get-session/${token}`)
    .then((res) => {
      res;
    })
    .catch((err) => {
      err;
    });
};
  return (
    <div
      className=" flex h-screen items-center justify-center bg-[#FAD6C9]"
    >
      <div className="flex border rounded-2xl  w-10/12 h-5/6 bg-[#EFF1F5]">
        <div className="w-1/5 bg-[#F9FBFC] rounded-2xl flex flex-col items-center justify-between">
          <div className="h-1/6 flex items-center justify-center text-2xl text-blue-600 font-sans">
            Hello Dear
          </div>
          <div className="h-3/6 w-1/2 flex flex-col items-end justify-start">
          <Link href="/">
          <p
            className={`hover:text-gray-400 duration-200  ${
              name === "/" ? "text-blue-500 font-bold" : ""
            }`}
          >
            Income
          </p>
        </Link>
        <Link href="/deposit">
          <p
            className={`hover:text-gray-400 duration-200 mt-6${
              name === "/deposit" ? "text-blue-500 mt-6 font-bold text-blue-500" : ""
            }`}
          >
            Expenditure
          </p>
        </Link>
        <Link href="/report">
          <p
            className={`hover:text-gray-400 duration-200 mt-6 ${
              name === "/report" ? "text-blue-500 font-bold" : ""
            }`}
          >
            Plan
          </p>
        </Link>
          </div>
          <div className="h-1/6 flex items-center justify-center cursor-pointer text-gray-500" onClick={() => {
              signOut();
            }}>
            log out
          </div>
        </div>
        <main className="px-auto flex justify-center items-center w-full flex-col md:flex-row ">
          {children}
        </main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
