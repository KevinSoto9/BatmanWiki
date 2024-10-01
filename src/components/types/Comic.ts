interface Comic {
    id: string;
    name: string;
    description: string;
    writer: string;
    artist: string;
    publication_date: string;
    image_url: string;
    issues: [];
    characters: [];
    locations: [];
}

export default Comic;