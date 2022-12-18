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
const LineChartReport = ({ withlists, userId, depolists }) => {
  console.log(depolists);
  const [myDatawith, setMyDatawith] = useState([]);
  const [myDatadepo, setMyDatadepo] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //   const fetchData = async () => {
  //

  //     lists = await lists.json();
  //     setMyData(lists);
  //   };
  useEffect(() => {
    setLoading(true);
    fetch(`/api/with-list/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        let daaataaawith = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let daaataaadepo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        depolists.length === 0
          ? (daaataaadepo = daaataaadepo)
          : depolists.map(
              (el, i) => {
                let obj = new Date(el.inserted);
                let month = obj.getMonth();

                let year = obj.getFullYear();
                let currentYear = new Date().getFullYear();
                if (month === 1 && year === currentYear) {
                  daaataaadepo[1] = daaataaadepo[1] + el.value;
                } else if (month === 2 && year === currentYear) {
                  daaataaadepo[2] = daaataaadepo[2] + el.value;
                } else if (month === 3 && year === currentYear) {
                  daaataaadepo[3] = daaataaadepo[3] + el.value;
                } else if (month === 4 && year === currentYear) {
                  daaataaadepo[4] = daaataaadepo[4] + el.value;
                } else if (month === 5 && year === currentYear) {
                  daaataaadepo[5] = daaataaadepo[5] + el.value;
                } else if (month === 6 && year === currentYear) {
                  daaataaadepo[6] = daaataaadepo[6] + el.value;
                } else if (month === 7 && year === currentYear) {
                  daaataaadepo[7] = daaataaadepo[7] + el.value;
                } else if (month === 8 && year === currentYear) {
                  daaataaadepo[8] = daaataaadepo[8] + el.value;
                } else if (month === 9 && year === currentYear) {
                  daaataaadepo[9] = daaataaadepo[9] + el.value;
                } else if (month === 10 && year === currentYear) {
                  daaataaadepo[10] = daaataaadepo[10] + el.value;
                } else if (month === 11 && year === currentYear) {
                  daaataaadepo[11] = daaataaadepo[11] + el.value;
                } else if (month === 12 && year === currentYear) {
                  daaataaadepo[12] = daaataaadepo[12] + el.value;
                }
                //   (month);
                //   if (el.category === "цалин") {
                //     daaataaawith[0] = daaataaawith[0] + el.value;
                //   } else if (el.category === "бусад") {
                //     daaataaawith[2] = daaataaawith[2] + el.value;
                //   } else if (el.category === "нэмэлт") {
                //     daaataaawith[1] = daaataaawith[1] + el.value;
                //   }
                //   (el.category);
              },
              [depolists, withlists]
            );
        withlists.map((el, i) => {
          el.inserted;
          let obj = new Date(el.inserted);
          let month = obj.getMonth();

          let year = obj.getFullYear();
          let currentYear = new Date().getFullYear();
          currentYear;
          if (month === 1 && year === currentYear) {
            daaataaawith[1] = daaataaawith[1] + el.value;
          } else if (month === 2 && year === currentYear) {
            daaataaawith[2] = daaataaawith[2] + el.value;
          } else if (month === 3 && year === currentYear) {
            daaataaawith[3] = daaataaawith[3] + el.value;
          } else if (month === 4 && year === currentYear) {
            daaataaawith[4] = daaataaawith[4] + el.value;
          } else if (month === 5 && year === currentYear) {
            daaataaawith[5] = daaataaawith[5] + el.value;
          } else if (month === 6 && year === currentYear) {
            daaataaawith[6] = daaataaawith[6] + el.value;
          } else if (month === 7 && year === currentYear) {
            daaataaawith[7] = daaataaawith[7] + el.value;
          } else if (month === 8 && year === currentYear) {
            daaataaawith[8] = daaataaawith[8] + el.value;
          } else if (month === 9 && year === currentYear) {
            daaataaawith[9] = daaataaawith[9] + el.value;
          } else if (month === 10 && year === currentYear) {
            daaataaawith[10] = daaataaawith[10] + el.value;
          } else if (month === 11 && year === currentYear) {
            daaataaawith[11] = daaataaawith[11] + el.value;
          } else if (month === 12 && year === currentYear) {
            daaataaawith[12] = daaataaawith[12] + el.value;
          }
          //   (month);
          //   if (el.category === "цалин") {
          //     daaataaawith[0] = daaataaawith[0] + el.value;
          //   } else if (el.category === "бусад") {
          //     daaataaawith[2] = daaataaawith[2] + el.value;
          //   } else if (el.category === "нэмэлт") {
          //     daaataaawith[1] = daaataaawith[1] + el.value;
          //   }
          //   (el.category);
        });
        setMyDatawith(daaataaawith);
        setMyDatadepo(daaataaadepo);
        setLoading(false);
      });
  }, [withlists, depolists]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "income",
        backgroundColor: "rgb(112, 219, 86)",
        borderColor: "rgb(112, 219, 86)",
        data: myDatawith,
      },
      {
        label: "expenditure",
        backgroundColor: "rgb(222, 64, 85)",
        borderColor: "rgb(222, 64, 85)",
        data: myDatadepo,
      },
    ],
  };

  return (
    <div className="w-full h-[300px] md:h-[300px] flex justify-center items-center">
      <Line data={data} />
    </div>
  );
};

export default LineChartReport;
