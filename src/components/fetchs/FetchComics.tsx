import comicImageUrls from "./constants/ComicsImages";

const fetchComics = async (number: number) => {
    try {
        const response = await fetch(`https://api.batmanapi.com/v1/storylines?pagination[pageSize]=${number}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data.map((comic: { id: string; attributes: { name: string; description: string; writer: string; artist: string; publication_date: string; } }) => ({
            id: comic.id,
            name: comic.attributes.name,
            description: comic.attributes.description,
            writer: comic.attributes.writer,
            artist: comic.attributes.artist,
            publication_date: comic.attributes.publication_date,
            image_url: comicImageUrls[comic.id] || 'default_image_url',
        }));
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export default fetchComics;
