# Electric Vehicle Buying Decision Calculator

## Project Overview

This project is an online calculator that allows users to compare the Total Cost of Ownership (TCO) of Electric Vehicles (EV) versus Internal Combustion Engine (ICE) vehicles. The calculator provides a user-friendly, intuitive, and visually appealing interface that guides users through the process of comparing EVs and ICE vehicles in terms of cost.

## Features

- Input forms for ICE vehicle, EV vehicle, and customer usage details
- Dynamic calculation of TCO for both EV and ICE vehicles
- Visualization of results using pie and line charts
- Responsive design for various devices and browsers
- Option to consider battery replacement in EV cost calculations

## Technology Stack

### Frontend

- React.js
- Chart.js for data visualization
- Axios for API requests

### Backend

- Node.js
- Express.js
- Body-parser for parsing JSON requests
- CORS for handling cross-origin requests

## Project Structure

The project is divided into frontend and backend components:

### Frontend

- `src/components/`
  - `IceVehicleForm.js`: Component for ICE vehicle input
  - `EvVehicleForm.js`: Component for EV vehicle input
  - `CustomerUsageForm.js`: Component for customer usage input
  - `TCOResults.js`: Component for displaying calculation results and charts
- `src/css/`: Contains CSS files for styling
- `App.js`: Main application component

### Backend

- `server.js`: Entry point for the Express server
- `routes/calculateTTORoutes.js`: Contains the route for TCO calculation

## Setup and Installation

1. Clone the repository
   ```
    https://github.com/AbhinavRai2004/EV-TCO-Calculator.git
   ```
2. Install dependencies for both frontend and backend:
   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
3. Start the backend server:
   ```
   cd backend
   npm start
   ```
4. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

## Usage

1. Fill in the details for the ICE vehicle, EV vehicle, and customer usage in the respective forms.
2. Click the "Calculate TCO" button to see the results.
3. View the total costs and compare them using the line chart and pie charts provided.

## Acknowledgments

- This project was created as part of a web development assignment.
- Inspired by various online EV cost calculators available in the market.
