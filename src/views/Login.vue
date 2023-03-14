<template>
    <div class="min-h-screen sm:p-8 overflow-hidden bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        <Loginform :checkGoogleinfo='checkGoogleinfo'/>
    </div>
</template>
<script>
import Loginform from "../components/Loginform"
import Api from "../apis/Api"
import { useToast } from "vue-toastification";

import Account_error from "../components/Account_error";

export default {
    components: { Loginform },
    data(){
            return{
                checkGoogleinfo:false,
            }
    },


    methods: {
        obtaingoogleauth() {
            this.checkGoogleinfo = true;
            let url = new URL(location.href)
            let params = new URLSearchParams(url.search)
            let state = params.get('state')
            let scope = params.get('scope')
            let authuser = params.get('authuser')
            let code = params.get('code')
            let prompt = params.get('prompt')
            Api.post('/auth/google/callback', {
                
                state: state,
                code: code,
                scope: scope,
                authuser: authuser,
                prompt: prompt,



            }).then(res => {
                console.log(res.data)
                localStorage.setItem('auth', true)
                this.$store.dispatch('fetchUser')
                this.$router.push({ name: 'Continue' })
            }).catch(err => {
                this.checkGoogleinfo=false;
                console.log(err.response.data)
                let errors = err.response.data.errors
                if (errors.account) {
                  
                    
                    const toast = useToast();
                    toast.error({
                        component: Account_error,
                        props:{
                            account: errors.account[0]
                        }

                    }, { 
                        id:'account_error',
                        
                        timeout: false })

                    console.log(errors)
                


                    

                        
                }


            })

        }
    },


    mounted() {
        this.$route.name == 'GoogleAuth' && this.obtaingoogleauth()







    },
    unmounted() {
        useToast().dismiss('account_error');
    }



}

</script>

<style>


</style>