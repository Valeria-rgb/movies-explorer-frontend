class Auth {
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

    signUp(name, email, password) {
        return this._fetch('signup', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({name, email, password})
        })
    };

    signIn(email, password) {
        return this._fetch('signin', {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({email, password})
        })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    return data;
                }
            })
            .catch(err => console.log(err))
    };


    getToken(jwt) {
        return this._fetch('users/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        })
            .catch((err) => console.log(err))
    }
}


const auth = new Auth ({
    url: 'https://my-diploma.nomoredomains.club/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default auth;
