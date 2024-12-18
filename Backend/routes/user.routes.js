import { Router } from "express";
import { body } from 'express-validator'
import {registerUser, loginUser} from '../controller/user.controller.js'

const router = Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname').isLength({min: 3}).withMessage('Invalid fullname'),
    body('password').isLength({min: 3}).withMessage('Password must be at least 3 characters long'),
], 
    registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage('invalid password'),
],
loginUser
)

export default router