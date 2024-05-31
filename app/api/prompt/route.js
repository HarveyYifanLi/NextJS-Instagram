import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');
        console.log('prompts:', prompts);

        // const response = await fetch("https://picsum.photos/v2/list?page=2&limit=100");
        // const pictures = await response.json();
        // console.log('pictures:', pictures);

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}