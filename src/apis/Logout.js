import User from './User'
import router from '../router'

export default {
    Logout() {
        User.logout().then(response => {
            console.log(response.data)

            localStorage.removeItem("auth");
            router.push({ name: "Login" });


        }).catch(error => {
            console.log(error.response.data.errors)

        })
    }
}