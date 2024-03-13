import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is required!']
    },

    image: {
        type: String
    }
}, {timestamps: true})

const User = models.User || model("User", UserSchema);
export default User;