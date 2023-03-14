<template>
    <keep-alive>
        <div class="w-full text-white">
            <div class="container mx-auto my-5 mt-12 md:p-5">
                <div class="lg:flex no-wrap md:-mx-2">
                    <!-- Left Side -->
                    <div class="w-full lg:w-4/12 md:mx-2 mb-2 relative">
                        <!-- Profile Card -->

                        <div
                            class="bg-white dark:bg-gray-700 dark:ring-1 dark:ring-slate-400/50 px-3 border-orange-200 border-b-4 flex flex-col text-sm relative min-h-[16rem]">
                            <div v-if="!businessprofile"
                                class="absolute inset-0 bg-orange-50 bg-opacity-50 dark:bg-gray-700 backdrop-filter backdrop-blur-md grid place-items-center z-30">
                                <nav class="text-gray-400 text-lg flex flex-col">no profile found</nav>
                            </div>
                            <div v-if="businessprofile && businessprofile.profile_image"
                                class="image h-16 w-16 overflow-hidden shadow-outline-orange rounded-full self-center transform -translate-y-10">
                                <img class="h-full w-full mx-auto rounded-full"
                                    :src="setProfileImage(businessprofile.profile_image)" alt />
                            </div>
                            <div class="transform">
                                <h1
                                    class="text-gray-900 dark:text-gray-300 font-bold text-xl leading-8 my-1 block text-center">
                                    {{ user.name ?? '' }}</h1>

                                <h3 v-if="businessprofile"
                                    class="text-gray-600 font-lg text-semibold leading-6 text-center dark:text-gray-300">
                                    {{ businessprofile ? businessprofile.business_name : '' }}</h3>

                                <ul
                                    class="bg-gray-100 dark:text-gray-300 dark:bg-gray-600 dark:hover:text-gray-300 dark:ring-1 dark:ring-slate-400/30 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li class="flex items-center py-3">
                                        <span>Rating</span>
                                        <span class="ml-auto">
                                            <span v-if="businessprofile"
                                                class="bg-orange-300 py-1 px-2 rounded text-gray-700 text-sm">5
                                                stars</span>
                                        </span>
                                    </li>
                                    <li class="flex items-center py-3" v-if="user">
                                        <span>Joined</span>

                                        <span class="ml-auto">{{ diffForHumans(user.created_at) }}</span>
                                    </li>
                                    <li class="flex items-center py-3" v-if="opened" v-cloak>
                                        <span>email</span>
                                        <span class="ml-auto">
                                            <a v-if="businessprofile" class="text-blue-800"
                                                :href="`mailTo:${businessprofile.email}`">
                                                <!-- {{ isset($user->businessprofile->email) ? $user->businessprofile->email:$user->email }} -->
                                                {{ businessprofile.email ?? 'business email not found' }}
                                            </a>
                                        </span>
                                    </li>
                                    <li class="flex items-center py-3" v-if="opened" v-cloak>
                                        <span>contact</span>
                                        <span class="ml-auto" v-if="businessprofile">
                                            <a
                                                :href="'tel:0' + businessprofile.contact_number">{{ "+233 " + businessprofile.contact_number ?? 'no contact found' }}</a>
                                        </span>
                                    </li>
                                    <li class="flex items-center py-3" v-if="opened" v-cloak>
                                        <span>address</span>
                                        <span class="ml-auto">
                                            <address v-if="businessprofile">{{ businessprofile.address }}</address>
                                        </span>
                                    </li>

                                    <li class="flex items-center py-3" v-if="opened" v-cloak>
                                        <span>category</span>
                                        <span class="ml-auto">
                                            <span v-if="businessprofile">{{ category ?? "not found" }}</span>
                                        </span>
                                    </li>

                                    <li class="flex items-center py-3" v-if="opened" v-cloak>
                                        <span>location</span>
                                        <span class="ml-auto">
                                            <span v-if="businessprofile">{{ location ?? "not found" }}</span>
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <button v-show="opened" @click="opened = false" v-cloak
                                class="block w-full transform -translate-y-8 dark:bg-gray-400 dark:hover:bg-gray-400 text-orange-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-orange focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                <span>Show Less Information</span>
                            </button>

                            <button v-if="!opened" @click="opened = true" v-cloak
                                class="transform -translate-y-8 block w-full dark:bg-gray-400 dark:hover:bg-gray-400  text-orange-800 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none focus:shadow-outline-orange focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                <span>Show Full Information</span>
                            </button>
                            <router-link :to="{ name: 'Editprofile' }" v-if="author"
                                class="text-orange-500 bg-orange-50 px-2 dark:bg-gray-600 dark:text-gray-300 rounded-md shadow-md m-1 absolute right-0">
                                edit
                                <font-awesome-icon icon="pen-to-square" />
                            </router-link>
                        </div>
                    </div>

                    <div class="w-full lg:w-8/12 bg-white dark:bg-gray-900/50 min-h-screen rounded-t-md">
                        <div ref="headbar"
                            class="flex items-center justify-evenly min-h-10 h-14 bg-orange-300 dark:bg-gray-700 rounded-t-md">
                            <span class="text-gray-500 dark:text-gray-300 px-2 text-xs md:text-sm py-1.5">
                                {{ user.name ?? 'user' + '\'s' }}
                                <span
                                    class="bg-gray-300 dark:text-gray-500 px-1 rounded-md font-semibold font-mono">Ads</span>
                            </span>
                            <nav class="flex items-center bg-orange-200 p-0.5 py-1 rounded-md pl-2">
                                <span class="text-gray-500 dark:text-gray-800 text-xs md:text-sm">showing recent</span>

                            </nav>
                        </div>

                        <div
                            class="px-2 text-black grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 mt-5 relative">
                            <div v-if="usersads.length == 0 && !isLoading"
                                class="w-full flex item-center justify-center absolute inset-0 text-center overflow-hidden h-min border-green-500">
                                <div class="w-max h-full text-gray-600 " v-if="usersads.length == 0"> no ads found
                                    <button @click="$router.push({ name: 'Continue' })"
                                        class="block border-2 border-orange-200 mt-2 rounded-full p-2 text-gray-400 text-xs md:text-sm"
                                        v-if="author && !businessprofile && !isLoading">

                                        update profile </button>
                                </div>
                            </div>

                            <TransitionGroup name="fade">
                                <Searchcard class="searchcard" v-for="item in usersads" :key="item.id"
                                    :item_name="item.item_name" :price="item.price" :item_id="item.id"
                                    :user_id="item.user_id" :slug="item.slug" @delete-item="deleteitem"
                                    :deleting_id="deleting_id">
                                    <img class="w-full h-full aspect-square bg-gray-200/80 dark:bg-[#6b7280]" id="imgtag"
                                        :src="setImage(item.created_at, item.image_one)" />
                                    <img class="w-full h-full aspect-square bg-gray-200/80 dark:bg-[#6b7280]"
                                        :src="setImage(item.created_at, item.image_two)" />
                                </Searchcard>
                            </TransitionGroup>

                            <Searchcard v-if="isLoading" :deleting_id="false"/>
                            <Searchcard v-if="isLoading" :deleting_id="false" />
                            <Searchcard v-if="isLoading" :deleting_id="false" />
                            <Searchcard v-if="isLoading" :deleting_id="false" />
                        </div>
                        <div id="fetchmore" class="text-center opacity-100 w-0 h-0 overflow-hidden text-gray-500">
                            <button>fetch more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </keep-alive>
