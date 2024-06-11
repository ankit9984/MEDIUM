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
        const userId = req.user.id;
        const {userToFollowId} = req.params;

        if(userId === userToFollowId){
            return res.status(400).json({error: 'You cannot follow yourself'});
        };

        const user = await User.findById(userId);
        const userToFollow = await User.findById(userToFollowId);

        if(!user || !userToFollow){
            return res.status(404).json({error: 'User not found'})
        };

        if(user.following.includes(userToFollowId)){
            return res.status(400).json({error: 'You are already followin this id'})
        };

        user.following.push(userToFollowId);
        userToFollow.followers.push(userId);

        await user.save();
        await userToFollow.save();

        res.status(200).json({message: 'user followed successfully'})
    } catch (error) {
        console.error('Error in followUser controller', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const unFollowUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { userToUnfollowId } = req.params;
        console.log(userId, userToUnfollowId);
        if (userId === userToUnfollowId) {
            return res.status(400).json({ error: 'You cannot unfollow yourself' });
        }

        const user = await User.findById(userId);
        const userToUnfollow = await User.findById(userToUnfollowId);

        if (!user || !userToUnfollow) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.following.includes(userToUnfollowId)) {
            return res.status(400).json({ error: 'You are not following this user' });
        }

        user.following = user.following.filter(id => id.toString() !== userToUnfollowId);
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== userId);

        await user.save();
        await userToUnfollow.save();

        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error('Error in unFollowUser controller', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAuthorInfo = async (req, res) => {
    try {
        const {authorId} = req.params;
        console.log(authorId);
        const userInfo = await User.findById(authorId).select('username followers');
        console.log(userInfo);
        if(!userInfo){
            res.status(400).json({error: 'User not found'})
        };

        res.status(200).json({message: "User info get succefully", userInfo})
    } catch (error) {
        console.log('Error in getAuthorInfo controller', error);
        res.status(500).json({error: 'Internal server error'})
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({error: 'User not found'})
        };

        res.status(200).json({user});
    } catch (error) {
        console.error('Error in getUser controller', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export {
    registerUser,
    loginUser,
    updateUser,
    logoutUser,
    getAuthorInfo,
    getUser,
    followUser,
    unFollowUser
}