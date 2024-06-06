import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
    const id = req.params.id || req.params.userId || req.params.authorId;
    if(id && !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json('Invalid ObjectId')
    };
    next();
};

export default validateObjectId;