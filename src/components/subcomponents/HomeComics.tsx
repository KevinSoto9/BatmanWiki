import { fetchComics } from "../fetchs/FetchComics";
import { useEffect, useState } from "react";
import Comic from "../types/Comic";
import { Link } from "react-router-dom";

const HomeComics = () => {
    const [comics, setComics] = useState<Comic[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadComics = async () => {
            const data = await fetchComics(3, 1);
            setComics(data);
            setLoading(false);
            console.log("Fetched data:", data);
        };
        loadComics();
    }, []);

    return (
        <>
            <h2 className="text-4xl mb-4 font-bold">Comics</h2>
            <p className="text-center text-md mb-7 text-gray-300 max-w-xl">
                Explore a wide variety of comics!
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {comics?.map((comic: Comic) => (
                        <Link to={`/comic/${Number(comic.id) >= 11 && Number(comic.id) <= 20 ? Number(comic.id) - 10 : comic.id}`} key={comic.id} className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                            <div>
                                <h2 className="text-3xl text-center mb-4 font-bold">{comic.name}</h2>
                                <div className="flex flex-col md:flex-row items-center">
                                    <img src={comic.image_url} alt={comic.name} className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md" onError={(e) => { e.currentTarget.src = "/path/to/fallback-image.jpg"; }} />
                                    <div className="flex-grow">
                                        <p className="text-base text-gray-300 mb-3">{comic.description}</p>
                                        <p className="text-sm text-gray-400"><strong>Writer:</strong> {comic.writer}</p>
                                        <p className="text-sm text-gray-400"><strong>Artist:</strong> {comic.artist}</p>
                                        <p className="text-sm text-gray-400"><strong>Publication Date:</strong> {comic.publication_date}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Link to="/comics" className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 mt-10 shadow-md">
                View all comics
            </Link>
        </>
    );
};

export default HomeComics;
