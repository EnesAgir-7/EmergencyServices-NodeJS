const Volunteer = require('../models/Volunteer');
const geocoder = require('../utils/geocoder');
// @desc  Get all volunteers
// @route GET /api/v1/volunteers
// @access Public
exports.getVolunteers = async(req, res, next)=>{
    try {
        const volunteers = await Volunteer.find();

        return res.status(200).json({
            success: true,
            count: volunteers.length,
            data: volunteers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// @desc  Create all volunteers
// @route POST /api/v1/volunteers
// @access Public
exports.addVolunteers = async(req, res, next)=>{
    try {
        const volunteer = await Volunteer.create(req.body);

        return res.status(200).json({
            success: true,
            data: volunteer
        })
    } catch (err) {
        console.error(err);
        
        res.status(500).json({ error: 'Server error2' });
    }
}