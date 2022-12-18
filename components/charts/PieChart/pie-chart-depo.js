// ./components/PieChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Spinner from "../../spinner/spinner";
const labels = ["хүнс", "зээл", "төлбөр", "бусад"];

const PieChartDepo = ({ userId, list }) => {
  const [myData, setMyData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  //   const fetchData = async () => {
  //

  //     lists = await lists.json();
  //     setMyData(lists);
  //   };
  useEffect(() => {
    setLoading(true);
    // fetch(`http://localhost:3000/api/with-list/${userId}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    let daaataaa = [0, 0, 0, 0];
    let currentYear = new Date().getFullYear();

    list.map((el, i) => {
      let obj = new Date(el.inserted);
      let month = obj.getMonth();
      let year = obj.getFullYear();
      if (year === currentYear) {
        if (el.category === "хүнс") {
          daaataaa[0] = daaataaa[0] + el.value;
        } else if (el.category === "зээл") {
          daaataaa[1] = daaataaa[1] + el.value;
        } else if (el.category === "төлбөр") {
          daaataaa[2] = daaataaa[2] + el.value;
        } else if (el.category === "бусад") {
          daaataaa[3] = daaataaa[3] + el.value;
        }
      }
    });
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
        borderColor: "rgb(0,0,255)",
        data: myData,
      },
    ],
  };
  if (isLoading) return <Spinner />;
  if (!data) return <p>No data</p>;

  return (
    <div className="w-full h-[400px] flex justify-center items-center">
      <Pie data={data} height={150} />
    </div>
  );
};
export default PieChartDepo;
