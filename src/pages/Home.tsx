import HomeComics from "../components/subcomponents/HomeComics";


const Home = () => {
    return (
        <div className="p-5 font-sans bg-gray-800 text-white min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center text-5xl mb-6 font-bold text-white">Welcome to BatmanWiki</h1>
            <p className="text-center text-lg mb-6 text-gray-300 max-w-xl">
                BatmanWiki is your ultimate source for everything related to the Batman universe. 
                From iconic comics to the stories behind each character, you'll find detailed information 
                about the most important aspects of the Batman universe here.
            </p>
            <HomeComics />
        </div>
    );
};

export default Home;
