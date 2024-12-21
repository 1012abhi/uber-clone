import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { BlacklistToken } from "../models/balcklistToken.model.js";
import { captainModel } from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
    
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: "token is required"});
    }

    // Present in Blacklist Model (unauthorized token)
    const isBlacklisted = await BlacklistToken.findOne({ token: token})

    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            console.log('decoded is not found');
            
        }
        const user = await userModel.findById(decoded._id)
        if(!user) {
            console.log('user not found');

        }
        req.user = user

        return next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized"})
    }
}

export const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "token is required"});
    }

    const isBlacklisted = await BlacklistToken.findOne({ token: token});
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unathorized' });
    }     
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const captain = await captainModel.findById(decoded._id)
        
        req.captain = captain;
        
        return next()
    } catch (error) {
        
        return res.status(401).json({ message: "Unauthorized"})

    }

}
