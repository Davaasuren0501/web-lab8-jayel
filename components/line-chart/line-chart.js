import React from "react";
import Chart from "chart.js";
import { useEffect } from "react";
import { useRef } from "react";
const CardLineChart = () => {
  const canvasEl = useRef(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    green: {
      default: "rgba(37, 180, 125, 0.8)",
      half: "rgba(59, 223, 160, 0.8)",
      quarter: "rgba(35, 206, 140, 0.8)",
      zero: "rgba(126, 213, 179, 0.8)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");
    // const ctx = document.getElementById("myChart");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    const green = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);
    green.addColorStop(1, colors.green.zero);
    green.addColorStop(0.65, colors.green.quarter);
    green.addColorStop(1, colors.green.zero);
    const weight = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2];
    const weight1 = [60.0, 60.2, 59.6, 32, 59.9, 60.2, 74, 58.6, 59.6, 59.2];
    const labels = [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
      "Week 7",
      "Week 8",
      "Week 9",
      "Week 10",
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "income",
          data: weight,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
        {
          backgroundColor: green,
          label: "expenditure",
          data: weight1,
          fill: true,
          borderWidth: 2,
          borderColor: colors.green.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.green.default,
          pointRadius: 3,
        },
      ],
    };
    const config = {
      type: "line",
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <span>Chart.js Demo</span>
        <canvas id="myChart" ref={canvasEl} height="100" />
      </div>
    </>
  );
};

export default CardLineChart;
