const express = require("express");
const router = express.Router();

router.post("/calculate-tco", (req, res) => {
  const { iceVehicle, evVehicle, customerUsage } = req.body;
  const considerBatteryReplacement = customerUsage.considerBatteryReplacement === true;

  const toNumber = (value, defaultValue = 0) => {
    const num = Number(value);
    return isNaN(num) ? defaultValue : num;
  };

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
  const totalKm = monthlyKm * 12 * years;

  const iceFuelCost = (totalKm / mileage) * fuelCost;
  const iceTotalCost = icePrice + iceFuelCost;

  const evChargingCost = (totalKm / range) * batteryCapacity * chargingCost;
  const batteryReplacements = considerBatteryReplacement ? Math.floor(years / batteryReplacementInterval) : 0;
  const evBatteryReplacementCost = batteryReplacements * batteryReplacementCost;
  const evTotalCost = evPrice + evChargingCost + evBatteryReplacementCost;

  const iceYearlyCosts = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    return Math.round(icePrice + (iceFuelCost / years) * year);
  });

  const evYearlyCosts = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    let yearlyCost = evPrice + (evChargingCost / years) * year + batteryReplacementCost;
    return Math.round(yearlyCost);
  });

  const lineChartData = {
    labels: Array.from({ length: years }, (_, i) => i + 1),
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
