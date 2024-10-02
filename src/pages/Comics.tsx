import { fetchComics,swapComicIds } from "../components/fetchs/FetchComics";
import { useEffect, useState } from "react";
import Comic from "../components/types/Comic";
import { Link } from "react-router-dom";

const Comics = () => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1); 
    const comicsPerPage = 12;
    
    useEffect(() => {
        const loadComics = async () => {
            setLoading(true);
            try {
                const data = await fetchComics(comicsPerPage, currentPage);
                console.log("Fetched data:", data);

                if (Array.isArray(data) && data.length > 0) {
                    const swappedComics = swapComicIds(data);
                    setComics(swappedComics);
                } else {
                    console.log("No comics found in the response.");
                    setComics([]);
                }
            } catch (error) {
                console.error("Error fetching comics:", error);
                setComics([]);
            } finally {
                setLoading(false);
            }
        };

        loadComics();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="p-5 font-sans bg-gray-800 text-white min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center text-5xl mb-6 font-bold text-white">Comics</h1>
            <p className="text-center text-lg mb-10 text-gray-300 max-w-xl">
            Explore a diverse collection of Batman comics showcasing thrilling adventures, iconic villains, and the evolution of the Dark Knight. Discover the captivating stories and stunning illustrations that define this legendary superhero.
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : comics.length > 0 ? (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {comics.map((comic: Comic) => (
                        <Link to={`/comic/${comic.id}`} key={comic.id} className="no-underline">
                            <div
                                className="bg-slate-900 border border-gray-700 h-full rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white"
                            >
                                <h2 className="text-3xl text-center mb-4 font-bold">{comic.name}</h2>
                                <div className="flex flex-col md:flex-row items-center">
                                    <img
                                        src={comic.image_url}
                                        alt={comic.name}
                                        className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md"
                                    />
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
            ) : (
                <div className="text-center text-gray-500">No comics found.</div>
            )}
            <div className="flex justify-between w-full mt-5">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`bg-blue-800 text-white font-bold py-2 px-4 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    className={`bg-blue-800 text-white font-bold py-2 px-4 rounded-lg ${comics.length < comicsPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={comics.length < comicsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Comics;
