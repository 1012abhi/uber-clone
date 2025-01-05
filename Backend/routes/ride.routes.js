import { Router } from "express";
import { body, query } from "express-validator";
import { createRide, getFare } from "../controller/ride.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

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


export default router;