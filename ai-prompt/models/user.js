import { Schema, models, model } from "mongoose";
import { unique } from "next/dist/build/utils";
 
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email already exist"],
        unique: [true, "Email is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "username already taken"],
        match: [/^(?=(8,20)$)(?![_.])(?!.*[_.]{2})[q-zA-Z0-9._]+(?<![_.])$/,
                "suername invalid, it should contain 8-20 alphanumeric characters and be unique"
                ]
    },
    image: {
        type: String
    }
}, {timestamps: true})

const User = models.User || model('User',UserSchema);
export default User;