import { fetchCharacters, swapCharacterIds } from "../fetchs/FetchCharacters";
import { useEffect, useState } from "react";
import Character from "../types/Character";
import { Link } from "react-router-dom";

const HomeCharacters = () => {
    const [characters, setCharacters] = useState<Character[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadCharacters = async () => {
            const data = await fetchCharacters(3, 1);
            console.log("Fetched data:", data); // Verifica los datos obtenidos aquí

            // Aplica el intercambio de IDs para mostrar los detalles
            const swappedCharacters = swapCharacterIds(data);
            setCharacters(swappedCharacters);
            setLoading(false);
        };
        loadCharacters();
    }, []);

    return (
        <>
            <h2 className="text-4xl mt-10 mb-4 font-bold">Characters</h2>
            <p className="text-center text-md mb-7 text-gray-300 max-w-xl">
                Explore a wide variety of characters!
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {characters?.map((character: Character, index: number) => (
                        <Link 
                            to={`/character/${index + 1}`}  
                            key={index} 
                            className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white"
                        >
                            <div>
                                <h2 className="text-3xl text-center mb-4 font-bold">{character.name}</h2>
                                <div className="flex flex-col md:flex-row items-center">
                                    <img 
                                        src={character.image_url} 
                                        alt={character.name} 
                                        className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md" 
                                        onError={(e) => { e.currentTarget.src = "/path/to/fallback-image.jpg"; }} 
                                    />
                                    <div className="flex-grow">
                                        <p className="text-base text-gray-300 mb-3">{character.description}</p>
                                        <p className="text-sm text-gray-400"><strong>Alias:</strong> {character.alias}</p>
                                        <p className="text-sm text-gray-400"><strong>First Appearance:</strong> {character.first_appearance}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Link 
                to="/characters" 
                className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 mt-10 mb-6 shadow-md"
            >
                View all characters
            </Link>
        </>
    );
};

export default HomeCharacters;
