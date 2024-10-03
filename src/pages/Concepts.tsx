import { fetchConcepts, swapConceptIds } from "../components/fetchs/FetchConcepts";
import { useEffect, useState } from "react";
import Concept from "../components/types/Concept";
import { Link } from "react-router-dom";

const Concepts = () => {
    const [concepts, setConcepts] = useState<Concept[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1); 
    const conceptsPerPage = 12;
    
    useEffect(() => {
        const loadConcepts = async () => {
            setLoading(true);
            try {
                const data = await fetchConcepts(conceptsPerPage, currentPage);
                console.log("Fetched data:", data);

                if (Array.isArray(data) && data.length > 0) {
                    const swappedConcepts = swapConceptIds(data);
                    setConcepts(swappedConcepts);
                } else {
                    console.log("No concepts found in the response.");
                    setConcepts([]);
                }
            } catch (error) {
                console.error("Error fetching concepts:", error);
                setConcepts([]);
            } finally {
                setLoading(false);
            }
        };

        loadConcepts();
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
            <h1 className="text-center text-5xl mb-6 font-bold text-white">Concepts</h1>
            <p className="text-center text-lg mb-10 text-gray-300 max-w-xl">
            Explore a diverse collection of Batman concepts showcasing thrilling adventures, iconic villains, and the evolution of the Dark Knight. Discover the captivating stories and stunning illustrations that define this legendary superhero.
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : concepts.length > 0 ? (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {concepts.map((concept: Concept) => (
                        <Link to={`/concept/${concept.id}`} key={concept.id} className="no-underline">
                            <div
                                className="bg-slate-900 border border-gray-700 h-full rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white"
                            >
                                <h2 className="text-3xl text-center mb-4 font-bold">{concept.name}</h2>
                                <div className="flex flex-col md:flex-row items-center">
                                    <img
                                        src={concept.image_url}
                                        alt={concept.name}
                                        className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md"
                                    />
                                    <div className="flex-grow">
                                        <p className="text-base text-gray-300 mb-3">{concept.description}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No concepts found.</div>
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
                    className={`bg-blue-800 text-white font-bold py-2 px-4 rounded-lg ${concepts.length < conceptsPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={concepts.length < conceptsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Concepts;
