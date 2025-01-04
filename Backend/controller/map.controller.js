import { validationResult } from "express-validator";
import  mapsService from "../services/maps.service.js";
import  getAddressCoordinate from "../services/maps.service.js";


const getCoordinate = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed in controller', error: error.array() });
    }

    const { address } = req.query;
    if (!address) {
        return res.status(400).json({ message: 'Address is required' });
    }
    
    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        console.log('coordinates', coordinates);
        
        if (!coordinates) {
            return res.status(404).json({ error: "Address not found" })
        }
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error in getCoordinate:', error.message);
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
        const distanceTime = await mapsService.getDistanceAndTime(origin, destination)
        res.status(200).json(distanceTime);

    } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Coodinates not found' });
    } 

}

const getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
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