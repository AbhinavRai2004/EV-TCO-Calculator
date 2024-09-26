import React from 'react';
import '../css/Form.css';

const EvVehicleForm = ({ evVehicle, setEvVehicle }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`EV Vehicle Form - ${name}: ${value}`);
    setEvVehicle({ ...evVehicle, [name]: value });
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">EV Vehicle</h2>
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
