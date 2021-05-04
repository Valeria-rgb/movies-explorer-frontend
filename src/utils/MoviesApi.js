class MoviesApi {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _fetch(headers) {
        return fetch(`${this._url}`, headers)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка: ${res.status}`);
            })
    }

    getMovies() {
        return this._fetch({
            method: "GET",
            headers: this.headers
        })
    }
}

const moviesApi = new MoviesApi({
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-Type": "application/json"
    }
});
export default moviesApi;

