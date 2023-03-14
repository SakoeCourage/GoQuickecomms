import axios from "axios"
import User from './User'
import router from '../router'
import store from '../store'
import Csrf from './Csrf'
let Api = axios.create({
    baseURL: `${process.env.VUE_APP_BASE_URL}/api`,

});

Api.interceptors.response.use(function(response) {
    return response
}, function(error) {
    Csrf.getCookie()

    if (error.response.status === 401 || error.response.status === 419) {
        User.logout().then(response => {
            store.commit('setUser', '')
            localStorage.removeItem("auth");
            router.push({ name: "Login" });

        }).catch(error => {
            console.log(error.response.data.errors)

        })

    } else {
        return Promise.reject(error);
    }
});

Api.defaults.withCredentials = true;

export default Api;