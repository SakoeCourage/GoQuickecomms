<template>
    <div>
        <div class="container w-full mx-auto">
            <div class="p-1 sticky top-0 z-30 mt-1 text-xs flex items-center">
                <Navlinks @action="this.$router.go(-1)" text="back">
                    <svg
                        class="w-6 h-3 transform rotate-180"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </Navlinks>
                <Navlinks @action="this.$router.push({ name: 'Browseads' })" text="View All Ads" />
                <Navlinks v-if="!this.$store.state.routeparams.category || this.$store.state.routeparams.category != category " @action="changecategory()" :text="category" />

            </div>

            <div class="grid grid-cols-1 lg:flex w-full mt-0 md:mt-2">
                <div class="lg:w-8/12 h-max bg-white dark:bg-gray-800 dark:ring-1 dark:ring-slate-400/10 shadow-inner grid grid-cols-1 p-4">
                    <div
                        class="w-full grid place-items-center relative"
                        :class="isLoading ? 'min-h-30' : 'min-h-max'"
                    >
                        <LoadingSpinner v-if="isLoading" />

                        <div v-if="!isLoading" id="image-slider" class="splide">
                            <div class="splide__track">
                                <ul class="splide__list" v-if="available_images">
                                    <li
                                        class="splide__slide"
                                        v-for="(im, i) in available_images"
                                        :key="i"
                                    >
                                        <div v-if="isLoading" class="mx-auto aspect-square w-full"></div>
                                        <img
                                            class="mx-auto aspect-square"
                                            :src="setImage(fectched_item.created_at, fectched_item[im])"
                                            alt="Sample 1"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="grid place-items-center mt-5 overflow-hidden">
                        <div class="flex p-1">
                            <div id="thumbnail-slider" class="splide">
                                <div class="splide__track">
                                    <ul class="splide__list" v-if="!isLoading">
                                        <li
                                            class="splide__slide"
                                            v-for="(im, i) in available_images"
                                            :key="i"
                                        >
                                            <img
                                                class="mx-auto w-full h-full"
                                                :src="setImage(fectched_item.created_at, fectched_item[im])"
                                                alt="Sample 1"
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="h-full lg:w-4/12 border-2 text-sm border-orange-100 bg-white dark:bg-gray-800 dark:ring-1 dark:ring-slate-400/10 dark:border-0 dark:text-white p-4 lg:ml-2 mt-2 lg:mt-0 relative"
                    :class="isLoading ? 'min-h-30' : 'min-h-max'"
                >
                    <LoadingSpinner v-if="isLoading" />
                    <div class="w-full h-full" v-if="!isLoading">
                        <div class="flex justify-between font-semibold">
                            <span class="w-10/12 uppercase">{{ fectched_item.item_name }}</span>
                            <span
                                class="w-4/12 bg-orange-200 rounded-full px-1 grid place-items-center text-orange-700 text-xs h-6 truncate"
                            >{{ diffForHumans(fectched_item.created_at) }}</span>
                        </div>
                        <hr class="mt-2 dark:bg-gray-800 dark:hidden " />
                        <div class="py-2 flex bg-gray-50 dark:bg-gray-700 dark:mt-2">
                            <span>
                                <font-awesome-icon
                                    icon="user"
                                    class="inline text-xs fas fa-user mx-1 text-orange-300 mb-0.5 opacity-75 mr-4"
                                />
                            </span>
                            <router-link
                                v-if="fectched_item"
                                :to="'/' + fectched_item.user.name + '/profile'"
                            >{{ fectched_item.user.name }}</router-link>
                        </div>
                        <div class="py-2 flex">
                            <span>
                                <font-awesome-icon
                                    icon="map-marker-alt"
                                    class="inline fas fa-map-marker-alt text-orange-300 mx-1 mb-0.5 opacity-75 mr-4"
                                />
                                {{ location }}
                            </span>
                        </div>
                        <div class="py-2 flex bg-gray-50 dark:bg-gray-700">
                            <font-awesome-icon
                                icon="layer-group"
                                class="inline fas fa-layer-group text-orange-300 mx-1 mb-0.5 opacity-75 mr-4"
                            />
                            {{ category }}  <nav class="ml-2 rounded-full bg-orange-100 px-2 dark:bg-gray-500"> {{subcategory ?? 'not available'}}</nav>
                        </div>
                        <div class="py-2 flex">
                            <font-awesome-icon
                                icon="phone"
                                class="inline text-xs fas fa-phone mx-1 text-orange-300 mb-0.5 opacity-75 transform rotate-90 mr-4"
                            />
                            <a
                                :href="'tel:0' + fectched_item.contact_number"
                            >{{ '+233 ' + fectched_item.contact_number }}</a>
                        </div>
                       
                        <div class="pl-2 py-2 flex items-center bg-gray-50 dark:bg-gray-700">
                            <span
                                class="text-orange-300 opacity-75 text-lg transform scale-105 font-bold mr-4"
                            >₵</span>
                            <span class="font-semibold">{{  new Intl.NumberFormat({ style: 'currency', currency: 'GHS' }).format(fectched_item.price)  }}</span>
                        </div>

                                <div class="py-2 flex">
                            <span>
                                <nav
                                
                                    class="inline fas fa-map-marker-alt text-orange-500 dark:text-orange-300 mx-1 mb-0.5 opacity-75 mr-4"
                                >condition</nav>
                               <span class=" rounded-full bg-orange-100 px-2 dark:bg-gray-500"> {{ fectched_item.condition ?? 'old'  }} item</span>
                            </span>
                        </div>


                        <!-- Star Section -->
                        <div class="flex items-center">
                            <span
                                class="text-orange-300  dark:bg-slate-900 opacity-75 text-xs transform scale-105 font-bold mr-2 bg-orange-50 text-center p-1"
                            >
                                <p>Ad</p>Rating
                            </span>

                            <Togglestar
                                :ad_id="fectched_item.id"
                                :author_id="fectched_item.user_id"
                                :liked_by="liked_by"
                                :likes="likes"
                            />
                        </div>

                        <div
                            v-if="fectched_item.description"
                            class="w-full border-2 border-gray-200 text-sm p-3 trix-editor mt-5 dark:border-0 dark:bg-gray-800 dark:ring-1 dark:ring-slate-400/10"
                            v-html="fectched_item.description"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mx-auto bg-gray-200 dark:bg-gray-800 mt-5">
            <button
                class="bg-gray-50 dark:bg-gray-700 dark:text-white text-sm  max-w-max px-4 xl:px-4 py-1 xl:py-2 rounded-t flex-shrink-0 flex items-center"
            >
                <svg
                    class="h-6 text-oranage-300 p-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fal"
                    data-icon="bars"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"
                        class
                    />
                </svg>
                <span class="ml-4 text-gray-500 dark:text-white">you might also be interested in</span>
            </button>
            <div class="relative">
                <button
                    v-if="scrolledleft"
                    @click="scrolltoLeft"
                    class="absolute left-0 continue z-20 font-extrabold hover:bg-gray-200 bg-transparent py-2 px-4 rounded-full shadow-md"
                    style=" top:40%"
                >
                    <font-awesome-icon icon="chevron-left" />
                </button>
                <button
                    v-if="scrolledright"
                    @click="scrolltoRight"
                    class="absolute right-0 continue z-20 font-extrabold hover:bg-gray-200 bg-transparent py-2 px-4 rounded-full shadow-md"
                    style=" top:40%"
                >
                    <font-awesome-icon icon="chevron-right" />
                </button>

                <div
                    class="bg-gray-50 w-full dark:bg-gray-700 p-2 scroll-snap-x flex hidescroll gap-4 overflow-x-scroll overflow-y-hidden relative"
                    id="interested_in_container"
                    @scroll="getscrolledamount()"
                    style="min-height: 15rem;"
                >
                    <LoadingSpinner v-if="!related" />
                    <SmartAds
                        class="scroll-snap-center"
                        v-for="items in related"
                        :key="items.id"
                        :image_one="items.image_one"
                        :created_at="items.created_at"
                        :title="items.item_name"
                        :price="items.price"
                        :slug="items.slug"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script >
