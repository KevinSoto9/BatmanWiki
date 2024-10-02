interface Comic {
    id: string;
    name: string;
    alias: string;
    alive: boolean;
    role: string;
    description: string;
    creator: string;
    first_appearance: string;
    gender: string;
    abilities: [];
    image_url: string;
}

export default Comic;