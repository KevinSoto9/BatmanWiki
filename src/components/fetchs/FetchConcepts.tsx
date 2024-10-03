import conceptImageUrls from "./constants/ConceptsImages";
import Concept from "../types/Concept";

{/*Have to do this because in the api the id are wrong*/}
const swapConceptIds = (concepts: Concept[]): Concept[] => {
    return concepts.map(concept => {
        if (parseInt(concept.id) >= 1 && parseInt(concept.id) <= 10) {
            return {
                ...concept,
                id: (parseInt(concept.id) + 10).toString()
            };
        } else if (parseInt(concept.id) >= 11 && parseInt(concept.id) <= 20) {
            return {
                ...concept,
                id: (parseInt(concept.id) - 10).toString()
            };
        }
        return concept; 
    });
};

const fetchConcepts = async (number: number, page: number) => {
    try {
        const response = await fetch(`https://api.batmanapi.com/v1/concepts?pagination[pageSize]=${number}&pagination[page]=${page}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        let concepts = data.data.map((concept: { id: string; attributes: { name: string; description: string;  related_characters: [];  related_locations: []; first_appearance: string; creator: string; type:string}}) => ({
            id: concept.id,
            name: concept.attributes.name,
            description: concept.attributes.description,
            related_characters: concept.attributes.related_characters,
            related_locations: concept.attributes.related_locations,
            first_appearance: concept.attributes.first_appearance,
            creator: concept.attributes.creator,
            type: concept.attributes.type,
            image_url: conceptImageUrls[concept.id], 
        }));

        concepts = swapConceptIds(concepts);

        concepts = concepts.map((concept: Concept) => ({
            ...concept,
            image_url: conceptImageUrls[concept.id]
        }));

        return concepts;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export { fetchConcepts, swapConceptIds };
