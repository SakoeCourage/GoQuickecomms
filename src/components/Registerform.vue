<template>
    <div class="z-0 relative flex flex-col sm:justify-center items-center ">
        <div class="relative sm:max-w-sm w-full">
            <div
                class="bg-orange-400 opacity-40 shadow-lg w-full h-full rounded-3xl absolute transform"
            ></div>
            <div
                class="relative w-full h-full sm:rounded-3xl px-6 py-4 bg-gray-100 shadow-md ring-4 ring-white ring-opacity-40"
            >
                <div
                    class="absolute top-0 left-0 bg-oranage-500 opacity-40 p-4 text-white rounded-tl-3xl rounded-br-3xl"
                >SIGN UP</div>

                <form @submit.prevent="processregisterform()" class="mt-12">
                    <div>
                        <input
                            type="text"
                            v-model="fields.name"
                            placeholder="username"
                            class="px-4 mt-1 block w-full border-none ring-orange-300 focus:ring-1 bg-sky-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:border-oranage-300 focus:border-2"
                        />
                        <div
                            v-if="errors.name"
                            class="text-xs text-red-300 mt-2"
                        >{{ errors.name[0] }}</div>
                    </div>
                    <div class="mt-7">
                        <div>
                            <input
                                type="text"
                                v-model="fields.email"
                                placeholder="Email"
                                class="px-4 mt-1 block w-full border-none ring-orange-300 focus:ring-1 bg-sky-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:outline-none focus:border-oranage-300 focus:border-2"
                            />
                            <div
                                v-if="errors.email"
                                class="text-xs text-red-300 mt-2"
                            >{{ errors.email[0] }}</div>
                        </div>
                    </div>

                    <div class="mt-7">
                        <input
                            type="password"
                            v-model="fields.password"
                            placeholder="password"
                            class="px-4 mt-1 block w-full ring-orange-300 focus:ring-1 border-none bg-sky-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:outline-none"
                        />
                        <div
                            v-if="errors.password"
                            class="text-xs text-red-300 mt-2"
                        >{{ errors.password[0] }}</div>
                    </div>

                    <div class="mt-7">
                        <input
                            type="password"
                            v-model="fields.password_confirmation"
                            placeholder="password confirm"
                            class="px-4 mt-1 block w-full border-none ring-orange-300 focus:ring-1 bg-sky-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:outline-none"
                        />
                    </div>

                    <div class="mt-7 flex">
                        <label
                            for="remember_me"
                            class="inline-flex items-center justify-center w-full cursor-pointer"
                        >
                            <input
                                id="remember_me"
                                type="checkbox"
                                class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="remember"
                            />
                            <span class="ml-2 text-sm text-gray-600 text-center">remember me</span>
                        </label>
                    </div>

                    <div class="mt-7">
                        <button
                            class="flex items-center justify-center bg-oranage-400 opacity-60  w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none focus:ring-orange-500 focus:ring-offset-orange-200 transition ease-in duration-200 focus:ring-2 focus:ring-offset-2"
                        >
                            <h1
                                v-if="!isLoading"
                                class="text-center text-base font-semibold"
                            >Sign up</h1>
                            <svg
                                v-if="isLoading"
                                class="animate-spin mx-2 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="flex mt-7 items-center text-center">
                        <hr class="border-gray-300 border-1 w-full rounded-md" />
                        <label class="block font-medium text-sm text-gray-600 w-full">Sign up with</label>
                        <hr class="border-gray-300 border-1 w-full rounded-md" />
                    </div>

                    <div class="flex gap-4 item-center mt-7">
                        <button
                            @click.prevent="obtaingoogleauth()"
                            type="button"
                            class="relative py-5 px-4 flex justify-center items-center bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        >
                            <Transition name="slide-up">
                                <h1 class="absolute" v-if="getGoogleinfo">
                                    <svg
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        class="mr-2 inline"
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"
                                        />
                                    </svg>
                                    Getting info
                                    <span class="loading_google">
                                        <span>.&nbsp;</span>
                                        <span>.&nbsp;</span>
                                        <span>.&nbsp;</span>
                                    </span>
                                </h1>
                                <h1 class="absolute" v-else>
                                    <svg
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        class="mr-2 inline"
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"
                                        />
                                    </svg>
                                    Google
                                </h1>
                            </Transition>
                        </button>
                    </div>

                    <div class="mt-7">
                        <div class="flex justify-center items-center">
                            <router-link
                                :to="{ name: 'Login' }"
                                class="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                            >Sign instead</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import User from "../apis/User";
import store from "../store";
import Api from "../apis/Api";
import { useToast } from "vue-toastification";


export default {
    components: {

    },
    data() {
        return {
            fields: {},
            errors: {},
            isLoading: false,
            getGoogleinfo: false,
        };
    },
    methods: {

        obtaingoogleauth() {
            this.getGoogleinfo = true;
            Api.get('/auth/google/redirect').then((res) => {



                var newDoctype = document.createElement('div')
                newDoctype.innerHTML = res.data.path
                var link = newDoctype.querySelector('a').href

                window.location.href = link;




            }).catch(error => {
                let errors = error.response.errors
                this.getGoogleinfo = false;


                console.log(error.response)

            })



        },

        processregisterform() {
            this.errors = [];
            this.isLoading = true;
            User.register(this.fields)
                .then(() => {

                    useToast().success('account created',{timeout:1600})
                    this.$router.push({ name: "Login" });
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                        this.isLoading = false;
                        console.log(error.response.data.errors)
                    }
                });
        },
    },
    mounted() {


    }
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(30px);
  
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}


.loading_google>span{
   
    animation: step infinite 1.5s linear  ;

    
}
@keyframes step {
    from{
        color:white
    }
    to{
        color: #075985;
    }
    
}
.loading_google>span:nth-child(1){
   
    
}
.loading_google>span:nth-child(2){
    animation-delay: 0.5s;
}
.loading_google>span:nth-child(3){
    animation-delay: 1s;
}

</style>