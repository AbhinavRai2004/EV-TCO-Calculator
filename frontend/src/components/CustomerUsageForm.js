import React from 'react';
import '../css/Form.css';

// CustomerUsageForm component to capture user input for customer usage metrics

const CustomerUsageForm = ({ customerUsage, setCustomerUsage }) => {
  // Handle input changes for various form fields

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target; 
    const inputValue = type === 'checkbox' ? checked : value; 
    console.log(`Customer Usage Form - ${name}: ${inputValue}`); 
  
    setCustomerUsage({ ...customerUsage, [name]: inputValue });
  };

  return (
    <div className="form-container"> 
      <h2 className="form-heading">Customer Usage</h2> 
      
      <div className="form-group">
        <label className="form-label">Monthly Km Driven</label>
        <input
          type="number" 
          className="form-input"
          placeholder="Monthly Km Driven"
          name="monthlyKm" 
          value={customerUsage.monthlyKm} 
          onChange={handleInputChange} 
        />
      </div>
      
      {/* Input field for Calculation Duration in Years */}
      <div className="form-group">
        <label className="form-label">Calculation Duration (Years)</label>
        <input
          type="number" 
          className="form-input"
          placeholder="Calculation Duration (Years)"
          name="years" 
          value={customerUsage.years} 
          onChange={handleInputChange} 
        />
      </div>
      
      {/* Checkbox for considering battery replacement */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox" 
            name="considerBatteryReplacement" 
            checked={customerUsage.considerBatteryReplacement}
            onChange={handleInputChange} 
          />
          Consider Battery Replacement
        </label>
      </div>
    </div>
  );
};

export default CustomerUsageForm;
