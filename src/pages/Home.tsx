import fetchComics from "../components/fetchs/FetchComics";
import { useEffect, useState } from "react";
import Comic from "../components/types/Comic";
import { Link } from "react-router-dom";

const Home = () => {
    const [comics, setComics] = useState<Comic[] | null>(null);

    useEffect(() => {
        fetchComics(3).then(data => setComics(data));
    }, []);

    return (
        <div className="p-5 font-sans bg-gray-800 text-white min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center text-5xl mb-6 font-bold text-white">Welcome to BatmanWiki</h1>
            <p className="text-center text-lg mb-6 text-gray-300 max-w-xl">
                BatmanWiki is your ultimate source for everything related to the Batman universe. 
                From iconic comics to the stories behind each character, you'll find detailed information 
                about the most important aspects of the Batman universe here.
            </p>
            <h2 className="text-4xl mb-4 font-bold">Comics</h2>
            <p className="text-center text-md mb-7 text-gray-300 max-w-xl">
                Explore a wide variety of comics!
            </p>
            {comics ? (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {comics.map((comic: Comic) => (
                        <div key={comic.id} className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                            <h2 className="text-3xl text-center mb-4 font-bold">{comic.name}</h2>
                            <div className="flex flex-col md:flex-row items-center"> {/* Alineación centrada */}
                                <img src={comic.image_url} alt={comic.name} className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md" />
                                <div className="flex-grow">
                                    <p className="text-base text-gray-300 mb-3">{comic.description}</p>
                                    <p className="text-sm text-gray-400"><strong>Writer:</strong> {comic.writer}</p>
                                    <p className="text-sm text-gray-400"><strong>Artist:</strong> {comic.artist}</p>
                                    <p className="text-sm text-gray-400"><strong>Publication Date:</strong> {comic.publication_date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">Loading...</div>
            )}
            <Link to="/another-page" className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 mt-10 shadow-md">
                <span className="mr-2"></span> {/* Puedes usar un icono aquí */}
                View all comics
            </Link>
        </div>
    );
};

export default Home;
