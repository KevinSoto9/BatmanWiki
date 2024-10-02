import Location from "../types/Location";
import locationImageUrls from "./constants/LocationsImages";

// Have to do this because in the api the id are wrong
const swapLocationIds = (locations: Location[]): Location[] => {
    return locations.map(location => {
        if (parseInt(location.id) >= 1 && parseInt(location.id) <= 10) {
            return {
                ...location,
                id: (parseInt(location.id) + 10).toString()
            };
        } else if (parseInt(location.id) >= 11 && parseInt(location.id) <= 20) {
            return {
                ...location,
                id: (parseInt(location.id) - 10).toString()
            };
        }
        return location; 
    });
};

const fetchLocations = async (number: number, page: number) => {
    try {
        const response = await fetch(`https://api.batmanapi.com/v1/locations?pagination[pageSize]=${number}&pagination[page]=${page}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const locations = data.data.map((location: { id: string; attributes: { name: string; description: string, notable_events: []; first_appearance: string; related_characters: [], coordinates: {latitude: number; longitude:number}; type: string; creator:string} }) => {
            return {
                id: location.id,
                name: location.attributes.name,
                description: location.attributes.description,
                notable_events: location.attributes.notable_events,
                first_appearance: location.attributes.first_appearance,
                related_characters: location.attributes.related_characters,
                latitude: location.attributes.coordinates.latitude,
                longitude: location.attributes.coordinates.longitude,
                type: location.attributes.type,
                creator: location.attributes.creator,
                image_url: locationImageUrls[location.id]
            };
        });

        const swappedLocations = swapLocationIds(locations);

        return swappedLocations.map(location => ({
            ...location,
            image_url: locationImageUrls[location.id]
        }));
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export { fetchLocations, swapLocationIds };
