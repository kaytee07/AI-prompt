import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    async session({session}) {

    },
    async signin({ profile }){
        try {
            await connectToDB();

            // check if a user already exist
            const userExists= await User.findOne({
                email: profile.email
            });
            // if not, create a new user
            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ", "").toLowerCase(),
                    image: profile.picture
                })
            }
            return true;

        } catch  (error){
            console.log(error);
            return false;
        }
    }
});