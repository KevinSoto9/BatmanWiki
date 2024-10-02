import { fetchLocations } from "../fetchs/FetchLocations";
import { useEffect, useState } from "react";
import Location from "../types/Location";
import { Link } from "react-router-dom";

const HomeLocations = () => {
    const [locations, setLocations] = useState<Location[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadLocations = async () => {
            const data = await fetchLocations(3, 1);
            setLocations(data);
            setLoading(false);
            console.log("Fetched data:", data);
        };
        loadLocations();
    }, []);

    return (
        <>
            <h2 className="text-4xl mt-10 mb-4 font-bold">Locations</h2>
            <p className="text-center text-md mb-7 text-gray-300 max-w-xl">
                Explore a wide variety of locations!
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {locations?.map((location: Location) => (
                        <Link to={`/Location/${Number(location.id) >= 11 && Number(location.id) <= 20 ? Number(location.id) - 10 : location.id}`} key={location.id} className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                            <div>
                                <h2 className="text-3xl text-center mb-4 font-bold">{location.name}</h2>
                                <div className="flex flex-col md:flex-row items-center">
                                    <img src={location.image_url} alt={location.name} className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md" onError={(e) => { e.currentTarget.src = "/path/to/fallback-image.jpg"; }} />
                                    <div className="flex-grow">
                                        <p className="text-base text-gray-300 mb-3">{location.description}</p>
                                        <p className="text-sm text-gray-400"><strong>Type:</strong> {location.type}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Link to="/locations" className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 mt-10 mb-6 shadow-md">
                View all locations
            </Link>
        </>
    );
};

export default HomeLocations;
