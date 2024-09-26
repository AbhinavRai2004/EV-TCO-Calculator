import React, { useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import "../css/TCOResults.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TCOResults = ({ results }) => {
  useEffect(() => {}, [results]);

  const { lineChartData, pieChartData, totalCostICE, totalCostEV } = results;

  return (
    <div className="results-container">
      <h2 className="results-heading">Total Cost of Ownership Results</h2>
      <p>Total Cost for ICE Vehicle: Rs {totalCostICE}</p>
      <p>Total Cost for EV Vehicle: Rs {totalCostEV}</p>
      <div className="charts-wrapper">
        <div className="chart-container">
          <h3 className="results-subheading">
            ICE vs EV TCO Comparison (Line Chart)
          </h3>

          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
        <div className="chart-separator"></div>
        <div className="chart-container">
          <h3 className="results-subheading">Cost Breakdown (Pie Chart)</h3>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default TCOResults;
