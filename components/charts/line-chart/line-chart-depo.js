// ./components/LineChart.js

import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineChartDepo = ({ list, userId }) => {
  const [myData, setMyData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  //   const fetchData = async () => {
  //

  //     lists = await lists.json();
  //     setMyData(lists);
  //   };
  useEffect(() => {
    setLoading(true);
    // fetch(`/api/with-list/${userId}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    let daaataaa = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    list.map((el, i) => {
      let obj = new Date(el.inserted);
      let month = obj.getMonth();

      let year = obj.getFullYear();
      let currentYear = new Date().getFullYear();
      if (month === 1 && year === currentYear) {
        daaataaa[1] = daaataaa[1] + el.value;
      } else if (month === 2 && year === currentYear) {
        daaataaa[2] = daaataaa[2] + el.value;
      } else if (month === 3 && year === currentYear) {
        daaataaa[3] = daaataaa[3] + el.value;
      } else if (month === 4 && year === currentYear) {
        daaataaa[4] = daaataaa[4] + el.value;
      } else if (month === 5 && year === currentYear) {
        daaataaa[5] = daaataaa[5] + el.value;
      } else if (month === 6 && year === currentYear) {
        daaataaa[6] = daaataaa[6] + el.value;
      } else if (month === 7 && year === currentYear) {
        daaataaa[7] = daaataaa[7] + el.value;
      } else if (month === 8 && year === currentYear) {
        daaataaa[8] = daaataaa[8] + el.value;
      } else if (month === 9 && year === currentYear) {
        daaataaa[9] = daaataaa[9] + el.value;
      } else if (month === 10 && year === currentYear) {
        daaataaa[10] = daaataaa[10] + el.value;
      } else if (month === 11 && year === currentYear) {
        daaataaa[11] = daaataaa[11] + el.value;
      } else if (month === 12 && year === currentYear) {
        daaataaa[12] = daaataaa[12] + el.value;
      }

      //   if (el.category === "цалин") {
      //     daaataaa[0] = daaataaa[0] + el.value;
      //   } else if (el.category === "бусад") {
      //     daaataaa[2] = daaataaa[2] + el.value;
      //   } else if (el.category === "нэмэлт") {
      //     daaataaa[1] = daaataaa[1] + el.value;
      //   }
    });
    daaataaa;
    setMyData(daaataaa);
    setLoading(false);
    //   });
  }, [list]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "expenditure",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: myData,
      },
    ],
  };

  return (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Line data={data} />
    </div>
  );
};

export default LineChartDepo;
