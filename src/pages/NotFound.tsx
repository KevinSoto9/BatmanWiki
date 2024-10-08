import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    const [imageSrc, setImageSrc] = useState('src/assets/Batman404.jpg');

    const handleError = () => {
        setImageSrc('https://www.zonanegativa.com/imagenes/2018/03/Batman-Principe-Oscuro-1-01.jpg');
    };

    window.scrollTo(0, 0);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white px-2">
            <img 
            src={imageSrc}
            alt="Batman" 
            className="w-3/4 md:w-1/2 lg:w-1/3 mb-8 shadow-lg"
            onError={handleError}
            />
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-6 text-center max-w-md">
            It looks like you got lost in Gotham City. Don't worry, Batman is here to help you find your way.
            </p>
            <Link 
            to="/" 
            className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 mt-10 shadow-md"
            >
            <span className="mr-2"></span>
            Back to Home
            </Link>
        </div>
    );
};

export default NotFound;