import React from "react";
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

// Register necessary Chart.js components for rendering charts
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

// TCOResults component to display the total cost of ownership results
const TCOResults = ({ results }) => {
  // Destructure the results for easier access to data
  const { lineChartData, pieChartData, totalCostICE, totalCostEV } = results;

  return (
    <div className="results-container"> {/* Container for results */}
      <h2 className="results-heading">Total Cost of Ownership Results</h2>
      <p>Total Cost for ICE Vehicle: Rs {totalCostICE}</p> {/* Display total cost for ICE vehicle */}
      <p>Total Cost for EV Vehicle: Rs {totalCostEV}</p> {/* Display total cost for EV vehicle */}
      <div className="charts-wrapper"> {/* Wrapper for charts */}
        <div className="chart-container"> {/* Container for line chart */}
          <h3 className="results-subheading">
            ICE vs EV TCO Comparison (Line Chart)
          </h3>
          <Line data={lineChartData} options={{ responsive: true }} /> {/* Render line chart */}
        </div>
        <div className="chart-separator"></div> {/* Separator between charts */}
        <div className="chart-container"> {/* Container for pie chart */}
          <h3 className="results-subheading">Cost Breakdown (Pie Chart)</h3>
          <Pie data={pieChartData} options={{ responsive: true }} /> {/* Render pie chart */}
        </div>
      </div>
    </div>
  );
};

export default TCOResults;
