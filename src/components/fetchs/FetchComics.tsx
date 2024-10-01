import comicImageUrls from "./constants/ComicsImages";
import Comic from "../types/Comic";

const swapComicIds = (comics: Comic[]): Comic[] => {
    return comics.map(comic => {
        if (parseInt(comic.id) >= 1 && parseInt(comic.id) <= 10) {
            return {
                ...comic,
                id: (parseInt(comic.id) + 10).toString()
            };
        } else if (parseInt(comic.id) >= 11 && parseInt(comic.id) <= 20) {
            return {
                ...comic,
                id: (parseInt(comic.id) - 10).toString()
            };
        }
        return comic; 
    });
};

const fetchComics = async (number: number, page: number) => {
    try {
        const response = await fetch(`https://api.batmanapi.com/v1/storylines?pagination[pageSize]=${number}&pagination[page]=${page}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data.data.map((comic: { id: string; attributes: { name: string; description: string; writer: string; artist: string; publication_date: string; issues: [], characters: [], locations: []} }) => ({
            id: comic.id,
            name: comic.attributes.name,
            description: comic.attributes.description,
            writer: comic.attributes.writer,
            artist: comic.attributes.artist,
            publication_date: comic.attributes.publication_date,
            image_url: comicImageUrls[comic.id] || 'default_image_url', 
            issues: comic.attributes.issues,
            characters: comic.attributes.characters,
            locations: comic.attributes.locations
        }));
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export { fetchComics, swapComicIds};
