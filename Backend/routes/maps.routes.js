import { query, Router } from "express";
import { authUser } from "../middleware/auth.middleware";
import { getAutoCompleteSuggestions, getCoordinate, getDistanceTime } from "../controller/map.controller";

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