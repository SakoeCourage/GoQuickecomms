<template>
   <div>
               
        <Searchhero />
        <div class=" mx-auto w-full px-4 flex justify-end items-center dark:bg-slate-300 ">
                <router-link :to="{name:'Browseads'}" class=" rounded-full flex items-center   bg-orange-100 text-orange-500 dark:bg-orange-300 dark:text-white    w-max px-2 my-1 text-xs md:text-lg  " v-if="$store.state.Homepage_items"> 
                      <nav class="inline mr-1"> featured ads</nav> 
  </router-link>
        </div>
    <section class="w-full relative mt-0 pb-2" style=" min-height: 2rem; ">
             
        <Horizontalscroll :items="$store.state.Homepage_items.Ad" class="rounded-none  z-10" />
       
        <div
            class="absolute w-full inset-0 bg-gradient-to-b from-yellow-700 dark:from-slate-700 dark:via-slate-500 dark:to-gray-800 via-gray-300 to-gray-200"
            style=" clip-path: url(#wave2);"
        ></div>
    </section>

    <section class="mt-4 container mx-auto">
      
           <button class="bg-white dark:bg-gray-700   text-sm font-bold  px-4 xl:px-4 py-1 xl:py-2 rounded-t flex-shrink-0 flex items-center">
      <svg class="h-6 text-oranage-300  p-1" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z" class=""></path></svg>
      <span class="ml-4 text-gray-500 dark:text-gray-200">Browse by category</span>
    </button>
        <div class=" relative ">
             <button  v-if="scrolledleft" @mouseover="ishover=true" @mouseout="ishover=false"  @click="scrolltoLeft" class="absolute left-0  continue z-20 font-extrabold  hover:bg-gray-200 bg-transparent py-2 px-4 rounded-full shadow-md" :class="  ishover?'':'u--slideRight'  " style=" top:40%" > <font-awesome-icon icon="chevron-left" class="" /> </button> 
             <button v-if="scrolledright" v-show="$store.state.Homepage_items.Category"  @mouseover="ishover=true" @mouseout="ishover=false" @click="scrolltoRight"  class="absolute right-0  continue z-20 font-extrabold  hover:bg-gray-200 bg-transparent py-2 px-4 rounded-full shadow-md" :class="  ishover?'':'u--slideLeft'  " style=" top:40%" > <font-awesome-icon icon="chevron-right" class="" /> </button> 
        <div
            class="bg-white dark:bg-gray-700 w-full p-2 flex hidescroll gap-4 overflow-x-scroll overflow-y-hidden relative " id="categories_container"
             @scroll="getscrolledamount()"
        >   
          
            
            <div class=" min-w-full  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4" v-if="$store.state.Homepage_items.Category">
             <Category dbname="Fashion(men and women)" category_name="Fashion" icon="tshirt" accent='orange' />
            <Category dbname="Automobile" category_name="Automobile" icon="bus-alt"  accent='orange' />
            <Category dbname="Gadgets/computers" category_name="Gadgets & computers" icon="mobile-alt" accent='orange'/>
            <Category dbname="Beauty" category_name="Beauty" icon="grin-hearts" accent='orange' />
            <Category dbname="self care/medicine" category_name="Self care/medicine" icon="prescription-bottle-alt" accent='orange'/>
            <Category dbname="animals/pets" category_name="animals/pets" icon="dog" accent='orange'/></div>
            <div class=" min-w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4" v-if="$store.state.Homepage_items.Category" >
             <Category dbname="sports" category_name="Sports" icon="running" accent='orange'/>
            <Category dbname="Agriculture" category_name="Agriculture" icon="seedling" accent='orange'/>
            <Category dbname="softwares/games" category_name="Software/Games" icon="gamepad" accent='orange'/>
            <Category dbname="education/books" category_name="education/books" icon="book" accent='orange'/>
            <Category dbname="Services" category_name="services" icon="hands-helping" accent='orange'/>
            <Category dbname="others" category_name="Others" icon="tags" accent='orange'/>

            </div>
            <div class=" min-w-full  grid place-items-center" v-if="!$store.state.Homepage_items.Category">
                         <svg  class="animate-spin mx-2 h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
            </div>
          
            
 
        </div>
        </div>
    </section>
   </div>
</template>
<script>
import Searchhero from "../components/Searchhero"
import Horizontalscroll from "../components/Horizontalscroll"
import Category from "../components/Category"
import Skeletonloading from "../components/Skeletonloading.vue"
import {mapState} from "vuex"

import Api from "../apis/Api"

export default {
    components: { Searchhero, Horizontalscroll, Category, Skeletonloading },
    data() {
        return {
            
       
            ishover: false,
            scrolledleft: false,
            scrolledright: true,
        }
    },
    computed:{
        ...mapState(['NewAd'])


    },
    watch:{
        NewAd(){
            if(this.NewAd){
                this.fetchItmes()
            }
        }
    },
    
    methods: {
        fetchItmes() {

            Api.get('/').then((response) => {



               
                this.$store.commit('setHomepageitems',response.data)
               
                
            



            }).catch((error) => {
                console.log(error)

            })

        },
         container() {
            return document.querySelector('#categories_container')
        },
            getviewPortWidth() {
        
            return this.container().scrollWidth;

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
    },
    async mounted() {
        this.fetchItmes();
     


    }


}
</script>

