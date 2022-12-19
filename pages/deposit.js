import Layout from "../components/layout/layout";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
import DepoForm from "../components/deposit/depo-form/depo-form";
import DepoListItem from "../components/deposit/depo-list-item/depo-list-item";
import DepoModal from "../components/deposit/depo-modal/depo-modal";
import DepoChartModal from "../components/deposit/depo-chart-modal/depo-chart-modal";
export const getServerSideProps = async (req, res) => {
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);
  let deposities = await fetch(
    `${
      process.env.NODE_ENV != "production"
        ? "http://localhost:3000"
        : "https://web-last-2lyd.vercel.app"
    }/api/depo-list/${userId}`
  );
  deposities = await deposities.json();
  return {
    props: {
      token: token ? token : false,
      userId: userId ? userId : false,
      deposities: deposities == [] ? [] : deposities,
    },
  };
};
const Deposit = ({ token, userId, deposities }) => {
  const [hidden, setHidden] = useState(true);
  const [list, setList] = useState(deposities);
  const [needData, setNeedData] = useState(false);
  const router = useRouter();
  const [deposit, setDeposit] = useState({
    value: 0,
    description: "",
    category: "",
    date: "",
  });
  useEffect(() => {
    if (token === false) {
      router.replace("/login");
      return;
    }
    fetch(`api/depo-list/${userId}`)
      .then((data) => data.json())
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setNeedData(false);
  }, [needData]);
  const changeList = async () => {
    let res;
    res = await fetch(`api/depo-list/${userId}`);
    res = await res.json();
    res;
    setList(res);
  };
  const addDeposit = async () => {
    const userId = getCookie("userId");
    if (deposit.value === 0 || deposit.category === "" || deposit.date === "") {
      alert("та мэдээллээ бүрэн гүйцэт оруулна уу");
      return;
    }
    axios
      .post("/api/depo-lists", {
        value: deposit.value,
        description: deposit.description,
        category: deposit.category,
        type: "DEPOSIT",
        inserted: deposit.date,
        _user: userId,
      })
      .then((res) => {
        res;
      })
      .catch((err) => {
        err;
      });
    setNeedData(true);
    setDeposit({ value: 0, description: "", category: "", date: "" });
  };
  const changeValue = (value) => {
    setDeposit({ ...deposit, value: value });
  };
  const changeDescription = (description) => {
    setDeposit({ ...deposit, description: description });
  };
  const changeCategory = (category) => {
    setDeposit({ ...deposit, category: category });
    deposit;
  };
  const changeDate = (date) => {
    setDeposit({ ...deposit, date: date });
    deposit.date;
  };
  return token ? (
    <Layout>
      <DepoChartModal
        hidden={hidden}
        setHidden={setHidden}
        userId={userId}
        list={list}
      />
      <DepoModal
        changeDate={changeDate}
        changeCategory={changeCategory}
        changeDescription={changeDescription}
        changeValue={changeValue}
        addDeposit={addDeposit}
        deposit={deposit}
      />
      <div className="w-2/3">
        <div className=" flex justify-end ">
          <button
            type="button"
            className="inline-block w-2/12 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter"
          >
            Add Expenditure
          </button>
          <button
            onClick={() => {
              setHidden(false);
            }}
            type="button"
            className="inline-block mx-2 w-2/12 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Chart
          </button>
        </div>
        <div className="h-[700px] overflow-scroll overflow-x-hidden scrollbar scrollbar-thumb-gray-200 scrollbar-track-white">
          {list.length != 0 ? (
            list.map((el, i) => (
              <DepoListItem setNeedData={setNeedData} el={el} key={i} />
            ))
          ) : (
            <div></div>
          )}
          {list.length === 0 ? (
            <div className=" mt-36 text-3xl text-center">
              You currently have no expenditure
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Layout>
  ) : (
    <div></div>
  );
};

export default Deposit;
