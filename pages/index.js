import axios from "axios";
import { getCookie } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import WithChartModal from "../components/withdraw/with-chart-modal/with-chart-modal";
import WithListItem from "../components/withdraw/with-list-item/with-list-item";
import WithModal from "../components/withdraw/with-modal/with-modal";
import styles from "../styles/Home.module.css";
export const getServerSideProps = async (req, res) => {
  let withdraws = [];
  const token = getCookie("token", req, res);
  const userId = getCookie("userId", req, res);
  // console.log(req);

  if (userId == undefined) {
    withdraws = [];
  } else {

    console.log(process.env.PORT)
    withdraws = await fetch(
      `${
        process.env.NODE_ENV != "production"
          ? "http://localhost:3000"
          : "https://web-last-2lyd.vercel.app"
      }/api/with-list/${userId}`
    );
    withdraws = await withdraws.json();
    console.log("working",withdraws)
  }
  if (typeof withdraws === "object" && withdraws.length === 0) {
    withdraws = [];
  }
  // console.log(withdraws)
  return {
    props: {
      token: token ? token : false,
      userId: userId ? userId : false,
      withdraws: withdraws.length === 0 ? [] : withdraws,
    },
  };
};
export default function Home({ token, userId, withdraws, req }) {
  // console.log(req);
  const router = useRouter();
  const [list, setList] = useState(withdraws);
  const [hidden, setHidden] = useState(true);
  const [needData, setNeedData] = useState(false);
  list;

  const [withdraw, setWithdraw] = useState({
    value: 0,
    description: "",
    category: "",
    date: "",
  });
  token;
  useEffect(() => {
    if (token === false) {
      router.replace("/login");
      return;
    }
    fetch(`api/with-list/${userId}`)
      .then((data) => data.json())
      .then((res) => {
        setList(res);
        // console.log(res)
      })
      .catch((err) => {
        console.log("userSideC",err);
      });
    setNeedData(false);
  }, [needData]);
  const changeList = async () => {
    let res;
    res = await fetch(`api/with-list/${userId}`);
    res = await res.json();
    res;
    setList(res);
  };
  const addWithDraw = async () => {
    const userId = getCookie("userId");
    if (
      withdraw.value === 0 ||
      withdraw.category === "" ||
      withdraw.date === ""
    ) {
      alert("та мэдээллээ бүрэн гүйцэт оруулна уу");
      return;
    }
    axios
      .post("/api/with-lists", {
        value: withdraw.value,
        description: withdraw.description,
        category: withdraw.category,
        type: "WITHDRAW",
        inserted: withdraw.date,
        _user: userId,
      })
      .then((res) => {
        //  console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setNeedData(true);
    setWithdraw({ value: 0, description: "", category: "", date: "" });
  };
  const changeValue = (value) => {
    setWithdraw({ ...withdraw, value: value });
  };
  const changeDescription = (description) => {
    setWithdraw({ ...withdraw, description: description });
  };
  const changeDate = (date) => {
    setWithdraw({ ...withdraw, date: date });
    withdraw.date;
  };
  const changeCategory = (category) => {
    setWithdraw({ ...withdraw, category: category });

    withdraw.category;
  };
  return token ? (
    <Layout>
      <WithChartModal
        hidden={hidden}
        setHidden={setHidden}
        userId={userId}
        list={list}
      />
      <WithModal
        changeCategory={changeCategory}
        changeDate={changeDate}
        hidden={false}
        changeValue={changeValue}
        changeDescription={changeDescription}
        addWithDraw={addWithDraw}
        withdraw={withdraw}
      />
      <div className="w-2/3 ">
        <div className=" flex justify-end">
          <button
            type="button"
            className="inline-block mx-2 w-2/12 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter"
          >
            Add Income
          </button>
          {/* <button
            onClick={() => {
              setHidden(false);
            }}
            type="button"
            className="inline-block mx-2 w-2/12 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Chart
          </button> */}
        </div>

        <div className="h-[700px] overflow-scroll overflow-x-hidden scrollbar scrollbar-thumb-gray-200 scrollbar-track-white">
          {list.length != 0 ? (
            list.map((el, i) => {
              if (el.type == "WITHDRAW") {
                return (
                  <WithListItem setNeedData={setNeedData} el={el} key={i} />
                );
              }
            })
          ) : (
            <div></div>
          )}
          {list.length === 0 ? (
            <div className=" mt-36 text-3xl text-center">
              You currently have no income.
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
}
