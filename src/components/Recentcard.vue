<template>

    <div 
        :style="setBackground(created_at,image_one)"
        class=" aspect-[3/2] bgcover banner cursor-pointer scroll-snap-center block min-w-[50%] h-full mx-1 rounded-lg shadow-md hover:shadow-2xl relative scroll-card"
    >
    <!-- <div class="absolute top-0 right-0 bg-green-400  ring-1  ring-white ring-offset-1 ring-offset-green-400 text-white rounded-md m-2 text-xs md:text-sm p-1">new</div> -->
        <div
            class=" p-2 absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black flex justify-end rounded-b-lg"
            style="padding-top: 5%; padding-bottom: 5%;"
        >
        
            <div class="shadow-2xl bg-gray-200 dark:bg-slate-300 dark:text-slate-900 rounded-xl p-1 md:p-2 flex max-w-full">
                <router-link :to="{name: 'Viewad', params:{slug:slug}}"
                    class="hidden md:inline truncate mx-2 text-center"
                    
                >{{ item_name }}</router-link>
                <h1
                    class="hidden md:inline text-xs md:text-sm text-center rounded-lg bg-orange-100 dark:bg-slate-600 dark:text-slate-100 shadow-lg p-1"
                    style="min-width:20%;"
                >GH₵ {{ new Intl.NumberFormat({ style: 'currency', currency: 'GHS' }).format(price) }}</h1>
                <router-link :to="{name: 'Viewad', params:{slug:slug}}"
                    
                    class="md:hidden truncate text-xs md:text-sm text-center rounded-lg bg-orange-100 dark:bg-slate-600 dark:text-slate-100 shadow-lg p-1"
                >GH₵ {{ price }}</router-link>
            </div>
        </div>
    </div>
   
</template>

<script>
import dayjs from "dayjs"
import  { getmonth }  from "../apis/Getmonth"
export default {
    props: ["price", "item_name", "image_one" ,"created_at" ,"slug"],
    methods: {
        getYear(y){
            return(

                dayjs(y).year()
            )
            

        },
        setBackground(created_at,img) {

            let path = `${process.env.VUE_APP_ADS_PATH}/`
            let year = dayjs(created_at).year()
            let month = getmonth(dayjs(created_at).month())



            return `background-image: url(${path}${year}/${month}/${img})`


        },

        addIntersectionObserver() {
            const card = document.querySelectorAll(".scroll-card")
            const observer = new IntersectionObserver((entries) => {
               
                entries.forEach(entry => {

                    entry.target.classList.toggle('show-scroll-card', entry.isIntersecting)
              

                })


            }

            )


            card.forEach(card => {
                observer.observe(card)
            })

        },

    },
    mounted(){
        this.addIntersectionObserver();
    }
}
</script>

<style>
.add-aspect-3-2{
    aspect-ratio: 3/2;

}

.bgcover {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.scroll-card {
    opacity: 0;

    transform: scale(0.5);

    transition: all 200ms;
}
.show-scroll-card {
    transform: unset;

    opacity: 1;
}

.min-width-50 {
    min-width: 50%;
}
.min-height-140px {
    min-height: 120px;
}
.min-height-max {
    min-height: max-content;
}
</style>