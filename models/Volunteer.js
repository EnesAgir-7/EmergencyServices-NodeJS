const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const VolunteerSchema = new mongoose.Schema({
    volunteerId:{
        type: String,
        required:[true, 'Please add a volunteer ID'],
        unique:true,
        trim: true,
        maxlength:[10, 'Volunteer ID must be less than 10 chars']
    },
    //! after entering the address tran. to lan etr. 
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    //* location coordinate saving to db not a address
    location: {
        type: {
            type: String, 
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index:'2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//* goecode create location -> address to latitude & longitude
VolunteerSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };

    // Do not save address
    this.address = undefined;
    next();
});
module.exports = mongoose.model('Volunteer', VolunteerSchema);