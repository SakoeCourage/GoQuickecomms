<template>
  
        <div
            class="w-full pb-2 bg-gray-50 dark:bg-gray-700 text-xs sm:text-sm md:text-sm relative overflow-hidden overflow-y-auto"
            style=" height: 50vh; "
             @scroll="checkend()" ref="top_modal"
        >
            <div v-if="isLoading" class="sticky top-0 w-full bg-transparent">
                <div class="absolute rounded-md top-0 transform bg-orange-400 h-1 w-1/2 z-50 move"></div>
            </div>

            <div class=" grid place-content-center w-full h-full" v-if="emptynotification" > <button>no notification</button></div>

             <TransitionGroup name="list" tag="ul" class="p-2" :class="isLoading && 'pb-20'">
              
                <li
                    v-for="notification in notificationsdata"
                    :key="notification.id"
                    class="bg-gray-100 dark:bg-gray-600 my-1 py-1 px-2 shadow-sm hover:bg-oranage-100 dark:hover:bg-gray-600 notification_card"
                    :class="notification.read_at == null && 'bg-gray-200 dark:bg-gray-500'"
                >
                    <router-link
                        @click="$emit('toggle-notification')"
                        :to="'/ads/' + notification.data.ad.slug"
                        class="w-full h-full"
                    >
                        <nav
                            class="flex items-center w-full"
                            v-if="notification.type == 'App\\Notifications\\Adliked'"
                        >
                            <span class="inline mr-2 ml-1 rounded-full bg-orange-50 p-1">
                                <svg
                                    class="shinable w-5 h-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    id="Layer_1"
                                    data-name="Layer 1"
                                    viewBox="0 0 512 512"
                                >
                                    <path
                                        class="cls-1"
                                        d="M505.68,207,386.23,326.48,426,485.4a21.38,21.38,0,0,1-8.64,22.82A21.68,21.68,0,0,1,405.32,512,21.06,21.06,0,0,1,392.95,508L256,410.21,119.05,508a21.16,21.16,0,0,1-24.42.21A21.38,21.38,0,0,1,86,485.4l39.78-158.92L6.32,207a21.18,21.18,0,0,1-4.69-23.25,21.43,21.43,0,0,1,19.73-13.12H177.18L236.06,13.87a21.28,21.28,0,0,1,39.89,0l58.87,156.79H490.64a21.43,21.43,0,0,1,19.73,13.12A21.18,21.18,0,0,1,505.68,207Z"
                                    />
                                    <g class="cls-2">
                                        <path
                                            d="M505.68,207,386.23,326.48,426,485.4a21.38,21.38,0,0,1-8.64,22.82A21.68,21.68,0,0,1,405.32,512,21.06,21.06,0,0,1,392.95,508L256,410.21V0a21.33,21.33,0,0,1,19.94,13.87l58.87,156.79H490.64a21.43,21.43,0,0,1,19.73,13.12A21.18,21.18,0,0,1,505.68,207Z"
                                        />
                                    </g>
                                </svg>
                            </span>
                            <span class="w-full truncate">
                                <nav class="inline font-semibold dark:text-gray-300">{{ notification.data.user }}</nav>
                                <span class="mx-1 dark:text-gray-300">stared your ad</span>
                                <nav
                                    class=" text-blue-500 dark:text-blue-300 font-semibold w-full truncate"
                                >{{ notification.data.ad.item_name }}</nav>
                                <div class="text-xs text-right flex items-center justify-end">
                                    <nav
                                        v-if="notification.read_at == null"
                                        class="text-xs text-center w-2 h-2 bg-green-400 rounded-full mr-1"
                                    ></nav>
                                    <span class="dark:text-gray-300">{{ diffForHumans(notification.created_at) }}</span>
                                </div>
                            </span>
                        </nav>
                    </router-link>
                    
                </li>
                
                
            </TransitionGroup>
      

            
        </div>
        
</template>

<script>
import Api from '../apis/Api'
import { diffForHumans } from '../apis/Util'
import { scroller } from 'vue-scrollto/src/scrollTo';
export default {

    data() {
        return {

            nextpage: '',
            isLoading: true,
            notificationsdata: '',
            loadmore: false,
            emptynotification: false
           

        }
    },
    methods: {
        fetch_notifications(url) {
            this.isLoading = true;
            Api.get(url).then(res => {

               
                this.emptynotification = res.data.notifications.data.length == 0 
                this.nextpage = res.data.notifications.next_page_url
                this.notificationsdata = [...this.notificationsdata, ...res.data.notifications.data]
                 this.isLoading = false;
                 this.$nextTick(()=>this.checkend())
               


            })
                .catch(err => {
                    this.isLoading = false;
                    console.log(err.response.data)
                })

        },
        diffForHumans,
        checkend(){
            
            let element = this.$refs.top_modal
            let scroll_Height = element.scrollHeight
            let scrolled = element.scrollTop + element.getBoundingClientRect().height
             this.loadmore = scroll_Height - scrolled <= 7 ? true :false; 

           
        }
      

    },
    watch: {
        loadmore(){
            if(this.loadmore && this.nextpage){
                this.fetch_notifications(this.nextpage)
            }

        }
     


    },



    mounted() {

       this.fetch_notifications('/user/notification')
   
          

    }
}



</script>

<style scoped >
.cls-1 {
    fill: #ffd38d;
}
.cls-1-1 {
    fill: #71717a;
}
.cls-2 {
    opacity: 0.1;
}


.durations505 {
    animation-duration: 3s;
}




.list-enter-active,
.list-leave-active {
  transition: all 0.7s ease;
}
.list-enter-from{
   opacity: .1;
  background-color: #ffedd5;

}


</style>