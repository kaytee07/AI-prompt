import { Schema, model, models } from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})