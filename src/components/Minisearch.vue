<template>
    <form @submit.prevent="handlesubmit"  class=" rounded-full  relative border-2 border-gray-300 dark:border-0 text-gray-600   flex items-center   ">
    <input v-model="search"  @click="togglefilteron()" @focus="togglefilteron()"   class="rounded-full shadow-xl bg-gray-50 dark:bg-gray-700 dark:text-slate-100 h-full w-full px-5 pr-16 text-sm focus:outline-none focus:shadow-outline-orange focus:border-orange-300"
      type="search" name="search" autocomplete="off" placeholder="Search" id="mini_search" >
    <button  class="absolute right-0 top-0 px-2 mr-4  h-full grid place-items-center focus:outline-none ">
      <svg class="text-orange-200 dark:text-orange-400 h-4 w-4 fill-current hover:text-orange-400" xmlns="http://www.w3.org/2000/svg"
        
        viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
        width="512px" height="512px">
        <path
          d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
      </svg>
    </button>
    </form>

</template>

<script>
  import {mapState} from 'vuex'
  import store from "../store"
export default {
  data(){
    return{
    search:''
   
   
   }

  },
  methods:{
    handlesubmit(){
        store.commit('setrouteParams_search',this.search)
        this.$emit('fetchItems')
    },
    togglefilteron(){
       this.$emit('search-focus')
      document.querySelector('#filter').classList.remove('hidden')
    }
  },
  computed:{
    ...mapState(['routeparams'])

  },
  watch:{

    search(){
      
      this.$emit('search-value',this.search)
      store.commit('setrouteParams_search', this.search)


    },
    routeparams(){
      
        console.log('new search item')
    
    }
  },
  mounted(){
      this.search = this.routeparams.search ?? ''

      
                    let mini_search = document.querySelector('#mini_search')
                    window.addEventListener('click',(e)=>{
                            if(e.target != mini_search  ){
                                this.$emit('toggleshowsearch')
                            }

                    })
    
  }   
}
</script>