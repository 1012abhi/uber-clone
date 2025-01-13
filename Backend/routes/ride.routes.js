import { Router } from "express";
import { body, query } from "express-validator";
import { confirmRide, createRide, endRide, getFare, startRide } from "../controller/ride.controller.js";
import { authCaptain, authUser } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/create', 
    authUser, 
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3}).withMessage('Invalid destination'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    createRide

)

router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({ min: 3}).withMessage('Invalid Pickup address'),
    query('destination').isString().isLength({ min: 3}).withMessage('Invalid Destination'),
    getFare
)

router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid rideId'),
    confirmRide
)

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid rideId'),
    query('otp').isString().isLength({ min: 4}).withMessage('Invalid otp'),
    startRide
)

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid rideId'),
    endRide
 )


export default router;