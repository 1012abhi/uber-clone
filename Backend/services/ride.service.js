import { RideModel } from "../models/ride.model";
import { getDistanceTime } from '../services/maps.service'


const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await getDistanceTime(pickup, destination);
    const baseFare = {
        car: 50,
        auto: 30,
        motorcycle: 20
    };

    const perKmRate = {
        car: 10,
        auto: 7,
        motorcycle: 5
    };

    const perMinuteRate = {
        car: 2,
        auto: 1.5,
        motorcycle: 1
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
        motorcycle: calculateFare('motorcycle')
    };
}

const createRide = ({}) => {}


export default {getFare, createRide}