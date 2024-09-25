const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api', (req, res) => {
    res.send("Welcome from server");
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})