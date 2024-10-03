import { fetchConcepts } from "../fetchs/FetchConcepts";
import { useEffect, useState } from "react";
import Concept from "../types/Concept";
import { Link } from "react-router-dom";

const HomeConcepts = () => {
    const [concepts, setConcepts] = useState<Concept[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadConcepts = async () => {
            const data = await fetchConcepts(3,1);
            setConcepts(data);
            setLoading(false);
            console.log("Fetched data:", data);
        };
        loadConcepts();
    }, []);

    return (
        <>
            <h2 className="text-4xl mt-10 mb-4 font-bold">Concepts</h2>
            <p className="text-center text-md mb-7 text-gray-300 max-w-xl">
                Explore a wide variety of concepts!
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {concepts?.map((concept: Concept) => (
                        <Link to={`/concept/${Number(concept.id) >= 11 && Number(concept.id) <= 20 ? Number(concept.id) - 10 : concept.id}`} key={concept.id} className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                            <div>
                                <h2 className="text-3xl text-center mb-4 font-bold">{concept.name}</h2>
                                <div className="flex flex-col md:flex-row items-center">
                                    <img src={concept.image_url} alt={concept.name} className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md" onError={(e) => { e.currentTarget.src = "/images/fallback-image.jpg"; }} />
                                    <div className="flex-grow">
                                        <p className="text-base text-gray-300 mb-3">{concept.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Link to="/concepts" className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 mt-10 mb-6 shadow-md">
                View all concepts
            </Link>
        </>
    );
};

export default HomeConcepts;
