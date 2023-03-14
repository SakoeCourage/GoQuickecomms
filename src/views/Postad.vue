<template>
    <div>
        <main class="lg:container mx-auto sm:mt-5 grid place-items-center relative">
            <div
                class="border-blue border-2 dark:border-0 w-full p-5 pt-16 md:p-10 md:pt-24 bg-white dark:bg-gray-900/50 md:rounded-xl shadow-lg">
                <div
                    class="px-4 md:px-8 flex justify-items-center items-center bg-orange-300 dark:bg-gray-700 backdrop-filter backdrop-blur-md absolute top-0.5 inset-x-0.5 md:rounded-t-xl h-16 md:h-24">
                    <h2 class="font-semibold md:text-lg text-sm text-gray-200">
                        Post
                        <span class="bg-gray-300 px-1 text-gray-400 rounded-md font-semibold font-mono mr-1">Ad</span>

                        <h2 class="inline">{{ auth_user && 'as ' + auth_user.user.name }}</h2>
                    </h2>
                </div>
                <div class="grid gap-8 grid-cols-1">
                    <div class="flex flex-col">
                        <div class="mt-5">
                            <form @submit.prevent="processform()" class="form accent-yellow-500">
                                <div
                                    class="overflow-scroll hidescroll dark:bg-gray-700 rounded-md md:space-y-2 mb-3 border-y-2 border-gray-100 dark:border-y-[1px] dark:border-slate-400/50">
                                    <label class="text-xs font-semibold ml-4  text-gray-600 dark:text-gray-300 py-2">
                                        image
                                        <span class="text-red-400 ">(atleast first two images are required)*</span>
                                    </label>
                                    <div v-if="errors.first_image || errors.second_image || errors.third_image || errors.fourth_image"
                                        ref="error"
                                        class="p-4 mb-4 text-xs md:text-sm text-yellow-700 bg-yellow-100 dark:bg-yellow-500/10 dark:text-orange-400 rounded-lg "
                                        role="alert">
                                        <p v-if="errors.first_image" class="flex items-center" ref="error">
                                            <svg class="inline flex-shrink-0 mr-3 w-5 h-4 md:h-5" fill="currentColor"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            {{ errors.first_image[0] }}
                                        </p>

                                        <p v-if="errors.second_image" class="flex items-center">
                                            <svg class="inline flex-shrink-0 mr-3 w-5 h-4 md:h-5" fill="currentColor"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            {{ errors.second_image[0] }}
                                        </p>

                                        <p v-show="third_image" v-if="errors.third_image" class="flex items-center"
                                            ref="error">
                                            <svg class="inline flex-shrink-0 mr-3 w-5 h-4 md:h-5" fill="currentColor"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            {{ errors.third_image[0] }}
                                        </p>
                                        <p v-show="fourth_image" v-if="errors.fourth_image" class="flex items-center"
                                            ref="error">
                                            <svg class="inline flex-shrink-0 mr-3 w-5 h-4 md:h-5" fill="currentColor"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                            {{ errors.fourth_image[0] }}
                                        </p>
                                    </div>
                                    <div class="relative">
                                        <button v-if="scrolledleft" @mouseover="ishover = true"
                                            @mouseout="ishover = false" @click.prevent="scrolltoLeft"
                                            class="absolute left-0 continue z-20 font-extrabold hover:bg-gray-200 bg-transparent py-2 px-4 rounded-full shadow-md"
                                            style=" top:40%">
                                            <font-awesome-icon icon="chevron-left" class />
                                        </button>
                                        <button v-if="scrolledright" @mouseover="ishover = true"
                                            @mouseout="ishover = false" @click.prevent="scrolltoRight"
                                            class="absolute right-0 continue z-20 font-extrabold hover:bg-gray-200 bg-transparent py-2 px-4 rounded-full shadow-md"
                                            style=" top:40%">
                                            <font-awesome-icon icon="chevron-right" class />
                                        </button>
                                        <div class="flex w-full overflow-scroll hidescroll scroll-snap-x"
                                            id="imageframe_scroll" @scroll="getscrolledamount()">
                                            <Imageframe name="first_image" @first_image="set_first_image"
                                                :removable="!second_image" class="scroll-snap-center"></Imageframe>
                                            <Imageframe :id="first_image && 'next_item'" name="second_image"
                                                @second_image="set_second_image" :inactive="!first_image"
                                                :removable="!third_image" class="scroll-snap-center"></Imageframe>
                                            <Imageframe :id="second_image && 'next_item'" name="third_image"
                                                @third_image="set_third_image" :inactive="!second_image"
                                                :removable="!fourth_image" class="scroll-snap-center"></Imageframe>
                                            <Imageframe :id="third_image && 'next_item'" name="fourth_image"
                                                @fourth_image="set_fourth_image" :inactive="!third_image"
                                                removable="true" class="scroll-snap-center"></Imageframe>
                                        </div>
                                    </div>
                                </div>
                                <div class="md:flex md:flex-row w-full text-xs">
                                    <div class="w-full flex flex-col mb-3">
                                        <label class="font-semibold text-gray-600 dark:text-gray-300 py-2">
                                            Item name
                                            <abbr title="required" class="text-red-500">*</abbr>
                                        </label>
                                        <input placeholder="name of the item" name="item_name" v-model="item_name"
                                            class="focus:border-transparent dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none ring-yellow-500 focus:ring-1 focus:border-none"
                                            type="text" />
                                        <p v-if="errors.item_name" class="text-red-500 text-xs" ref="error">
                                            {{ errors.item_name[0] }}</p>
                                    </div>
                                </div>

                                <div class="flex-auto w-full mb-4 text-xs space-y-2">
                                    <label id="the_label"
                                        class="font-semibold text-gray-600 dark:text-gray-300 py-2">Item
                                        Description/Specification</label>
                                    <input id="x" ref="trix_val" type="hidden" key="trix" v-model="description" />
                                    <trix-editor placeholder="add items description and specification.." input="x"
                                        v-model="description"
                                        class="trix-editor dark:border-0 dark:text-gray-300 dark:bg-gray-700 dark:ring-1 dark:ring-slate-400/50  ring-yellow-500 focus:ring-1 focus:border-none focus:outline-none rounded-lg min-h-[10rem]">
                                    </trix-editor>
                                    <p v-show="description" v-if="errors.description" class="text-red-500 text-xs"
                                        ref="error">{{ errors.description[0] }}</p>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 mb-4 w-full">
                                    <span class>
                                        <label
                                            class="font-semibold text-xs text-gray-600 dark:text-gray-300 py-2 inline leading-6 w-max">Price
                                            GHS</label>
                                        <input type="text" placeholder="0000" id="currency-field" data-type="currency"
                                            ref="price"
                                            class="focus:border-transparent inline w-max bg-grey-lighter dark:border-0 dark:bg-gray-700 dark:text-gray-300 dark:ring-1 dark:ring-slate-400/50 text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none ring-yellow-500 focus:ring-1 focus:border-none text-xs" />
                                        <abbr title="required" class="text-red-500 ml-2">*</abbr>
                                        <p v-if="errors.price" class="text-red-500 text-xs block" ref="error">
                                            {{ errors.price[0] }}</p>
                                    </span>

                                    <span class="text-xs w-max mt-4 md:mt-0">
                                        <label
                                            class="font-semibold text-xs text-gray-600 dark:text-gray-300 block leading-6 w-full">Condition
                                            <abbr title="required" class="text-red-500 ml-2">*</abbr></label>
                                        <nav class="inline-flex items-center">
                                            <input type="radio" name="condition" value="new" v-model="condition" />
                                            <nav class="ml-1 dark:text-gray-300">new</nav>
                                        </nav>
                                        <hr class="transform rotate-90 inline border-gray-200 border-[1px] mx-1" />
                                        <nav class="inline-flex items-center">
                                            <input type="radio" name="condition" value="used" v-model="condition" />
                                            <nav class="ml-1 dark:text-gray-300">used</nav>
                                        </nav>

                                        <p v-if="errors.condition" class="text-red-500 text-xs block" ref="error">
                                            {{ errors.condition[0] }}</p>
                                    </span>
                                </div>

                                <div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                    <div class="w-full flex flex-col mb-3">
                                        <label class="font-semibold text-gray-600 dark:text-gray-300 py-2">
                                            Contact number
                                            <abbr title="required" class="text-red-500">*</abbr>
                                        </label>
                                        <nav class=" flex items-center">
                                            <label class="mr-1 text-gray-500">+233</label>
                                            <input placeholder="0200000000" name="contact_number"
                                                v-model="contact_number"
                                                class="focus:border-transparent block w-full bg-grey-lighter dark:border-0  dark:text-gray-300 dark:bg-gray-700 dark:ring-1 dark:ring-slate-400/50 text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none ring-yellow-500 focus:ring-1 focus:border-none" />
                                        </nav>


                                        <p v-if="errors.contact_number" class="text-red-500 text-xs" ref="error">
                                            {{ errors.contact_number[0] }}</p>
                                    </div>

                                    <div class="w-full flex flex-col mb-3">
                                        <label class="font-semibold text-gray-600 dark:text-gray-300  py-2">
                                            Location
                                            <abbr title="required" class="text-red-500">*</abbr>
                                        </label>
                                        <select name="location"
                                            class="ring-yellow-500 focus:ring-1 dark:text-gray-300 dark:bg-gray-700 dark:ring-1 dark:ring-slate-400/50 dark:border-0 focus:border-none focus:border-transparent block w-full bg-grey-lighter text-gray-500 border border-grey-lighter rounded-lg h-10 px-4 md:w-full focus:outline-none"
                                            v-model="location">
                                            <option disabled selected value>Select location</option>

                                            <option v-for="(location, i) in allLocations" :key="i" :value="i + 2">
                                                {{ location }}</option>
                                        </select>

                                        <p v-if="errors.location" class="text-red-500 text-xs" ref="error">
                                            {{ errors.location[0] }}</p>
                                    </div>

                                    <div class="w-full flex flex-col mb-3">
                                        <label class="font-semibold text-gray-600 py-2 dark:text-gray-300">
                                            Category
                                            <abbr title="required" class="text-red-500">*</abbr>
                                        </label>
                                        <select name="category"
                                            class="focus:border-transparent dark:text-gray-300 block w-full dark:bg-gray-700 dark:ring-1 dark:ring-slate-400/50 dark:border-0 text-gray-500 text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full focus:outline-none ring-yellow-500 focus:ring-1 focus:border-none"
                                            id="integration_city_id" v-model="category">
                                            <option disabled value>Select category</option>

                                            <option v-for="(category, i) in allCategories" :key="i" :value="i + 2">
                                                {{ category }}</option>
                                        </select>

                                        <p v-if="errors.category" class="text-red-500 text-xs" ref="error">
                                            {{ errors.category[0] }}</p>
                                    </div>

                                </div>
                                <!-- Subcategory section  -->
                                <div class=" w-full h-full flex items-center flex-wrap  mb-2  subcategoryparent"
                                    v-if="category">
                                    <div v-if="subcategories"
                                        class="font-semibold text-gray-600 py-2 dark:text-gray-300 w-full text-xs transition-all ">
                                        Category type <abbr title="required" class=" text-red-600">*</abbr>
                                        <nav v-if="errors.subcategory"
                                            class="text-red-500 text-xs inline ml-2 font-normal" ref="error">
                                            {{ errors.subcategory[0] }}</nav>
                                    </div>
                                    <TransitionGroup name="appear" appear tag="button" @click.prevent=""
                                        class=" w-max flex items-center  flex-wrap transition-all   "
                                        v-if="subcategories">
                                        <nav v-for="subcategory in subcategories" :key="subcategory.id"
                                            @click.prevent="subcategory_id = subcategory.id"
                                            class="ring-1 mr-2 mb-2 ring-slate-400/50 dark:text-gray-300 p-2 rounded-lg text-xs transition-all  "
                                            :class="subcategory_id == subcategory.id && 'bg-orange-300 text-white dark:bg-gray-700'">
                                            {{ subcategory.subcategory_name }}
                                            <font-awesome-icon v-if="subcategory_id == subcategory.id" icon="check"
                                                class=" mx-1  rounded-full " />
                                        </nav>
                                    </TransitionGroup>

                                    <nav class="w-full flex item-center flex-nowrap" v-if="!subcategories">
                                        <nav v-for="(subcategory, i) in 5 " :key="i"
                                            class="ring-1 mr-2 w-28 mb-2 ring-slate-400/50 dark:text-gray-300 p-2 rounded-lg text-xs animate-pulse subcategoryloadingchild">
                                            &nbsp;
                                        </nav>
                                    </nav>
                                </div>
                                <div class="flex-auto w-full text-xs space-y-2 mb-8">
                                    <label class="font-semibold text-gray-600  py-2 dark:text-gray-300">State Others if
                                        chossen</label>
                                    <textarea name="others" id
                                        class="focus:border-transparent dark:text-gray-300 dark:bg-gray-700 dark:ring-1 dark:ring-slate-400/50 dark:border-0 min-h-[100px] max-h-[300px] h-20 appearance-none block w-full bg-gray-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4 focus:outline-none ring-yellow-500 focus:ring-1 focus:border-none"
                                        placeholder="State other category" spellcheck="false"
                                        v-model="others"></textarea>

                                    <p v-if="errors.others" class="text-red-500 text-xs" ref="error">state other
                                        Category</p>
                                </div>
                                <p class="text-xs text-red-500 text-right my-3">
                                    Required fields are marked with an
                                    asterisk
                                    <abbr title="Required field">*</abbr>
                                </p>
                                <div class="mt-5 text-right md:space-x-3 md:block flex flex-col">
                                    <button type="submit"
                                        class="mb-2 md:mb-0 bg-orange-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:shadow-outline-orange">
                                        <h1 v-if="!isLoading">Post ad</h1>
                                        <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white mx-auto"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4" />
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>




