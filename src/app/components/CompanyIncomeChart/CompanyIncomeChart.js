"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChartButton from "../ChartButton/ChartButton";
import Toggle3DButton from "../Toggle3DButton/Toggle3DButton";

export default function CompanyIncome() {
  const initialData = [
    [1965, 360202],
    [1966, 400123],
    [1967, 460331],
    [1968, 460346],
    [1969, 460339],
    [1970, 460370],
  ];

  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([...initialData]);
  const [toggle3D, setToggle3D] = useState(false);

  useEffect(() => {
    // Dynamically import Highcharts and its 3D module
    import("highcharts/highcharts-3d").then((Highcharts3D) => {
      import("highcharts").then((Highcharts) => {
        Highcharts3D.default(Highcharts.default);

        chartRef.current = Highcharts.default.chart("chart-container", {
          colors: ["#F3F7FB", "#F3F7FB"],
          chart: {
            style: {
              fontFamily: ["Prompt", "sans-serif"],
              fontSize: "16px",
            },
            type: "column",
            options3d: {
              enabled: toggle3D,
              alpha: 10,
              beta: 25,
              depth: 70,
              viewDistance: 25,
            },
            backgroundColor: {
              linearGradient: [0, 0, 500, 500],
              stops: [
                [0, "rgb(128, 130, 221)"],
                [1, "rgb(128, 130, 221)"],
              ],
            },
          },
          title: {
            text: "COMPANY ANNUAL INCOME",
            style: {
              fontSize: "27px",
            },
          },
          xAxis: {
            title: {
              text: "Year",
              style: {
                color: "white",
              },
            },
            labels: {
              style: {
                color: "white",
              },
            },
            type: "category",
          },
          yAxis: {
            title: {
              text: "Income",
              style: {
                color: "white",
              },
            },
            labels: {
              style: {
                color: "white",
              },
            },
            min: 0,
          },
          credits: {
            text: "",
          },
          series: [
            {
              name: "Income",
              data: chartData,
            },
          ],
          animation: {
            duration: 100,
          },
        });
      });
    });

    const interval = setInterval(async () => {
      try {
        const response = await axios.get("/api/pusher");
        const newDataPoint = [
          chartData[chartData.length - 1][0] + 1,
          response.data.value,
        ];
        chartRef.current.series[0].addPoint(newDataPoint, true, true);
        setChartData((prevData) => [...prevData, newDataPoint]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      // Every ten seconds, the setInterval method will get data from the API because its value is set to ten seconds. Pusher's free plans are limited to 200,000 messages a day, so be careful while reducing the interval or you risk exceeding your limit too soon.
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [toggle3D]);

  return (
    <div>
      <div id="chart-container" className="w-full h-96"></div>
      <div className="border-solid border-2 border-indigo-500 m-10">
        <div className="grid justify-center mt-5 text-center">
          <p>3D Mode</p>
          <div className="w-20">
            <Toggle3DButton toggle3D={toggle3D} setToggle3D={setToggle3D} />
          </div>
        </div>
        <div className="grid gap-4 justify-center mt-5 xl:grid-cols-3 p-4">
          <ChartButton chartRef={chartRef} type={"area"} name={"Area Chart"} />
          <ChartButton chartRef={chartRef} type={"bar"} name={"Bar Chart"} />
          <ChartButton chartRef={chartRef} type={"line"} name={"Line Chart"} />
        </div>
      </div>
    </div>
  );
}
