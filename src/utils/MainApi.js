class MainApi {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _fetch(path, headers) {
        return fetch(`${this.url}${path}`, headers)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка: ${res.status}`);
            })
    }

    getUserInfo() {
        return this._fetch('users/me', {
            method: 'GET',
            headers: this.headers
        })
    }

    changeUserInfo(data) {
        return this._fetch('users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
    };

    getSavedMovies() {
        return this._fetch('movies', {
            method: 'GET',
            headers: this.headers,
        })
    };

    saveMovie(movie) {
        return this._fetch('movies', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: movie.image,
                trailer: movie.trailer,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: movie.thumbnail,
                movieId: movie.movieId
            })
        })
    };

    deleteMovie(movie) {
        return this._fetch(`movies/${movie._id}`, {
            method: 'DELETE',
            headers: this.headers
        })
    };
}

const mainApi = new MainApi({
    url: 'https://my-diploma.nomoredomains.club/api/',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});

export default mainApi;