import SmartAds from "../components/SmartAds";
import LoadingSpinner from "../components/LoadingSpinner"
import Api from "../apis/Api"
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from "dayjs"
import { getmonth } from "../apis/Getmonth"
import { nextTick } from 'vue'
import { setImage } from '../apis/Util'
import Togglestar from "../components/Togglestar";

import { Splide } from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

import Navlinks from "../components/Navlinks"




export default {
    components: { SmartAds, LoadingSpinner, Togglestar, Navlinks },
    data() {
        return {

            images_index: ['image_one', 'image_two', 'image_three', 'image_four'],

            fectched_item: '',
            location: '',
            category: '',
            available_images: '',
            scrolledleft: false,
            scrolledright: true,
            related: '',
            isLoading: false,
            liked_by: '',
            likes: '',
            subcategory: ''

        }
    },
    computed: {
        slug() {
            return this.$route.params.slug
        }
    },

    methods: {

        changecategory(){
                this.$store.commit('reloadBrowseAds', true)
                this.$store.commit('setrouteParams_category', this.category)
                this.$router.push({ name: 'Browseads' })


           }, 
        fetchitems: function () {
            this.isLoading = true;
            Api.get('/ads/' + this.slug).then((response => {
                this.isLoading = false;
                this.fectched_item = response.data.ad
                this.category = response.data.category
                this.location = response.data.location
                this.related = response.data.related
                this.liked_by = response.data.liked_by,
                this.likes = response.data.likes
                this.subcategory = response.data.subcategory

                console.log(response.data)
               




            })).catch((error) => {
                  
                  if(error.response.status === 404){
                        this.$router.push({name:'Notfound'})

                }else{
                     this.isLoading = false;
                        console.log(error.response.data)
                }
            })
        },
        diffForHumans(date) {
            if (!date) {
                return null
            }

            return dayjs(date).fromNow();


        },
        setSlider: function () {
            {
                let main = new Splide('#image-slider', {
                    arrows: true,
                    rewind: true,
                })
                let thumb = new Splide('#thumbnail-slider', {

                    fixedWidth: 100,
                    fixedHeight: 70,
                    gap: 10,
                    rewind: true,
                    pagination: false,
                    cover: false,
                    focus: 'center',
                    arrows: false,
                    isNavigation: true,
                    breakpoints: {
                        600: {
                            fixedWidth: 60,
                            fixedHeight: 44,
                        },

                    }
                })

                main.sync(thumb)
                main.mount()
                thumb.mount()





            }
        },
        setImage,
        setavailableimages: function () {

            var marr = []
            this.images_index.map((item) => {
                if (this.fectched_item[item]) {
                    marr.push(item)

                }


            })
            this.available_images = marr
            nextTick(() => {
                this.setSlider()
            })




        },
        container() {
            return document.querySelector('#interested_in_container')
        },

        getviewPortWidth() {

            let intViewportWidth = window.innerWidth;
            let scrollamout = 0;
            if (intViewportWidth <= 700) {
                scrollamout = 200;
            } else if (intViewportWidth > 700 && intViewportWidth <= 900) {
                scrollamout = 300;
            }
            else if (intViewportWidth > 900) {
                scrollamout = 600;
            }
            return scrollamout;


        },
        getscrolledamount() {
            this.container().scrollLeft > 0 ? this.scrolledleft = true : this.scrolledleft = false;
            this.container().scrollWidth == this.container().scrollLeft + this.container().getBoundingClientRect().width ? this.scrolledright = false : this.scrolledright = true;


        },

        scrolltoLeft() {



            this.container().scrollBy({
                left: -(this.getviewPortWidth()), behavior: 'smooth'
            })




        },
        scrolltoRight() {


            this.container().scrollBy({
                left: this.getviewPortWidth(), behavior: 'smooth'
            })


        }


    }
    , watch: {
        fectched_item() {
            this.setavailableimages()




        },


        $route(to, from) {
            to.matched[0].name == 'Viewad' && this.fetchitems()
        },
        isLoading() {
            this.container().scrollTo({ left: 0, behavior: 'smooth' })
        }





    },
    async mounted() {

       
        this.fetchitems();
        dayjs.extend(relativeTime);

          

    }





}

</script>
<style scoped>
#thumbnail-slider-list .splide__slide.is-visible.is-active {
    border: 1px solid rgba(254, 215, 170, 1);
}

.min-h-30 {
    min-height: 30rem;
}
.min-h-20 {
    min-height: 20rem;
}
.min-h-max {
    min-height: max-content;
}
</style>