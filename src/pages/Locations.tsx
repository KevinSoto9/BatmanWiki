import { fetchLocations } from "../components/fetchs/FetchLocations";
import { useEffect, useState } from "react";
import Location from "../components/types/Location";
import { Link } from "react-router-dom";

const Locations = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1); 
    const locationsPerPage = 12;
    
    useEffect(() => {
        const loadLocations = async () => {
            setLoading(true);
            try {
                const data = await fetchLocations(locationsPerPage, currentPage);
                console.log("Fetched data:", data);

                if (Array.isArray(data) && data.length > 0) {
                    console.log("Data before swapping IDs:", data);
                    setLocations(data);
                } else {
                    console.log("No locations found in the response.");
                    setLocations([]);
                }
            } catch (error) {
                console.error("Error fetching locations:", error);
                setLocations([]);
            } finally {
                setLoading(false);
            }
        };

        loadLocations();
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
            <h1 className="text-center text-5xl mb-6 font-bold text-white">Locations</h1>
            <p className="text-center text-lg mb-10 text-gray-300 max-w-xl">
            Explore a diverse collection of Batman locations showcasing iconic places, thrilling adventures, and the evolution of the Dark Knight's world. Discover the captivating stories and stunning illustrations that define these legendary locations.
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : locations.length > 0 ? (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {locations.map((location: Location) => (
                        <Link to={`/location/${location.id}`} key={location.id} className="no-underline">
                            <div
                                className="bg-slate-900 border border-gray-700 h-full rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white"
                            >
                                <h2 className="text-3xl text-center mb-4 font-bold">{location.name}</h2>
                                <div className="flex flex-col md:flex-row items-center">
                                    <img
                                        src={location.image_url}
                                        alt={location.name}
                                        className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md"
                                    />
                                    <div className="flex-grow">
                                        <p className="text-base text-gray-300 mb-3">{location.description}</p>
                                        <p className="text-sm text-gray-400"><strong>Type:</strong> {location.type}</p>
                                        <p className="text-sm text-gray-400"><strong>First Appearance:</strong> {location.first_appearance}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No locations found.</div>
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
                    className={`bg-blue-800 text-white font-bold py-2 px-4 rounded-lg ${locations.length < locationsPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={locations.length < locationsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Locations;
