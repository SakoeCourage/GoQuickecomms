<template>
    <div class="flex w-full justify-evenly text-xs md:text-sm" >

        <nav>
            <h1 class="inline dark:text-white">goto:</h1> <form class="inline" @submit.prevent="goto()"><input min="1" :max="last_page" v-model="goto_value" type="number" placeholder="no" class=" w-8 text-center focus:outline-none rounded-md "></form>
        </nav>

        <nav class=" self-center  w-max ">  <button class=" text-gray-800  px-2 dark:text-white dark:bg-gray-600 dark:hover:text-white dark:border-0 focus:outline-none border-gray-50 bg-gray-100 rounded-lg border-2 hover:text-gray-700 " v-if="prev_page_url" @click="$emit('fetch-Items', prev_page_url)"><h1 > &laquo; previous</h1></button>
        
        <button class="dark:text-white dark:bg-gray-600 dark:hover:text-white dark:border-0  px-2 text-gray-800  focus:outline-none border-gray-50  border-2 ml-2 bg-gray-100 rounded-lg hover:text-gray-700" v-if="next_page_url" @click="$emit('fetch-Items', next_page_url)"><h1 >next &raquo; </h1> </button>
        </nav>
        <nav class=" dark:text-white">
            page {{current_page}}/{{ last_page }}
        </nav>
       
    </div>
</template>

<script>
export default {
    props: ["prev_page_url", "last_page", "path", "current_page", "next_page_url" ,"first_page_url","last_page_url","links"],
    data(){
        return{
            pass_begining: false,
            reached_end: false,
            paginatable_links: '',
            goto_value: null
        }
    },
    methods: {
      
        goto() {
            if(this.goto_value > 0 && this.goto_value <= this.last_page ){
               this.$emit('fetch-Items', this.links[Number(this.goto_value)].url) 
           
            }
        }


    },
    watch: {
        current_page() {
           
           
        }


    },
    mounted() {
   
       
      
     
        

    }



}



</script>

<style scoped>



</style>