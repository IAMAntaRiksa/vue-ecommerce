import axios from "axios";

const Api = axios.create({
    'baseURL': 'http://localhost:8000/api',

    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})

Api.interceptors.response.use(function (response) {
    return response;
}, ((error) => {
    //check if response unauthenticated
    if (401 === error.response.status) {

        //remove token
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        window.location = '/login';

    } else {
        //reject promise error
        return Promise.reject(error);
    }


}));

export default Api