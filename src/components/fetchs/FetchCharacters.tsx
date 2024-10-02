import characterImageUrls from "./constants/CharactersImages";
import Character from "../types/Character";

{/*Have to do this because in the api the id are wrong randomly*/}
const swapCharacterIds = (characters: Character[]): Character[] => {
    const idMap: { [key: string]: string } = {
        '1': '13', '2': '14', '3': '15', '4': '20', '5': '21', '6': '22', '7': '23', '8': '24', '9': '25', '10': '26',
        '11': '27', '12': '28', '13': '29', '14': '30', '15': '31', '16': '32', '17': '33', '18': '34', '19': '35',
        '20': '36', '21': '37', '22': '38', '23': '39', '24': '40', '25': '41', '26': '42', '27': '43', '28': '44',
        '29': '45', '30': '46', '31': '47', '32': '48', '33': '49', '34': '50', '35': '51', '36': '52', '37': '53',
        '38': '54', '39': '55', '40': '56', '41': '57', '42': '58', '43': '59', '44': '60', '45': '61', '46': '62',
        '47': '63', '48': '64', '49': '65', '50': '66', '51': '67', '52': '68', '53': '69', '54': '70', '55': '71',
        '56': '72', '57': '73', '58': '16', '59': '17', '60': '18', '61': '19', '62': '1', '63': '2', '64': '3',
        '65': '4', '66': '5', '67': '6', '68': '7', '69': '8', '70': '9', '71': '10', '72': '11', '73': '12',
        '74': '74', '75': '75', '76': '76', '77': '77', '78': '78', '79': '79', '80': '80', '81': '81', '82': '82',
        '83': '83'
    };

    return characters.map(character => ({
        ...character,
        id: idMap[character.id] || character.id
    }));
};


const fetchCharacters = async (number: number, page: number) => {
    try {
        const response = await fetch(`https://api.batmanapi.com/v1/characters?pagination[pageSize]=${number}&pagination[page]=${page}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return data.data.map((character: { id: string; attributes: { name: string; alias:string; alive: boolean; role : string; description : string; creator: string; first_appearance: string; gender: string; abilities:[]; image_url: string;} }) => ({
            id: character.id,
            name: character.attributes.name,
            alias: character.attributes.alias,
            alive: character.attributes.alive,
            role: character.attributes.role,
            description: character.attributes.description,
            creator: character.attributes.creator,
            first_appearance: character.attributes.first_appearance,
            gender: character.attributes.gender,
            abilities: character.attributes.abilities,
            image_url: characterImageUrls[character.id], 
            
        }));
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

export { fetchCharacters, swapCharacterIds};
