import { RideModel } from "../models/ride.model.js";
import getDistanceAndTime from '../services/maps.service.js'


const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await getDistanceAndTime(pickup, destination);
    const baseFare = {
        car: 50,
        auto: 30,
        moto: 20
    };

    const perKmRate = {
        car: 10,
        auto: 7,
        moto: 5
    };

    const perMinuteRate = {
        car: 2,
        auto: 1.5,
        moto: 1
    };

    const calculateFare = (vehicleType) => {
        if (!baseFare[vehicleType] || !perKmRate[vehicleType] || !perMinuteRate[vehicleType]) {
            throw new Error('Invalid vehicle type');
        }

        const distanceFare = distanceTime.distance * perKmRate[vehicleType];
        const timeFare = distanceTime.time * perMinuteRate[vehicleType];
        return baseFare[vehicleType] + distanceFare + timeFare;
    };

    return {
        car: calculateFare('car'),
        auto: calculateFare('auto'),
        moto: calculateFare('motorcycle')
    };
}

function getOtp(num) {
    function generateOtp(num) {
        const opt = crypto.randomInt(Math.pow(10, num - 1), Math.pov(10, num)).tostring();
        return opt;
    }
    return generateOtp(num);
}

const createRide = async ({user, pickup, destination, vehicleType}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    if (!fare[vehicleType]) {
        throw new Error('Invalid vehicle type');
    }
    
    try {
        const ride = RideModel.create({
            user: req.user._id,
            pickup,
            destination,
            otp: getOtp(4),
            fare: fare[vehicleType]
        })
    
        return ride;
    } catch (error) {
        console.error('Error creating ride:', error);
        throw new Error('Error creating ride');
    }

}


export default {getFare, createRide}