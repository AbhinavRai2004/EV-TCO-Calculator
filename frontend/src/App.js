import React, { useState } from 'react';
import IceVehicleForm from './components/IceVehicleForm';
import EvVehicleForm from './components/EvVehicleForm';
import CustomerUsageForm from './components/CustomerUsageForm';
import TCOResults from './components/TCOResults';
import axios from 'axios';
import './App.css'; 

function App() {
  const [iceVehicle, setIceVehicle] = useState({
    price: '',
    mileage: '',
    fuelCost: '',
  });

  const [evVehicle, setEvVehicle] = useState({
    price: '',
    range: '',
    batteryCapacity: '',
    chargingCost: '',
    batteryReplacementCost: '',
    batteryReplacementInterval: '',
  });

  const [customerUsage, setCustomerUsage] = useState({
    monthlyKm: '',
    years: '',
    considerBatteryReplacement: false,
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const calculateTCO = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/calculate-tco', {
        iceVehicle,
        evVehicle,
        customerUsage,
      });
      setResults(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error calculating TCO:', error);
      setError('Error calculating TCO. Please try again.'); // Set error state
      setResults(null); // Clear results on error
    }
  };

  return (
    <div className="App">
      <h1>TCO Calculator</h1>
      <IceVehicleForm iceVehicle={iceVehicle} setIceVehicle={setIceVehicle} />
      <EvVehicleForm evVehicle={evVehicle} setEvVehicle={setEvVehicle} />
      <CustomerUsageForm customerUsage={customerUsage} setCustomerUsage={setCustomerUsage} />
      <button onClick={calculateTCO}>Calculate TCO</button>
      {error && <p className="error-message">{error}</p>}
      {results && <TCOResults results={results} />}
    </div>
  );
}

export default App;