import 'trix/dist/trix'
import 'trix/dist/trix.css'
import { mapActions, mapState } from "vuex"
import Imageframe from '../components/Imageframe'
import Api from '../apis/Api'
import store from '../store'
import { scroller } from 'vue-scrollto/src/scrollTo';
import { useToast } from "vue-toastification";


const $ = require('jquery');
window.$ = $;



export default {
    components: { Imageframe },
    props: ['auth_user'],
    data() {
        return {
            user_id: '',
            first_image: '',
            second_image: '',
            third_image: '',
            fourth_image: '',
            description: '',
            item_name: '',
            price: '',
            contact_number: '',
            location: '',
            category: '',
            others: '',
            errors: {},
            isLoading: false,
            scrolledleft: false,
            scrolledright: false,
            autoLocation: {},
            autoCategory: {},
            subcategories: null,
            subcategory_id: '',
            condition:''

        }
    },
    methods: {
        container() {
            return document.querySelector('#imageframe_scroll')
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


        },
        scroll_function(el) {
            const firstScrollTo = scroller()
            var options = {
                container: '#imageframe_scroll',
                easing: 'ease-in-out',
                lazy: false,
                offset: -50,
                force: true,
                cancelable: true,

                x: true,
                y: false
            }

            firstScrollTo(el, 200, options)
        },
        set_first_image(file) {
            this.first_image = file;
            this.$nextTick(() => {
                var next_item = document.querySelectorAll('#next_item')
                this.scroll_function(next_item)

            })
        },
        set_second_image(file) {
            this.second_image = file;
            this.$nextTick(() => {
                var next_item = document.querySelectorAll('#next_item')
                this.scroll_function(next_item[next_item.length - 1])
            })

        },
        set_third_image(file) {
            this.third_image = file;
            this.$nextTick(() => {
                var next_item = document.querySelectorAll('#next_item')
                this.scroll_function(next_item[next_item.length - 1])
            })

        },
        set_fourth_image(file) {
            this.fourth_image = file;
        },


        set_user_id() {
            const { businessprofile, user } = this.auth_user
            if (!businessprofile) {
                this.$router.push({ name: 'Continue' })
            } else {
                this.user_id = user.id
            }


        },
        processform() {
            this.isLoading = true

            this.errors = {}

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData();
            data.append('user_id', this.user_id)
            data.append('first_image', this.first_image)
            data.append('second_image', this.second_image)
            data.append('third_image', this.third_image)
            data.append('fourth_image', this.fourth_image)
            data.append('description', this.description)
            data.append('item_name', this.item_name)
            data.append('price', this.$refs.price.value.replaceAll(',', ''))
            data.append('contact_number', this.contact_number)
            data.append('location', this.location)
            data.append('subcategory', this.subcategory_id)
            data.append('category', this.category)
            data.append('others', this.others)
            // data.append('condition', this.condition.includes(['used','new']) ?  this.condition : null)
            if(this.condition == 'used' || this.condition =='new'){
                data.append('condition',this.condition)
            } 

            





            Api.post('/ads/postad', data, config).then((res) => {



                store.commit('reloadBrowseAds', true)


                this.$router.push({ name: "Browseads" })


            }).catch((errors) => {
                this.isLoading = false
                console.log(errors.response.data)
                if (errors.response.data.errors) {

                    this.errors = errors.response.data.errors

                    this.$nextTick(() => {

                        const firstScrollTo = scroller()
                        var options = {
                            easing: 'ease-in',
                            lazy: false,
                            offset: -100,
                            force: true,
                            cancelable: true,

                            x: false,
                            y: true
                        }



                        firstScrollTo(this.$refs.error, 200, options)
                        this.$refs.error.classList.add('u--flash')


                    })
                }



            })


        },

        formatcurrency() {
            $("input[data-type='currency']").on({
                keyup: function () {
                    formatCurrency($(this));
                },
                blur: function () {
                    formatCurrency($(this), "blur");
                }
            });


            function formatNumber(n) {
                // format number 1000000 to 1,234,567
                return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }


            function formatCurrency(input, blur) {


                // get input value
                var input_val = input.val();

                // don't validate empty input
                if (input_val === "") { return; }

                // original length
                var original_len = input_val.length;

                // initial caret position 
                var caret_pos = input.prop("selectionStart");
                input_val = formatNumber(input_val);



                // send updated string to input
                input.val(input_val);

                // put caret back in the right position
                var updated_len = input_val.length;
                caret_pos = updated_len - original_len + caret_pos;
                input[0].setSelectionRange(caret_pos, caret_pos);
            }

        },
        autoLoadcontact() {
            if (this.auth_user.businessprofile) {
                this.contact_number = this.auth_user.businessprofile.contact_number
            }
        }



    },

    computed: {
        ...mapActions(['getCategories', 'getLocations']),
        ...mapState(['allCategories', 'allLocations']),


    },
    watch: {
   

        category() {
            this.subcategories = null

            Api.post('/loadsubcategories', { category_id: this.category }).then(
                (res) => {

                    this.subcategories = res.data.subcategories
                }
            ).catch(err => {
                console.log(err.response)
                this.subcategories = null
            })
        },

        auth_user() {

            this.set_user_id()


        },



        allLocations() {
            if (this.$store.state.auth.businessprofile) {
                this.allLocations.filter((item, i) => {

                    if (i == this.$store.state.auth.businessprofile.location_id - 2) {
                        this.autoLocation.location = item
                        this.autoLocation.value = i + 2
                        this.location = i + 2
                    }


                })

            }

        },
        allCategories() {
            if (this.$store.state.auth.businessprofile) {
                this.allCategories.filter((item, i) => {

                    if (i == this.$store.state.auth.businessprofile.category_id - 2) {
                        this.autoCategory.location = item
                        this.autoCategory.value = i + 2
                        this.category = i + 2
                    }


                })

            }

        }

    },


    created() {
        const { businessprofile, user } = this.auth_user
        if (!businessprofile) {
            this.$router.push({ name: 'Continue' })
        }
    },

    async mounted() {


        this.getCategories
        this.getLocations
        this.auth_user && this.set_user_id()
        this.getscrolledamount()
        this.formatcurrency()
        this.auth_user && this.autoLoadcontact()





    },


}
</script>

<style scoped>
trix-editor ul {
    list-style-type: disc !important;
    margin-left: 1rem !important;
}

trix-editor ol {
    list-style-type: decimal !important;
    margin-left: 1rem !important;
}

.appear-enter-active {
    animation: moveacross 0.5s;
}

.appear-leave-active {
    animation: moveacross 0.5s reverse;
}


.subcategoryparent .subcategoryloadingchild {

    animation: moveacross 1s linear infinite;
}


@keyframes moveacross {
    0% {
        transform: scale(0.99);
        filter: opacity(0.95);
        background-color: rgba(119, 187, 204, 0.137);




    }

    50% {
        transform: scale(0.95);
        filter: opacity(0.90);


    }

    100% {
        transform: unset;
        filter: none;


    }
}

.subcategoryparent .subcategoryloadingchild:nth-child(1) {
    animation-delay: 0.2s;
}

.subcategoryparent .subcategoryloadingchild:nth-child(2) {
    animation-delay: 0.4s;
}

.subcategoryparent .subcategoryloadingchild:nth-child(3) {
    animation-delay: 0.6s;
}

.subcategoryparent .subcategoryloadingchild:nth-child(4) {
    animation-delay: 0.8s;

}
</style>