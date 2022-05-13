const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const geocoder = require('./utils/geocoder.js');
// load env vars
dotenv.config({path:'./config/config.env'});
console.log(process.env.MONGO_URI);

// connect to database
connectDB();

const app= express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/api/v1/volunteers', require('./routes/volunteers'));
app.route('/api/v1/resolve').post(async function(req, res) {
    try {                
        //console.log(req.body.addr);
        const loc = await geocoder.geocode(req.body.addr);
        return res.status(200).json({
            type: 'Point',
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress
        });
    }catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Server error1' });
    }
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

