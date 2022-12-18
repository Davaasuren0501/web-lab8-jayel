// ./components/PieChart.js
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import Spinner from "../../spinner/spinner";
const labels = ["income", "expenditure"];

const PieChartReport = ({ withlists, userId, depolists }) => {
  const [isLoading, setLoading] = useState(false);
  const [myData, setMyData] = useState([]);
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
    let currentYear = new Date().getFullYear();
    let daaataaa = [0, 0];
    withlists.map((el, i) => {
      let obj = new Date(el.inserted);
      let year = obj.getFullYear();
      if (year === currentYear) daaataaa[0] = daaataaa[0] + el.value;
    });
    depolists.map((el, i) => {
      let obj = new Date(el.inserted);
      let year = obj.getFullYear();
      if (year === currentYear) daaataaa[1] = daaataaa[1] + el.value;
    });
    setMyData(daaataaa);
    setLoading(false);
    //   });
  }, [withlists, depolists]);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "income",
        backgroundColor: "#F48F66",
        borderColor: "#247EFF",
        data: myData,
      },
    ],
  };
  if (isLoading) return <Spinner />;
  if (!data) return <p>No data</p>;

  return (
    <div className="w-full h-[300px] md:h-[450px] flex justify-center items-center">
      <Pie data={data} height={150} />
    </div>
  );
};
export default PieChartReport;
