const express = require("express");
const router = express.Router();

router.post("/calculate-tco", (req, res) => {
  const { iceVehicle, evVehicle, customerUsage, considerBatteryReplacement } =
    req.body;

  const toNumber = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

  // ICE vehicle data
  const icePrice = toNumber(iceVehicle.price);
  const mileage = toNumber(iceVehicle.mileage, 1); // km/l
  const fuelCost = toNumber(iceVehicle.fuelCost);

  // EV vehicle data
  const evPrice = toNumber(evVehicle.price);
  const range = toNumber(evVehicle.range, 1); // km per charge
  const batteryCapacity = toNumber(evVehicle.batteryCapacity);
  const chargingCost = toNumber(evVehicle.chargingCost);
  const batteryReplacementCost = toNumber(evVehicle.batteryReplacementCost);
  const batteryReplacementInterval = toNumber(
    evVehicle.batteryReplacementInterval,
    1
  );

  // Customer usage data
  const monthlyKm = toNumber(customerUsage.monthlyKm);
  const years = toNumber(customerUsage.years, 1);

  // Calculate total distance
  const totalKm = monthlyKm * 12 * years;

  // ICE vehicle calculations
  const iceFuelCost = (totalKm / mileage) * fuelCost;
  const iceTotalCost = icePrice + iceFuelCost;

  // EV vehicle calculations
  const evChargingCost = (totalKm / range) * batteryCapacity * chargingCost;
  const batteryReplacements = considerBatteryReplacement
    ? Math.floor(years / batteryReplacementInterval)
    : 0;
  const evBatteryReplacementCost = batteryReplacements * batteryReplacementCost;
  const evTotalCost = evPrice + evChargingCost + evBatteryReplacementCost;

  // Prepare yearly costs for line chart
  const iceYearlyCosts = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    return Math.round(icePrice + (iceFuelCost / years) * year);
  });

  const evYearlyCosts = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    let yearlyCost = evPrice + (evChargingCost / years) * year;

    // Add battery replacement cost at the correct interval (e.g., every 6 years)
    if (considerBatteryReplacement && year % batteryReplacementInterval === 0) {
      yearlyCost += batteryReplacementCost;
    }

    return Math.round(yearlyCost);
  });

  // Prepare chart data
  const lineChartData = {
    labels: Array.from({ length: years }, (_, i) => i + 1), // Yearly labels
    datasets: [
      {
        label: "ICE TCO",
        data: iceYearlyCosts,
        borderColor: "blue",
        fill: false,
        tension: 0.1
      },
      {
        label: "EV TCO",
        data: evYearlyCosts,
        borderColor: "green",
        fill: false,
        tension: 0.1
      }
    ]
  };

  const pieChartData = {
    labels: ["Purchase", "Fuel/Charging", "Battery Replacement"],
    datasets: [
      {
        label: "ICE Cost Breakdown",
        data: [icePrice, iceFuelCost, 0],
        backgroundColor: ["blue", "orange", "gray"]
      },
      {
        label: "EV Cost Breakdown",
        data: [evPrice, evChargingCost, evBatteryReplacementCost],
        backgroundColor: ["green", "yellow", "magenta"]
      }
    ]
  };

  // Round final results
  const totalCostICERounded = Math.round(iceTotalCost);
  const totalCostEVRounded = Math.round(evTotalCost);

  res.json({
    lineChartData,
    pieChartData,
    totalCostICE: totalCostICERounded,
    totalCostEV: totalCostEVRounded
  });
});

module.exports = router;
