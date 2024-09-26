const express = require("express");
const router = express.Router();

router.post("/calculate-tco", (req, res) => {
  const { iceVehicle, evVehicle, customerUsage } = req.body;

  // Extract ICE and EV vehicle details from request
  const {
    price: icePrice,
    mileage, // Mileage in km/l
    fuelCost, // Fuel cost per liter
    maintenanceCost: iceMaintenance,
    insuranceCost: iceInsurance,
    resaleValue: iceResale
  } = iceVehicle;

  const {
    price: evPrice,
    range, // Range in km per charge
    batteryCapacity, // kWh
    chargingCost, // Charging cost per kWh
    batteryReplacementCost,
    batteryReplacementInterval,
    maintenanceCost: evMaintenance,
    insuranceCost: evInsurance,
    resaleValue: evResale
  } = evVehicle;

  const { monthlyKm, years } = customerUsage;

  // Convert input to numbers for calculations
  const monthlyKmNum = Number(monthlyKm);
  const yearsNum = Number(years);
  const fuelCostNum = Number(fuelCost);
  const iceMaintenanceNum = Number(iceMaintenance);
  const iceInsuranceNum = Number(iceInsurance);
  const iceResaleNum = Number(iceResale);
  const evMaintenanceNum = Number(evMaintenance);
  const evInsuranceNum = Number(evInsurance);
  const evResaleNum = Number(evResale);
  const batteryReplacementCostNum = Number(batteryReplacementCost);
  const batteryReplacementIntervalNum = Number(batteryReplacementInterval);

  // Validate that all inputs are numbers and valid
  const inputs = [
    icePrice,
    mileage,
    fuelCostNum,
    iceMaintenanceNum,
    iceInsuranceNum,
    iceResaleNum,
    evPrice,
    range,
    batteryCapacity,
    chargingCost,
    evMaintenanceNum,
    evInsuranceNum,
    evResaleNum,
    monthlyKmNum,
    yearsNum,
    batteryReplacementCostNum,
    batteryReplacementIntervalNum
  ];

  if (inputs.some(isNaN)) {
    return res.status(400).send("Invalid input");
  }

  // --- ICE vehicle total cost calculation ---
  // Calculate fuel cost over the years (total km driven divided by mileage, multiplied by fuel price)
  const totalKmDriven = monthlyKmNum * 12 * yearsNum; // Total kilometers driven in the given years
  const fuelCostICE = (totalKmDriven / mileage) * fuelCostNum; // Total fuel cost

  // Add up all costs for ICE: Purchase, fuel, maintenance, insurance, subtract resale value
  const totalCostICE =
    icePrice +
    fuelCostICE +
    iceMaintenanceNum * yearsNum +
    iceInsuranceNum * yearsNum -
    iceResaleNum;

  // --- EV vehicle total cost calculation ---
  // Calculate charging cost over the years (total km divided by range, multiplied by charging cost)
  const chargingCostEV =
    (totalKmDriven / range) * batteryCapacity * chargingCost;

  // Calculate battery replacements needed in the given years
  const batteryReplacements = Math.floor(
    yearsNum / batteryReplacementIntervalNum
  );

  // Add up all costs for EV: Purchase, charging, maintenance, insurance, battery replacements, subtract resale value
  const totalCostEV =
    evPrice +
    chargingCostEV +
    evMaintenanceNum * yearsNum +
    evInsuranceNum * yearsNum +
    batteryReplacements * batteryReplacementCostNum -
    evResaleNum;

  // Round the results to nearest integer (to reflect the expected format)
  const totalCostICERounded = Math.round(totalCostICE);
  const totalCostEVRounded = Math.round(totalCostEV);

  // Prepare yearly costs for both ICE and EV vehicles for line chart data (optional)
  const iceYearlyCosts = Array.from(
    { length: yearsNum },
    (_, i) =>
      icePrice +
      (fuelCostICE / yearsNum) * (i + 1) +
      iceMaintenanceNum * (i + 1) +
      iceInsuranceNum * (i + 1) -
      iceResaleNum
  );

  const evYearlyCosts = Array.from(
    { length: yearsNum },
    (_, i) =>
      evPrice +
      (chargingCostEV / yearsNum) * (i + 1) +
      evMaintenanceNum * (i + 1) +
      evInsuranceNum * (i + 1) +
      Math.floor((i + 1) / batteryReplacementIntervalNum) *
        batteryReplacementCostNum -
      evResaleNum
  );

  // Prepare line chart data (optional)
  const lineChartData = {
    labels: Array.from({ length: yearsNum }, (_, i) => i + 1),
    datasets: [
      {
        label: "ICE TCO",
        data: iceYearlyCosts,
        borderColor: "blue",
        fill: false
      },
      { label: "EV TCO", data: evYearlyCosts, borderColor: "red", fill: false }
    ]
  };

  // Prepare pie chart data for cost breakdown (optional)
  const pieChartData = {
    labels: [
      "Purchase",
      "Fuel/Charging",
      "Maintenance",
      "Insurance",
      "Battery Replacement"
    ],
    datasets: [
      {
        label: "ICE Cost Breakdown",
        data: [
          icePrice,
          fuelCostICE,
          iceMaintenanceNum * yearsNum,
          iceInsuranceNum * yearsNum
        ],
        backgroundColor: ["blue", "orange", "gray", "purple"]
      },
      {
        label: "EV Cost Breakdown",
        data: [
          evPrice,
          chargingCostEV,
          evMaintenanceNum * yearsNum,
          evInsuranceNum * yearsNum,
          batteryReplacements * batteryReplacementCostNum
        ],
        backgroundColor: ["red", "green", "gray", "yellow", "cyan"]
      }
    ]
  };

  // Respond with chart data and total costs
  res.json({
    lineChartData,
    pieChartData,
    totalCostICE: totalCostICERounded,
    totalCostEV: totalCostEVRounded
  });
});

module.exports = router;
