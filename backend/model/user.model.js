import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email:{
        type:String,
        required: [true, 'Email is required'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {timestamps: true});

//Hash the password before save
userSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    };
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
