import React, { useState } from "react";
import IceVehicleForm from "./components/IceVehicleForm";
import EvVehicleForm from "./components/EvVehicleForm";
import CustomerUsageForm from "./components/CustomerUsageForm";
import TCOResults from "./components/TCOResults";
import axios from "axios";
import "./css/App.css";

function App() {
  // State to store inputs for ICE (Internal Combustion Engine) vehicle
  const [iceVehicle, setIceVehicle] = useState({
    price: "",
    mileage: "",
    fuelCost: ""
  });

  // State to store inputs for EV (Electric Vehicle)
  const [evVehicle, setEvVehicle] = useState({
    price: "",
    range: "",
    batteryCapacity: "",
    chargingCost: "",
    batteryReplacementCost: "",
    batteryReplacementInterval: ""
  });

  // State to store customer usage inputs
  const [customerUsage, setCustomerUsage] = useState({
    monthlyKm: "",
    years: "",
    considerBatteryReplacement: false
  });

  // State to store the results of the TCO calculation
  const [results, setResults] = useState(null);
  
  // State to handle error messages
  const [error, setError] = useState(null);

  // Function to validate input fields
  const validateInputs = () => {
    // Check if all required fields for ICE Vehicle are filled
    if (!iceVehicle.price || !iceVehicle.mileage || !iceVehicle.fuelCost) {
      return "Please fill out all ICE Vehicle fields.";
    } 
    // Check if all required fields for EV Vehicle are filled
    else if (
      !evVehicle.price ||
      !evVehicle.range ||
      !evVehicle.batteryCapacity ||
      !evVehicle.chargingCost
    ) {
      return "Please fill out all EV Vehicle fields.";
    } 
    // Check if all required fields for Customer Usage are filled
    else if (!customerUsage.monthlyKm || !customerUsage.years) {
      return "Please fill out all Customer Usage fields.";
    }
    return null; // Return null if all validations pass
  };

  // Function to calculate the Total Cost of Ownership (TCO)
  const calculateTCO = async () => {
    // Validate input fields and handle errors
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setResults(null); // Reset results if there's an error
      return;
    }

    // Try to calculate TCO by making a POST request to the API
    try {
      const response = await axios.post(
        "http://localhost:3001/api/calculate-tco",
        {
          iceVehicle,
          evVehicle,
          customerUsage
        }
      );
      setResults(response.data); // Set the results state with the API response
      setError(null); // Reset error state
    } catch (error) {
      console.error("Error calculating TCO:", error);
      setError("Error calculating TCO. Please try again."); // Set error message
      setResults(null); // Reset results on error
    }
  };

  return (
    <div className="App">
      <h1>TCO Calculator</h1>
      {/* Render forms for ICE Vehicle, EV Vehicle, and Customer Usage */}
      <IceVehicleForm iceVehicle={iceVehicle} setIceVehicle={setIceVehicle} />
      <EvVehicleForm evVehicle={evVehicle} setEvVehicle={setEvVehicle} />
      <CustomerUsageForm
        customerUsage={customerUsage}
        setCustomerUsage={setCustomerUsage}
      />
      {/* Button to trigger TCO calculation */}
      <button onClick={calculateTCO}>Calculate TCO</button>
      {/* Display error message if there is one */}
      {error && <p className="error-message">{error}</p>}
      {/* Render results if available */}
      {results && <TCOResults results={results} />}
    </div>
  );
}

export default App;
