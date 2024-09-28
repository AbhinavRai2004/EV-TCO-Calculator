import React from 'react';
import '../css/Form.css';

// EvVehicleForm component to capture user input for Electric Vehicle details

const EvVehicleForm = ({ evVehicle, setEvVehicle }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setEvVehicle({ ...evVehicle, [name]: value });
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">EV Vehicle</h2> 
      
      {/* Input field for EV Price */}
      <div className="form-group">
        <label className="form-label">EV Price</label>
        <input
          type="number" 
          className="form-input"
          placeholder="EV Price"
          name="price" 
          value={evVehicle.price}
          onChange={handleInputChange} 
        />
      </div>
      
      {/* Input field for True Range in Km */}
      <div className="form-group">
        <label className="form-label">True Range (Km)</label>
        <input
          type="number"
          className="form-input"
          placeholder="True Range (Km)"
          name="range" 
          value={evVehicle.range} 
          onChange={handleInputChange}
        />
      </div>
      
      {/* Input field for Battery Capacity in kWh */}
      <div className="form-group">
        <label className="form-label">Battery Capacity (kWh)</label>
        <input
          type="number" 
          className="form-input"
          placeholder="Battery Capacity (kWh)"
          name="batteryCapacity" 
          value={evVehicle.batteryCapacity} 
          onChange={handleInputChange} 
        />
      </div>
      
      {/* Input field for Charging Cost in Rs/kWh */}
      <div className="form-group">
        <label className="form-label">Charging Cost (Rs/kWh)</label>
        <input
          type="number" 
          className="form-input"
          placeholder="Charging Cost (Rs/kWh)"
          name="chargingCost" 
          value={evVehicle.chargingCost} 
          onChange={handleInputChange} 
        />
      </div>
      
      {/* Input field for Battery Replacement Cost */}
      <div className="form-group">
        <label className="form-label">Battery Replacement Cost</label>
        <input
          type="number"
          className="form-input"
          placeholder="Battery Replacement Cost"
          name="batteryReplacementCost" 
          value={evVehicle.batteryReplacementCost}
          onChange={handleInputChange} 
        />
      </div>
      
      {/* Input field for Battery Replacement Interval in years */}
      <div className="form-group">
        <label className="form-label">Battery Replacement Interval (years)</label>
        <input
          type="number" 
          className="form-input"
          placeholder="Battery Replacement Interval (years)"
          name="batteryReplacementInterval" 
          value={evVehicle.batteryReplacementInterval}
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
};

export default EvVehicleForm;
