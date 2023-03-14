<template>

    <div class="" id="top">
        <div
            class="flex md:h-auto flex-col md:flex-row justify-between px-1 md:px-4 sticky top-0 z-10 bg-opacity-50 backdrop-filter backdrop-blur-md  md:py-1 bg-gray-200 dark:bg-gray-800 py-1"
        >
            <div class="w-full md:w-1/2 relative">
                <Minisearch
                    v-on:fetchItems="fetchItems"
                    @search-value="searchvalue"
                    @search-focus="toggle_index()"
                    @toggleshowsearch="show_search_index = false"
                    class="h-10 w-full mb-2 md:mb-auto"

                />
                <!-- search index -->
                <SearchIndex class="w-full"
                    :show_search_index="show_search_index"
                    :search_indexes="search_indexes"
                    :currentvalue ="currentvalue"
                    :show_at_route_change ="show_at_route_change"
                    @searchitem="searchitem"
                
                />
            </div>
            

            <div
                class="bg-gray-50 dark:bg-gray-700 dark:border-0 shadow-xl text-sm flex items-center justify-between w-full md:w-1/2 h-10 md:ml-2 rounded-full px-2 border-2 border-gray-300 overflow-scroll hidescroll fast_anim"
                id="filter"
            >
                <button
                    class="outline-none bg-gray-200 dark:bg-slate-500  p-1 rounded-full px-2 flex justify-center items-center"
                    @click="showModal = true"
                >
                    <font-awesome-icon icon="filter" class="bg-inherit text-orange-200 dark:text-orange-400" />

                    <!-- togglebutton -->
                    <span class="flex items-center justify-center w-full">
                        <h1
                            class="w-full mx-1 text-gray-500 dark:text-slate-200 text-xs md:text-sm "
                        >{{ this.$store.getters.togglefilter ? 'Filter is on' : 'Fiter items' }}</h1>
                        <label for="toggle" class="flex items-center cursor-pointer">
                            <!-- toggle -->
                            <div class="relative">
                                <!-- input -->
                                <input type="checkbox" id="toggle" class="sr-only" />
                                <!-- line -->
                                <div
                                    class="block w-9 h-5 rounded-full"
                                    :class="this.$store.getters.togglefilter  ? 'bg-green-400' : 'bg-orange-100 dark:bg-orange-400'"
                                ></div>
                                <!-- dot -->
                                <div
                                    :class="[' absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition text-gray-400', this.$store.getters.togglefilter && 'transform translate-x-full  ']"
                                ></div>
                            </div>
                            <!-- label -->
                        </label>
                    </span>
                </button>

                <nav class="text-gray-500 dark:text-slate-200">
                    found:
                    <h1 class="inline italic">{{ total }} items</h1>
                </nav>
            </div>
            
        </div>
         <nav class="w-full flex item-center flex-wrap p-1 px-4 subcategoryparent "  >
                                    

                                  
                                    <TransitionGroup name="appear" appear tag="button" 
                                        class=" w-max flex items-center  flex-wrap transition-all   "
                                        v-if="this.$store.state.currentSubCategories  && this.$store.state.currentSubCategories  !='loading'">
                                        <nav v-for="subcategory in this.$store.state.currentSubCategories " :key="subcategory.id"  @click.prevent="this.$store.commit('setrouteParams_subcategory',subcategory.id),this.$emit('fetchItems')"
                                            
                                            class="ring-1 mr-2 mb-2 ring-slate-400/50 dark:text-gray-300 p-2 rounded-lg text-xs transition-all  "
                                            :class="subcategory.id == this.$store.state.routeparams.subcategory && 'bg-orange-300 text-white dark:bg-gray-700'">
                                            {{ subcategory.subcategory_name }}
                                            <font-awesome-icon v-if="subcategory.id == this.$store.state.routeparams.subcategory" icon="check"
                                                class=" mx-1  rounded-full " />
                                        </nav>
                                    </TransitionGroup>

                                     <div   class=" w-full  mb-2 flex items-center  " v-if="this.$store.state.currentSubCategories =='loading'" >
                                        <nav v-for=" i in 5 " :key="i" 
                                            class=" p-2 w-28 mr-2 ring-1 animate-pulse ring-slate-400/50 dark:text-gray-300 rounded-lg text-xs  subcategoryloadingchild">
                                            &nbsp;
                                        </nav>
                                </div>
                                    </nav>
                           

        <div
            :class="['lg:gap-3 w-full pt-1 md:pt-3 px-0 md:px-8 bg-gray-200 dark:bg-gray-800 pb-4 min-h-screen', isempty ? 'flex items-center justify-center' : 'grid grid-cols-1 gap-y-2 md:gap-y-2 md:gap-x-2  md:grid-cols-2 lg:grid-cols-3 ', isLoading && 'grid grid-cols-1 gap-y-2 md:gap-y-1 md:grid-cols-2 lg:grid-cols-3 ']"
        >
            <div class="text-gray-500 text-center" v-if="isempty" v-show="!isLoading">
                <div class="mb-2">nothing was found</div>

                <router-link
                    :to="{ name: 'Postad' }"
                    class="shadow-2xl mt-2 bg-orange-300 text-white rounded-md p-2"
                >post an ad</router-link>
            </div>

            <Searchcard v-show="!ads"
                class="w-full h-full "
                    
                v-for="(x, i) in 12"
                :key="i"
            >
               <div class="aspect-square"></div> 
               <div class="aspect-square"></div> 

            </Searchcard>
            <Searchcard class="searchcard" v-show="ads" v-for="item in ads" :key="item.id"
                                    :item_name="item.item_name" :price="item.price" :item_id="item.id"
                                    :user_id="item.user_id" :slug="item.slug" @delete-item="deleteitem"
                                    :deleting_id="deleting_id" :location="item.location" :created_at="item.created_at">
                                    <img class="w-full h-full aspect-square bg-gray-200/80 dark:bg-[#6b7280]" id="imgtag"
                                        :src="setImage(item.created_at, item.image_one)" />
                                    <img class="w-full h-full aspect-square bg-gray-200/80 dark:bg-[#6b7280]"
                                        :src="setImage(item.created_at, item.image_two)" />
         </Searchcard>
     
        </div>
    </div>
    <!-- modal and backdrop -->
    <Backdrop class="z-[100]" v-if="showModal">
        <Modal
            title="Filter Items"
            accept="apply"
            decline="reset"
            class
            ref="modal"
            v-on:close-modal="onClickAway"
            v-on:modal-accept="searchwithfilter"
            v-on:modal-decline="decline"
        >
            <div class="p-6 flex flex-col w-full">
                <nav class="w-full md:w-[60%] text-sm mx-auto">
                    <nav
                        class="my-2 leading-relaxed text-gray-500 dark:text-white flex items-center justify-between"
                    >
                        <h1 class>Price:</h1>
                        <Filter
                            :given_options="['high to low', 'low to high']"
                            placeholder="price"
                            commitable="setrouteParams_price"
                        />
                    </nav>
                    <hr />

                    <nav
                        class="my-2 leading-relaxed text-gray-500 dark:text-white flex items-center justify-between"
                    >
                        <h1>Oder:</h1>
                        <Filter
                            :given_options="['recent', 'old',]"
                            placeholder="order"
                            commitable="setrouteParams_order"
                        />
                    </nav>
                    <hr />
                    <nav
                        class="my-2 leading-relaxed text-gray-500 dark:text-white flex items-center justify-between"
                    >
                        <h1>condition:</h1>
                        <Filter
                            :given_options="['used', 'new']"
                            placeholder="condition"
                            commitable="setrouteParams_condition"
                        />
                    </nav>
                    <hr />
                    <nav
                        class="my-2 leading-relaxed text-gray-500 dark:text-white flex items-center justify-between"
                    >
                        <h1>Category:</h1>
                        <Filter
                            v-if="allCategories()"
                            :given_options="['All Categories' ,...allCategories()]"
                            placeholder="category"
                            commitable="setrouteParams_category"
                        />
                    </nav>
                    <hr />
                    <nav
                        class="my-2 leading-relaxed text-gray-500 dark:text-white flex items-center justify-between"
                    >
                        <h1>Location:</h1>
                        <Filter
                            v-if="allLocations()"
                            :given_options="['All Location',...allLocations()]"
                            placeholder="location"
                            commitable="setrouteParams_location"
                        />
                    </nav>
                </nav>
            </div>
        </Modal>
    </Backdrop>
