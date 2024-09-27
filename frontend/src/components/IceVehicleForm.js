import React from "react";
import "../css/Form.css";

// IceVehicleForm component to capture user input for Internal Combustion Engine (ICE) vehicle details
const IceVehicleForm = ({ iceVehicle, setIceVehicle }) => {
  // Handle input changes for ICE vehicle fields

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setIceVehicle({ ...iceVehicle, [name]: value });
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">ICE Vehicle</h2>
      
      {/* Input field for ICE Price */}
      <div className="form-group">
        <label className="form-label">ICE Price</label>
        <input
          type="number"
          className="form-input"
          placeholder="ICE Price"
          name="price" 
          value={iceVehicle.price} 
          onChange={handleInputChange} // Update state on change
        />
      </div>
      
      {/* Input field for ICE Mileage in Km/L */}
      <div className="form-group">
        <label className="form-label">ICE Mileage (Km/L)</label>
        <input
          type="number" 
          className="form-input"
          placeholder="ICE Mileage (Km/L)"
          name="mileage"
          value={iceVehicle.mileage} 
          onChange={handleInputChange}
        />
      </div>
      
      {/* Input field for Fuel Cost in Rs/L */}
      
      <div className="form-group">
        <label className="form-label">Fuel Cost (Rs/L)</label>
        <input
          type="number" 
          className="form-input"
          placeholder="Fuel Cost (Rs/L)"
          name="fuelCost" 
          value={iceVehicle.fuelCost} 
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
};

export default IceVehicleForm;
