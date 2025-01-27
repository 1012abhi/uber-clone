import { Router } from "express";
import { body } from 'express-validator'
import {registerUser, loginUser, getUserProfile, logoutUser} from '../controller/user.controller.js'
import { authUser } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname').isLength({min: 3}).withMessage('Invalid fullname'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], 
    registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('invalid password'),
],
    loginUser
)

router.get('/profile', authUser, getUserProfile)
router.get('/logout', authUser, logoutUser)
export default router