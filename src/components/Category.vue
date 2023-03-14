<template>


              
        <div class=" relative grid place-items-center py-2  rounded-lg shadow-lg overflow-hidden hover:shadow-2xl " :class="'bg-orange-300 dark:bg-slate-500'" @mouseover="ishover=true" @mouseout="ishover=false" >
          
             <svg class="absolute bottom-0 left-0 mb-8 opacity-30 transition-all dark:text-orange-200 " :class="ishover && 'opacity-50 transform translate-y-4 '" viewBox="0 0 375 283" stroke="currentColor" fill="none">
            <rect x="159.52" y="175"  width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="none">
            </rect>
            <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="none">
            </rect>
        </svg>

            <div class="relative grid items-center overflow-hiddenw-full  h-full "  >
        
                <div class="relative  flex z-10 p-2 h-full items-center text-white dark:text-orange-400 text-center justify-center md:px-6 ">
                    <font-awesome-icon :icon="icon" :class="[' h-full absolute md:relative inset-x-0  ml-0  opacity-50 transition-al ', 'text-orange-400 dark:text-orange-200', ishover && 'opacity-100 text-white dark:text-slate-300']" size="4x"  />
                    <div class=" z-10 w-full flex flex-col items-center">
                        <span class="  md:text-lg lg:text-xl text-center dark:bg-orange-400/70 dark:rounded-full dark:px-2 dark:text-slate-100">
                          {{category_name}}
                        </span>
                     <button @click="category_route(dbname)" class="flex items-center justify-center   p-2 mt-1 md:w-max ring-1 ring-yellow-100 text-sm dark:bg-slate-500/50 dark:backdrop-blur-[2px]  dark:text-slate-100 font-medium rounded transform hover:scale-105 transition-all focus:outline-none mb-2 " :class="setText(accent,50)">
                        <span class="   " >View All</span>
                        <svg class="h-5 w-5 " fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                    </div>
                </div>
            </div>
        
            
        
        </div>
    
       

</template>

<script>

import store from '../store'
export default{
    props: {category_name: String, category_id: Number,icon: String, accent: String, dbname: String},
    data(){
        return{
            ishover: false,

        }
    },

    methods:{
        setBackground(a){
            return `bg-${a}-300`
        },
         setText(a,i){
            return `text-${a}-${i}`
        },
        category_route(r){
                store.commit("reloadBrowseAds",true)
                store.commit("setrouteParams_category",r)
                
                this.$router.push({name:"Browseads"})
        }
    }


}

</script>