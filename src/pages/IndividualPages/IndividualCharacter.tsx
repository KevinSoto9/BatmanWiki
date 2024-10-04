import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCharacters } from "../../components/fetchs/FetchCharacters";
import Character from "../../components/types/Character";

const CharacterDetails = () => {
    const { number } = useParams<{ number: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCharacter = async () => {
            try {
                const data = await fetchCharacters(1, Number(number));

                if (!data || data.length === 0) {
                    throw new Error("Character not found.");
                }

                const selectedCharacter = Array.isArray(data) ? data[0] : data;
                setCharacter(selectedCharacter);
                console.log("Fetched data:", selectedCharacter);
                window.scrollTo(0, 0);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };
        loadCharacter();
    }, [number]);

    useEffect(() => {
        if (error) {
            navigate("/Notfound");
        }
    }, [error, navigate]);

    if (loading) {
        return <div className="text-center bg-gray-800 min-h-screen text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen w-full bg-gray-800 p-6">
            {character ? (
                <>
                    <h2 className="text-5xl text-center mb-8 font-bold text-white">
                        {character.name || 'No name available'}
                    </h2>
                    <div className="bg-slate-900 border border-gray-700 rounded-lg p-8 w-full max-w-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <img
                                src={character.image_url}
                                alt={character.name || 'Character image'}
                                className="w-64 h-64 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md"
                            />
                            <div className="flex-grow">
                                <p className="text-xl text-gray-300 mb-4">{character.description || 'No description available'}</p>
                                <p className="text-lg text-gray-400 mb-2"><strong>Alias:</strong> {character.alias || 'No alias available'}</p>
                                <p className="text-lg text-gray-400 mb-2"><strong>Creator:</strong> {character.creator || 'No creator available'}</p>
                                <p className="text-lg text-gray-400 mb-4"><strong>First Appearance:</strong> {character.first_appearance || 'No first appearance available'}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold mb-2">Details</h3>
                            <p className="text-lg text-gray-400 mb-2"><strong>Alive:</strong> {character.alive ? 'Yes' : 'No'}</p>
                            <p className="text-lg text-gray-400 mb-2"><strong>Role:</strong> {character.role || 'No creator available'}</p>
                            <p className="text-lg text-gray-400 mb-2"><strong>Gender:</strong> {character.gender || 'No creator available'}</p>
                            <p className="text-lg text-gray-400 mb-2"><strong>Abilities:</strong> {character.abilities?.length ? character.abilities.join(', ') : 'No abilities available'}</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">Character not found.</div>
            )}
        </div>
    );
};

export default CharacterDetails;
