import { query, Router } from "express";
import { authUser } from "../middleware/auth.middleware";
import { getCoordinate } from "../controller/map.controller";

const router = Router();
router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
    authUser,getCoordinate )


export default router