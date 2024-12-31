import { Router } from "express";
import { authUser } from "../middleware/auth.middleware.js";
import { getAutoCompleteSuggestions, getCoordinate, getDistanceTime } from "../controller/map.controller.js";
import { query } from "express-validator";

const router = Router();
router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
    authUser,getCoordinate )

router.get('/get-distance-time',
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authUser, getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({min: 3}),
    authUser, getAutoCompleteSuggestions
)



export default router