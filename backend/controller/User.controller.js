import { generateToken } from "../middleware/Auth.middleware.js";
import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(404).json({error: 'All fields required'})
        }

        // Check if the username oremail already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(401).json({ error: 'Username already exists' });
            } else if (existingUser.email === email) {
                return res.status(401).json({ error: 'Email already exists' });
            }
        }

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        
        //Generate token 
        const payload = {userId: newUser._id, username: newUser.username};
        generateToken(res, payload);

        res.status(201).json({message: 'User register successfully', newUser})
    } catch (error) {
        if(error.name === 'ValidationError'){
            const message = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({errors: message});
        }
        console.error('error in registerUser controller', error);
        res.status(500).json(error.message)
    }
};

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({error: 'Invalid credentials'})
        };

        const isMatchPassword = await bcrypt.compare(password, user.password);
        if(!isMatchPassword){
            return res.status(404).json({error: 'Invalid credentials'})
        };

        // Generate token
        const payload = {id: user._id, username: user.username};
        generateToken(res, payload);

        res.status(200).json({message: 'Login successfully', user})
    } catch (error) {
        console.log('Error in loginUser controller', error);
        res.status(500).json({message: 'Internal server error'})
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const {username, email, password} = req.body;

        const user = await User.findById(userId);
        console.log(user);
        if(!user){
            return res.status(404).json({error: 'User not found'})
        };

        if(user._id.toString() !== userId){
            return res.status(404).json({error: 'you are not authorized to udpate this'})
        };

        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password

        await user.save();

        res.status(201).json({message: 'User update successfully', user})
    } catch (error) {
        console.log('error in updateUser controller', error);
        res.status(500).json(error.message);
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        console.log('Logout');
        res.status(200).json({message: 'Logout succefully'})
    } catch (error) {
        console.error('Error in logoutUser controller', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

export {
    registerUser,
    loginUser,
    updateUser,
    logoutUser
}