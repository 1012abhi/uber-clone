import { validationResult } from "express-validator";
import getAddressCoordinate from "../services/maps.service";


const getCoordinate = async (req, res, next) => {
    const error = validationResult(req);
    if (error) {
        return res.status(400).json({ error: error.array() })
    }

    const { address } = req.query;

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coodinates not found' });
    }

}

export {getCoordinate}