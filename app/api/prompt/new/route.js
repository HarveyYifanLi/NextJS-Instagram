import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();
        const foundUser = await User.findOne({id: userId});
        console.log('foundUser:', foundUser);
        // only create a new prompt for a user if this user indeed exists
        if (foundUser) {
            const newPrompt = new Prompt({ creator: userId, prompt, tag });

            await newPrompt.save();
            return new Response(JSON.stringify(newPrompt), { status: 201 })
        } else {
            return new Response("Failed to create a new prompt!!", { status: 501 });
        }
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}