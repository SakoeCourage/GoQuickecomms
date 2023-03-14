import Cookie from "js-cookie";
import axios from "axios"

export default {
    getCookie() {
        let token = Cookie.get("XSRF-TOKEN");


        if (token) {
            return new Promise(resolve => {
                resolve(token);
            });
        }

        let feturl = axios.create({
            baseURL: process.env.VUE_APP_BASE_URL
        });

        feturl.defaults.withCredentials = true;

        return feturl.get("/sanctum/csrf-cookie");
    }
}