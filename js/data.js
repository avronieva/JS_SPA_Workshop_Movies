import {beginRequest, endRequest} from './notification.js'

function host(endpoint) {
    return `https://api.backendless.com/8DB595C0-3C13-3F55-FFA8-CD1998D7AA00/985E7160-4059-489D-85B9-0B8FDBBF15F6/${endpoint}`
}

const endpoints = {
    REGISTER: "users/register",
    LOGIN: "users/login",
    LOGUOUT: "users/logout",
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/',
}

export async function register(username, password) {
    beginRequest();

    const result = (await fetch(host(endpoints.REGISTER), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        }) 
    })).json();

    endRequest();
    return result;
}

export async function login(username, password) {
    beginRequest();

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login: username,
            password
        }) 
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    endRequest();
    return result;
}

// не връща JSON / Promise и за това не я използваме с async await
export async function logout() {
    beginRequest();

    const token = localStorage.getItem('userToken');
    
    localStorage.removeItem('user-token');

    const result = fetch(host(endpoints.LOGUOUT), {
        headers: {
            'user-token': token
        }
    });

    endRequest();
    return result;
}

// get all movies
export async function getMovies() {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();

    endRequest();
    return result;
}

// get movie by ID
export async function getMovieById(id) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    }
    )).json();

    endRequest();
    return result;
}

// create movie
export async function createMovie(movie) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

    endRequest();
    return result;
}

// edit movie
export async function updateMovie(id, updatedProps) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();

    endRequest();
    return result;
}

// delete movie
export async function deleteMovie(id) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        }
    })).json();

    endRequest();
    return result;
}

// get movies by userID
// Backendless Documentation -> Database API -> Advanced Object Retreival -> Search with the Where Clouse
export async function getMovieByOwner(ownerId) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-type': 'application/json',
            'user-token': token
        }
    })).json();

    endRequest();
    return result;
}


// buy ticket
export async function buyTicket(movie) {
    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, { tickets: newTickets });
}
