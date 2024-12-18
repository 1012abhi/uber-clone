import { userModel } from "../models/user.model.js";
import { validationResult } from 'express-validator'
import createUser from "../services/user.service.js";
// import cookieParser from "cookie-parser"
import { BlacklistToken } from "../models/balcklistToken.model.js";



const registerUser = async (req, res, next) => {
    
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    
    const { fullname, email, password } = req.body
    // console.log(`req.body`,req.body);

    const hashedPassword = await userModel.hashPassword(password);


    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });


    const token = user.generateAuthToken();

    res.status(201).json({ token, user });



}

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    
    const user = await userModel.findOne({ email }).select('+password');
    // console.log(user);
    
    if (!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(401).json({ messages: 'Invalid email or password'})
    }

    const token = user.generateAuthToken();

    res.cookie('token', token)
    res.status(200).json({token, user})

}

const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await BlacklistToken.create({token: token})
    res.status(200).json({ message: 'Logged out' });
}

export {registerUser, loginUser, getUserProfile, logoutUser};
