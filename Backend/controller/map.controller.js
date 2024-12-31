import { validationResult } from "express-validator";
import getAddressCoordinate from "../services/maps.service.js";
import getDistanceAndTime from "../services/maps.service.js";

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

const getDistanceTime = async (req, res, next) => {
   
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await getDistanceAndTime(origin, destination)

        res.status(200).json(distanceTime);

    } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Coodinates not found' });
    } 

}

const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("query is required");
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    try {
        
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { input } = req.query;
        
        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}



export {getCoordinate, getDistanceTime, getAutoCompleteSuggestions}