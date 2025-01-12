import { validationResult } from "express-validator";
import rideService from "../services/ride.service.js";
import mapsService from "../services/maps.service.js";
import { RideModel } from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";

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
        
        const CaptainsInRadius = await mapsService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 50)

        ride.otp = ""
        
        const rideWithUser = await RideModel.findOne({ _id: ride._id }).populate('user')
        CaptainsInRadius.map(captain => {
            console.log(captain.socketId, ride)
            
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            })
        })



    } catch (error) {
        console.log(error);
        
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

const confirmRide = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRides({rideId, captain: req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ error: error.message });
    }
}

const startRide = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRides({ rideId, otp, captain: req.captain });
        return res.status(200).json(ride)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
        
    }
}

export { createRide,getFare,confirmRide,startRide }