import { validationResult } from "express-validator";
import rideService from "../services/ride.service.js";


const createRide = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    try {
        
        const ride = await rideService.create({ user: req.user._id, pickup, destination, vehicleType})
        return res.status(201).json(ride)

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


}



export { createRide }