import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchComics } from "../../components/fetchs/FetchComics";
import Comic from "../../components/types/Comic";

const ComicDetails = () => {
    const { number } = useParams<{ number: string }>();
    const [comic, setComic] = useState<Comic | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadComic = async () => {
            try {
                const data = await fetchComics(1, Number(number));
                if (data.length === 0) {
                    throw new Error("Comic not found.");
                }
                setComic(data[0]);
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
        loadComic();
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
            {comic ? (
                <>
                    <h2 className="text-5xl text-center mb-8 font-bold text-white">
                        {comic.name || 'No name available'}
                    </h2>
                    <div className="bg-slate-900 border border-gray-700 rounded-lg p-8 w-full max-w-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <img
                                src={comic.image_url}
                                alt={comic.name || 'Comic cover'}
                                className="w-64 h-64 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md"
                            />
                            <div className="flex-grow">
                                <p className="text-xl text-gray-300 mb-4">{comic.description || 'No description available'}</p>
                                <p className="text-lg text-gray-400 mb-2"><strong>Writer:</strong> {comic.writer || 'No writer available'}</p>
                                <p className="text-lg text-gray-400 mb-2"><strong>Artist:</strong> {comic.artist || 'No artist available'}</p>
                                <p className="text-lg text-gray-400 mb-4"><strong>Publication Date:</strong> {comic.publication_date || 'No date available'}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold mb-2">Details</h3>
                            <p className="text-lg text-gray-400 mb-2"><strong>Issues:</strong> {comic.issues?.length ? comic.issues.join(', ') : 'No issues available'}</p>
                            <p className="text-lg text-gray-400 mb-2"><strong>Characters:</strong> {comic.characters?.length ? comic.characters.join(', ') : 'No characters available'}</p>
                            <p className="text-lg text-gray-400"><strong>Locations:</strong> {comic.locations?.length ? comic.locations.join(', ') : 'No locations available'}</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">Comic not found.</div>
            )}
        </div>
    );
};

export default ComicDetails;
