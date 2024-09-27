const express = require("express");
const router = express.Router();

// POST route to calculate Total Cost of Ownership (TCO)
router.post("/calculate-tco", (req, res) => {
  const { iceVehicle, evVehicle, customerUsage } = req.body; // Destructure incoming vehicle data
  const considerBatteryReplacement =
    customerUsage.considerBatteryReplacement === true; // Determine if battery replacement should be considered

  // Helper function to convert values to numbers with a default value
  const toNumber = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num; // Return default if conversion fails
  };

  // Extract and convert input values
  const icePrice = toNumber(iceVehicle.price);
  const mileage = toNumber(iceVehicle.mileage, 1);
  const fuelCost = toNumber(iceVehicle.fuelCost);

  const evPrice = toNumber(evVehicle.price);
  const range = toNumber(evVehicle.range, 1);
  const batteryCapacity = toNumber(evVehicle.batteryCapacity);
  const chargingCost = toNumber(evVehicle.chargingCost);
  const batteryReplacementCost = toNumber(evVehicle.batteryReplacementCost);
  const batteryReplacementInterval = toNumber(evVehicle.batteryReplacementInterval, 1);

  const monthlyKm = toNumber(customerUsage.monthlyKm);
  const years = toNumber(customerUsage.years, 1);
  const totalKm = monthlyKm * 12 * years; // Calculate total kilometers driven over the years

  // Calculate ICE vehicle costs
  const iceFuelCost = (totalKm / mileage) * fuelCost; // Calculate total fuel cost for ICE
  const iceTotalCost = icePrice + iceFuelCost; // Calculate total cost for ICE

  // Calculate EV vehicle costs
  const evChargingCost = (totalKm / range) * batteryCapacity * chargingCost; // Calculate charging cost
  const batteryReplacements = considerBatteryReplacement ? Math.floor(years / batteryReplacementInterval) : 0; // Calculate number of battery replacements
  const evBatteryReplacementCost = batteryReplacements * batteryReplacementCost; // Total battery replacement cost
  const evTotalCost = evPrice + evChargingCost + evBatteryReplacementCost; // Calculate total cost for EV

  // Calculate yearly costs for ICE vehicles
  const iceYearlyCosts = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    return Math.round(icePrice + (iceFuelCost / years) * year); // Distribute fuel cost across years
  });

  // Calculate yearly costs for EV vehicles
  const evYearlyCosts = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    let yearlyCost = evPrice + (evChargingCost / years) * year + batteryReplacementCost; // Include battery replacement cost in the yearly cost
    return Math.round(yearlyCost);
  });

  // Prepare data for line chart
  const lineChartData = {
    labels: Array.from({ length: years }, (_, i) => i + 1), // Year labels
    datasets: [
      {
        label: "ICE TCO",
        data: iceYearlyCosts, // Yearly costs for ICE
        borderColor: "blue", // Line color for ICE
        fill: false,
        tension: 0.1,
      },
      {
        label: "EV TCO",
        data: evYearlyCosts, // Yearly costs for EV
        borderColor: "green", // Line color for EV
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Prepare data for pie chart
  const pieChartData = {
    datasets: [
      {
        label: "ICE Cost Breakdown",
        data: [icePrice, iceFuelCost], // Data for ICE cost breakdown
        backgroundColor: ["blue", "orange"], // Colors for ICE segments
      },
      {
        label: "EV Cost Breakdown",
        data: [evPrice, evChargingCost, evBatteryReplacementCost], // Data for EV cost breakdown
        backgroundColor: ["green", "yellow", "magenta"], // Colors for EV segments
      },
    ],
  };

  // Round total costs for both vehicle types
  const totalCostICERounded = Math.round(iceTotalCost);
  const totalCostEVRounded = Math.round(evTotalCost);

  // Respond with calculated data
  res.json({
    lineChartData,
    pieChartData,
    totalCostICE: totalCostICERounded, // Total cost for ICE
    totalCostEV: totalCostEVRounded, // Total cost for EV
  });
});

module.exports = router; // Export the router for use in the main app
