const fetchMovies = async (page: number = 1) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=Batman&type=movie&page=${page}&apikey=ea434ec3`);
        const data = await response.json();
        if (data.Response === 'True') {
            return { movies: data.Search, error: null };
        } else {
            return { movies: [], error: data.Error };
        }
    } catch {
        return { movies: [], error: 'Failed to fetch movies' };
    }
};

const fetchMovie = async (id: string) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=ea434ec3`);
        const data = await response.json();
        if (data.Response === 'True') {
            return { movie: data, error: null };
        } else {
            return { movie: null, error: data.Error };
        }
    } catch {
        return { movie: null, error: 'Failed to fetch movie' };
    }
};

export { fetchMovies, fetchMovie };
