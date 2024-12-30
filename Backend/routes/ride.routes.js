import { Router } from "express";
import { body } from "express-validator";


const router = Router()

router.post('/create', 
    body('userId').isString().isLength({ min: 24, max: 24}).withMessage('Invalid user id'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3}).withMessage('Invalid destination')
)


export default router;