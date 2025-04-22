// import the required libraries
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// implement cors and express.json() middleware
const app = express();
app.use(cors());
app.use(express.json());

// test Router
app.get('/', (req, res) => {
    res.send('TrendSpot API is live 🔥');
});

const fetchRoutes = require('./routes/fetchRoutes');
app.use('/api', fetchRoutes);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