</template>
<script>
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import dayjs from "dayjs"
import { getmonth } from "../apis/Getmonth"
import Searchcard from "./Searchcard"
import Minisearch from "./Minisearch"

import Filter from "./Filter"
import { mapState, mapMutations } from 'vuex'
import Modal from "./Modal"
import Backdrop from "./Backdrop"
import store from '../store'
import { setImage } from '../apis/Util'
import Api from "../apis/Api"
import { useToast } from "vue-toastification";
import NewAdtoast from './NewAdtoast'
import { listeners } from "process";
import SearchIndex from "./SearchIndex";




export default {
    props: ["ads", "isLoading", "total"],
    emits: ['fetchItems']
    ,
    data() {
        return {

            showModal: false,
            
            isempty: false,

            
            search_indexes: '',
            currentvalue: '',
            show_search_index: false,
            loading_index: false,

            show_at_route_change: false,
          


        }
    },
    components: { Searchcard, Minisearch, Filter, Modal, Backdrop,SearchIndex },

    computed: {


        ...mapState(['routeparams', 'NewAd']),
        ...mapMutations(['resetParams', 'setNewAdAdded']),
        gettotal() {

            return this.total
        },






    },
    watch: {
        ads(){
            console.log(ads)
        },
           

        NewAd() {
          this.checknewAdd()

        },
        showModal() {
            this.showModal ? disableBodyScroll(document.querySelector('body')) : enableBodyScroll(document.querySelector('body'))


        },
        showfilteronn() {
            return this.showfilteronn
        },
        gettotal() {
            this.gettotal === 0 && this.ads ? this.isempty = true : this.isempty = false

        },
      

    },
    methods: {

        checknewAdd(){
              const toast = useToast();
            if (this.NewAd) {
                


                toast.info({
                    component: NewAdtoast,
                    listeners: {
                        refreshAd: this.refreshAd
                    }
                }, {id: "NewAd", timeout: false });
            }else if(this.NewAd == false){
                toast.dismiss("NewAd");
            }
        },


        toggle_index() {
            this.show_search_index = true
            this.show_at_route_change = true
        },
        getinnerwidth() {

            return window.innerWidth
        },

        scrolltohide() {

            if (this.getinnerwidth() <= 768 && window.scrollY >= 100) {
                document.querySelector('#filter').classList.add('u--slideUp', 'hidden')

            }
            else {
                document.querySelector('#filter').classList.remove('hidden')


            }

        },

        scrollfunction() {

            window.addEventListener('scroll', this.scrolltohide, true

            )




        },

        fetchItems() {

            this.$emit('fetchItems');

            this.showModal = false;
            this.show_search_index = false;
            

        },
        searchwithfilter(){
         
            this.fetchItems()

        },


        decline() {
            store.commit('resetParams');
            this.showModal = false;

            // this.$emit('fetchItems');
            this.$store.dispatch('fetchbrowseads','/ads')
            
           

        },

        onClickAway() {

            // this.resetParams;
            this.$store.commit('resetOnlyFilterParams')
            this.showModal = false
            // 
        },
        ...mapState(["allLocations", "allCategories",]),

        setImage,
        searchvalue(value) {

            this.currentvalue = value
            this.loading_index = true
            Api.get(`/ads?search=${value}`).then(
                (res) => {
                   
                    this.loading_index = false
                    this.show_search_index = true
                    const key = 'category_id';
                    this.search_indexes = [...new Map(res.data.data.map(item =>
                        [item[key], item])).values()];

                    this.search_indexes.length == 0 ? this.show_search_index = false : this.show_search_index = true


                }
            ).catch(error => {
                this.show_search_index = false;
                this.loading_index = false
                console.log(error.response.data.error)
            })

        },
        searchitem(category) {
            store.commit('setrouteParams_category', category)
            
            this.show_search_index = false
            this.$emit('fetchItems');
            

        },
        refreshAd() {
            this.$emit('fetchItems');
            
        }
    },

    mounted() {
        if(!this.$store.state.currentSubCategories){
            this.$store.dispatch('loadSubCateogries')
        }

        
        this.scrollfunction()
      
        this.checknewAdd()












    },
    unmounted() {
        window.removeEventListener('scroll', this.scrolltohide, true)

        const toast = useToast();
        toast.dismiss("NewAd");
    }


}
</script>


<style >


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


.fast_anim {
    animation-duration: 0.3s;
}

.Vue-Toastification__toast--info {
    background-color: #fed7aa;
    color: #4b5563;
}

.Vue-Toastification__toast {
    padding: 18px 20px;
    font-family: inherit;
}

.Vue-Toastification__toast > button.Vue-Toastification__close-button {
    color: #4b5563;
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
