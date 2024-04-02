import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET =  async (req, res) => {
    try {
        await connectToDB();
        const getPrompt = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(getPrompt), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(`cant get any prompt, ${error}`, {status: 500}))
    }
}