</template>
<script>
import Api from "../apis/Api"
import { setImage, diffForHumans, setProfileImage } from '../apis/Util.js'
import Searchcard from "../components/Searchcard"
import Pagination from "../components/Pagination"

import { scroller } from 'vue-scrollto/src/scrollTo';

export default {
    components: { Searchcard, Pagination,  },
    data() {
        return {

            opened: false,

            user: '',
            usersads: '',
            businessprofile: '',
            location: '',
            category: '',
            first_page_url: '',
            prev_page_url: '',
            last_page: '',
            path: '',
            last_page_url: '',
            current_page: '',
            next_page_url: '',
            links: '',
            isLoading: false,
            total: '',
            author: false,
            deleting_id: ''



        }
    },
    computed: {
        username() {
            return this.$route.params.username
        },
    },
    methods: {
        fetchmoreads() {
            let element = document.querySelector('#fetchmore')



            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (this.next_page_url != null) {
                        if (entry.isIntersecting) {
                            observer.unobserve(entry.target)
                            console.log(this.next_page_url)
                            this.fetch_user_details(this.next_page_url)
                        }
                    }

                })


            }

            )



            observer.observe(element)

        },

        fetch_user_details(route) {
            this.isLoading = true
            Api.get(route ?? `/${this.username}/profile`).then((res) => {
                res.data && (this.isLoading = false)
                const { ads, user } = res.data

                this.user = user

                this.usersads = [...this.usersads, ...ads.data]




                this.businessprofile = user.businessprofile
                this.location = res.data.location
                this.category = res.data.category
                this.first_page_url = ads.first_page_url
                this.prev_page_url = ads.prev_page_url
                this.last_page = ads.last_page
                this.path = ads.path
                this.last_page_url = ads.last_page_url
                this.current_page = ads.current_page
                this.next_page_url = ads.next_page_url
                this.links = ads.links
                this.total = ads.total





                if (this.$store.state.auth) {
                    this.$store.state.auth.user.id === user.id && (this.author = true);

                }
                this.$nextTick(() => {

                    this.fetchmoreads()

                })








            }).catch(error => {

                if (error.response.status === 404) {
                    this.$router.push({ name: 'Notfound' })
                } else {
                    this.isLoading = false
                    console.log(error.response.data)
                }

            })
        },
        setImage,
        diffForHumans,
        setProfileImage,

        deleteitem(item_id) {
            this.deleting_id = item_id

            Api.post('/ad/delete', { ad_id: item_id }).then(res => {
                this.deleting_id = ''
                this.$store.commit('reloadBrowseAds', true)
                this.usersads = this.usersads.filter((item) => {
                    return item_id != item.id

                })
            }).catch(err => {
                this.deleting_id = ''
                console.log(err.response.data)
            })



        }


    },
    watch: {
        $route(to) {
            if (to.name == 'Userprofile') {

                this.usersads = ''
                this.opened = false,
                    this.user = '',
                    this.businessprofile = '',
                    this.location = '',
                    this.category = '',
                    this.first_page_url = '',
                    this.prev_page_url = '',
                    this.last_page = '',
                    this.path = '',
                    this.last_page_url = '',
                    this.current_page = '',
                    this.next_page_url = '',
                    this.links = '',
                    this.isLoading = false,
                    this.total = '',
                    this.author = false,
                    this.deleting_id = ''
                this.fetch_user_details()
            }
        }



    },


    mounted() {

        this.fetch_user_details()
        const firstScrollTo = scroller()
        let element = this.$refs.headbar
        firstScrollTo(element)







    },





}

</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */

.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
    position: absolute;
    width: 0;
    height: 0;

    z-index: -1;
}
</style>