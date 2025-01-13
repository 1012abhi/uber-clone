import { RideModel } from "../models/ride.model.js";
import mapsService from "../services/maps.service.js";
import crypto from "crypto"
import { sendMessageToSocketId } from "../socket.js";

const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required')
    }

    const distanceTime = await mapsService.getDistanceAndTime(pickup, destination).catch(error => {
        throw new Error('Error fetching distance and time: ' + error.message);
    });
    if (!distanceTime) {
        throw new Error(`distance: ${distanceTime}`);
        
    }

    const baseFare = {
        car: 50,
        auto: 30,
        moto: 20
    };

    const perKmRate = {
        car: 15,
        auto: 10,
        moto: 8
    };

    const perMinuteRate = {
        car: 3,
        auto: 2,
        moto: 1.5
    };

    const calculateFare = (vehicleType) => {
        
        const distanceInKm = distanceTime.distance.value / 1000; // Convert meters to kilometers
        const durationInMinutes = distanceTime.duration.value / 60; // Convert seconds to minutes

        const distanceFare = distanceInKm * perKmRate[vehicleType];
        const timeFare = durationInMinutes * perMinuteRate[vehicleType];

        const totalFare = baseFare[vehicleType] + distanceFare + timeFare;
        return parseFloat(totalFare.toFixed(1));
    };

    return {
        car: calculateFare('car'),
        auto: calculateFare('auto'),
        moto: calculateFare('moto')
    };
}

function getOtp(num) {
    function generateOtp(num) {
        const opt = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return opt;
    }
    return generateOtp(num);
}

const create = async ({user, pickup, destination, vehicleType}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    
    if (!fare[vehicleType]) {
        throw new Error('Invalid vehicle type');
    }
    
    try {
        const ride = await RideModel.create({
            user,
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


const confirmRides = async ({rideId, captain}) => {
    if (!rideId) {
        throw new Error('Ride id required');
    }

    try {
        await RideModel.findOneAndUpdate({ _id: rideId }, {status: 'accepted', captain: captain._id})
        const ride = await RideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp')
    
        if (!ride) {
            throw new Error('Ride not found');
        }
    
        return ride;
    } catch (error) {
        console.log(error);
        
    }
}

const startRides = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP not required');
    }

    try {
        await RideModel.findOneAndUpdate({_id: rideId}, {status: 'ongoing',captain: captain._id })
        const ride = await RideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp')
        console.log('star', ride);
        
        if (!ride) {
            throw new Error('Ride not found');
        }
        
        // if (ride.status !== 'accepted') {
        //     throw new Error('Ride not accepted');
        // }
        
        if (ride.otp !== otp) {
            throw new Error('Ivalid OTP not allowed');
        }
        
        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return ride 
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
        
    }

}

const endRidee = async ({ rideId, captain }) => {
    if( !rideId ) {
        throw new Error('Ride id is required')
    }

    await RideModel.findByIdAndUpdate({_id: rideId}, {status: 'completed'})
    const ride = await RideModel.findOne({_id: rideId, captain: captain._id }).populate('user').populate('captain').select('+otp')
    if (!ride) {
        throw new Error('No such ride')
    }
    
    
    return ride;
}

export default {getFare, create, confirmRides, startRides, endRidee }