const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const calculateTTORoutes = require("./routes/calculateTTORoutes");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", calculateTTORoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
