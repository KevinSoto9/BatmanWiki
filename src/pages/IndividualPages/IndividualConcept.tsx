import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchConcepts } from "../../components/fetchs/FetchConcepts";
import Concept from "../../components/types/Concept";

const ConceptDetails = () => {
    const { number } = useParams<{ number: string }>();
    const [concept, setConcept] = useState<Concept | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadConcept = async () => {
            try {
                const data = await fetchConcepts(1, Number(number));
                if (data.length === 0) {
                    throw new Error("Concept not found.");
                }
                setConcept(data[0]);
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
        loadConcept();
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
            {concept ? (
                <>
                    <h2 className="text-5xl text-center mb-8 font-bold text-white">
                        {concept.name || 'No name available'}
                    </h2>
                    <div className="bg-slate-900 border border-gray-700 rounded-lg p-8 w-full max-w-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <img
                                src={concept.image_url}
                                alt={concept.name || 'Concept image'}
                                className="w-64 h-64 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md"
                            />
                            <div className="flex-grow">
                                <p className="text-xl text-gray-300 mb-4">{concept.description || 'No description available'}</p>
                                <p className="text-lg text-gray-400 mb-2"><strong>Type:</strong> {concept.type || 'No type available'}</p>
                                <p className="text-lg text-gray-400 mb-4"><strong>First Appearance:</strong> {concept.first_appearance || 'No date available'}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-2xl font-semibold mb-2">Details</h3>
                            <p className="text-lg text-gray-400 mb-2"><strong>Related Characters:</strong> {concept.related_characters?.length ? concept.related_characters.join(', ') : 'No related characters available'}</p>
                            <p className="text-lg text-gray-400 mb-2"><strong>Related Locations:</strong> {concept.related_locations?.length ? concept.related_locations.join(', ') : 'No related locations available'}</p>
                            <p className="text-lg text-gray-400 mb-2"><strong>Creator:</strong> {concept.creator || 'No creator available'}</p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">Concept not found.</div>
            )}
        </div>
    );
};

export default ConceptDetails;
