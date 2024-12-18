import { Router } from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controller/captain.controller.js";

const router = Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname').isLength({min: 3}).withMessage('Invalid fullname'),
    body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),

], 
    registerCaptain
)

export default router;