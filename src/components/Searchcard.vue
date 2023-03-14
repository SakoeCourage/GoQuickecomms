<template>
    <div class="w-full h-max gap-5 overflow-hidden shadow-xl rounded-md relative hover:shadow-2xl  searchcard  " @mouseover="hover=true" @mouseout="hover=false">
                 <button v-if="$route.name == 'Userprofile' && author && item_name"  @click="$emit('delete-item', item_id)"  id="delete_button" class="z-30 absolute bg-white p-1 px-2 rounded-full top-2 right-2 hidden text-red-400 u--zoomIn animate_fast">
                        <font-awesome-icon icon="trash-can" class=""/>
                    </button>  
                    <Backdrop v-if="$route.name == 'Userprofile' && deleting_id == item_id" class="absolute inset-0 z-30 bg-black opacity-30">
                        <Loadingspinnernew/>    
                    </Backdrop>    
        <div class="w-full flex flex-col bg-gray-50  rounded-md dark:bg-gray-700 dark:backdrop-filter dark:backdrop-blur-lg  ">
            <div class="w-full grid grid-cols-2 h-8/12 p-1 relative gap-1 overflow-hidden">
                    
                 
                <slot class="min-h-full w-full">
                 <div v-if="!item_name"
                    class="w-full h-full min-h-full aspect-square bg-gray-200/80 dark:bg-[#6b7280] "
                    id="imgtag"
                  
                />
                <div v-if="!item_name"
                    class="w-full min-h-full h-full aspect-square bg-gray-200/80 dark:bg-[#6b7280]"
                   
                />


                </slot>
                    
                <div
                    v-if="restofimage"
                    class="w-1/2 h-1/3 opacity-75 text-center text-white absolute bottom-0 right-0 flex flex-row items-end justify-center rounded-t-lg bg-gradient-to-b from-transparent to-black"
                >
                    <router-link v-if="slug"
                        :to="{ name: 'Viewad', params: { slug: slug } }"
                        class="bg-gray-500 text-white text-sm mb-6 rounded-lg px-2 py-1 font-thin"
                    >view all</router-link>
                </div>
            </div>
            <div class="w-full h-4/12 border-white dark:border-gray-700 border-4 border-t-0 shadow-md flex flex-col p-2">
                <div class="flex items-center justify-between">
                    <router-link v-if="item_name"
                        :to="{ name: 'Viewad', params: { slug: slug } }"
                        class="text-sm  text-center w-full truncate text-gray-500 dark:text-slate-200"
                    >
                    {{ item_name }}  
                    </router-link>
                    <nav v-if="!item_name"
                        
                        class="text-sm  text-center w-full h-full truncate bg-gray-200/80 dark:bg-[#6b7280]/50 rounded-md animate-pulse"
                    >
                        &nbsp;
                    </nav>
                    <h1 v-if="price"
                        class=" py-1 text-xs md:text-sm flex flex-row justify-center items-center text-yellow-900 dark:text-orange-200 rounded-lg  px-2 w-2/5"
                    ><span class="text-xs md:text-inherit w-max">GH₵</span> &nbsp; <span class=" text-lg  md:text-lg">{{new Intl.NumberFormat({ style: 'currency', currency: 'GHS' }).format(price) }}</span></h1>
                       <nav v-if="!price"
                        
                        class="text-sm mx-2  text-center w-2/5 h-full truncate bg-gray-200/80 dark:bg-[#6b7280]/50 rounded-md animate-pulse"
                    >
                        &nbsp;
                    </nav>
                </div>
                <div class="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-y-2 py-2 ">
                    <span v-if="this.$route.name !='Userprofile'"
                        class="py-1 truncate text-xs  flex flex-row justify-center items-center text-center text-yellow-600 mx-2 rounded-full bg-gray-200/80 dark:bg-gray-600"
                    >
                        <font-awesome-icon v-if="location" icon="map-marker-alt" class="inline mx-2 text-gray-400 dark:text-gray-100" />
                        <h4 v-if="location" class="text-gray-500 dark:text-gray-100">{{ location  }}</h4>
                    <nav v-if="!location"
                        
                        class="text-sm  text-center w-full h-full truncate   animate-pulse"
                    >
                        &nbsp;
                    </nav>
                    </span>
                    <span v-if="this.$route.name !='Userprofile'"
                        class=" py-1 truncate text-xs  flex flex-row justify-center items-center text-center text-yellow-600 rounded-full bg-gray-200/80 0 dark:bg-gray-600"
                    >
                        <font-awesome-icon v-if="created_at" icon="clock" class="inline mx-2 text-gray-400 dark:text-gray-100" />
                        <h4 v-if="created_at" class="text-gray-500 dark:text-gray-100"> {{ diffForHumans(created_at) }}</h4>
                    <nav v-if="!created_at"
                        
                        class="text-sm  text-center w-full h-[full] truncate   animate-pulse"
                    >
                        &nbsp;
                    </nav>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {diffForHumans} from '../apis/Util'
import {mapState} from "vuex"
import Loadingspinnernew from './Loadingspinnernew'
import Backdrop from './Backdrop'

export default {
    props: ['item_name', 'price', 'created_at', 'location', 'restofimage', 'slug','item_id','user_id','deleting_id'],
    components:{Loadingspinnernew,Backdrop},
    data() {
        return {
            isFlyOpened: false,
            hover:false,
            author: false
        }
    },
    methods: {
        diffForHumans,
        checkauthor(){
              if(this.auth){
            const {user, businessprofile} = this.auth
            user.id === this.user_id && (this.author=true)
           


        }else{
           this.author = false
        }
     
        }
     

    },
    computed:{
        ...mapState(['auth'])

    },
   
    mounted() {
        const card = document.querySelectorAll(".searchcard")
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('show', entry.isIntersecting)
                if (entry.isIntersecting) observer.unobserve(entry.target)

            })


        },{
            
            rootMargin: '20px',
            
        }

        )


        card.forEach(card => {
            observer.observe(card)
        })
        this.checkauthor()
      
     
    }
    
    

}


</script>

<style scoped>

.searchcard:hover button#delete_button{
    display: block;
}
.searchcard:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}


.animate_fast{
    animation-duration: 0.2s;
}
.searchcard {
  
    transition: 500ms;
    opacity: 0.4;
}

.searchcard.show {
   

    opacity: 1;
}


</style>