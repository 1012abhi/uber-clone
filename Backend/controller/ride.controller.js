import { validationResult } from "express-validator";
import rideService from "../services/ride.service.js";
import mapsService from "../services/maps.service.js";

const createRide = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    try {
        
        const ride = await rideService.create({ user: req.user._id, pickup, destination, vehicleType})
        res.status(201).json(ride)
        
        const pickupCoordinates = await mapsService.getAddressCoordinate(pickup)
        
        const getCaptainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 20)
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


}

const getFare = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



export { createRide,getFare }