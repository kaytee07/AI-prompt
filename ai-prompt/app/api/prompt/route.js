import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET =  async (req, res) => {
    try {
        connectToDB();
        const getPrompt = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(getPrompt), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify("can get any prompt", {status: 500}))
    }
}