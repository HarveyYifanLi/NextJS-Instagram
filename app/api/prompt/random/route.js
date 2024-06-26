
export const GET = async (request, { params }) => {
    try {
        const page = 3;
        const limit = 100;
        // request to https://picsum.photos/ for random pictures with extensibility for paginations
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);

        const data = await response.json();

        // execute data mapping to transform random picture objects into the array of prompt objects for downstream components' consumption
        const formattedPrompts = data.map((pictureObj) => {
            const { id, author, url, download_url } = pictureObj;

            const templateProfileImage = "https://picsum.photos/600"

            const promptTemplateObject = {
                _id: id,
                creator: {
                  _id: id,
                  email: `${author.replace(/\s/g,'')}@randomtest.com`,
                  username: `${author.replace(/\s/g,'')}_random`,
                  image: templateProfileImage
                },
                prompt: download_url,
                tag: '#random',
            }

            return promptTemplateObject;
        });

        return new Response(JSON.stringify(formattedPrompts), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}
