const fetchGames = async (page: number = 1) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=Batman&type=game&page=${page}&apikey=ea434ec3`);
        const data = await response.json();
        if (data.Response === 'True') {
            return { games: data.Search, error: null };
        } else {
            return { games: [], error: data.Error };
        }
    } catch {
        return { games: [], error: 'Failed to fetch games' };
    }
};

const fetchGame = async (id: string) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=ea434ec3`);
        const data = await response.json();
        if (data.Response === 'True') {
            return { game: data, error: null };
        } else {
            return { game: null, error: data.Error };
        }
    } catch {
        return { game: null, error: 'Failed to fetch game' };
    }
};

export { fetchGames, fetchGame };
