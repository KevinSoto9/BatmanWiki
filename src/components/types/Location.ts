interface Location {
    id: string;
    name: string;
    description: string;
    notable_events: [];
    first_appearance: string;
    related_characters: [];
    latitude: number;
    longitude: number;
    type: string;
    creator: string;
    image_url: string;
}

export default Location;