import React from "react";
import "../css/Form.css";

const IceVehicleForm = ({ iceVehicle, setIceVehicle }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`ICE Vehicle Form - ${name}: ${value}`);
    setIceVehicle({ ...iceVehicle, [name]: value });
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">ICE Vehicle</h2>
      <div className="form-group">
        <label className="form-label">ICE Price</label>
        <input
          type="number"
          className="form-input"
          placeholder="ICE Price"
          name="price"
          value={iceVehicle.price}
          onChange={handleInputChange}
        />
      </div>
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
