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
        const token = await generateToken(res, payload);

        res.status(201).json({message: 'User register successfully', newUser, token})
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
        const token = await generateToken(res, payload)
        

        res.status(200).json({message: 'Login successfully', user, token})
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

const followUser = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const {userId} = req.params;

        console.log(userId, currentUserId);

        if(currentUserId === userId){
            return res.status(400).json({message: 'You can\'t follow yourself'})
        };
        
        const currentUser = await User.findById(currentUserId);
        const userToFollow = await User.findById(userId);

        if(!currentUser || !userToFollow){
            return res.status(400).json(404).json({error: 'User not found'})
        };

        if(currentUser.following.includes(userId)){
            return res.status(400).json({message: 'You already follow this user'});
        }

        currentUser.following.push(userId);
        userToFollow.followers.push(currentUser);

        await currentUser.save();
        await userToFollow.save();
        
        res.status(200).json({message: 'User followed succefully'});
    } catch (error) {
        console.error('Error in followUser controller', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const unFollowUser = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const {userId} = req.params;

        if(currentUserId === userId){
            return res.status(400).json({error: 'You can\'t unfollow yourself'});
        };

        const currentUser = await User.findById(currentUserId);
        const userToUnfollow = await User.findById(userId);

        if(!currentUser || !userToUnfollow){
            return res.status(400).json({error: 'User not found'});
        };

        if(!currentUser.following.includes(userId)){
            return res.status(400).json({error: 'You don\'t follow this user'});
        };

        currentUser.following.pull(userToUnfollow);
        userToUnfollow.followers.pull(currentUser);

        await currentUser.save();
        await userToUnfollow.save();

        res.status(200).json({message: 'User unfollowed successfully'});
    } catch (error) {
        console.error('Error in unfollowUser controller', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {
    registerUser,
    loginUser,
    updateUser,
    logoutUser,
    followUser,
    unFollowUser
}