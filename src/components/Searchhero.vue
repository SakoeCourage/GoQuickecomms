<template>
    <div class="min-h-full w-full  bg-gray-100 dark:bg-slate-500 flex justify-center items-center relative">
		  <svg class="my-0 z-0 p-0 absolute inset-0  " viewBox="0 0 1428 174" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g stroke="none" stroke-width="1" fill="rgba(161, 98, 7, 1)" fill-rule="evenodd" >
          <g transform="translate(-2.000000, 44.000000)" fill="#FFFFFF" fill-rule="nonzero">
            <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
            <path d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z" opacity="0.100000001"></path>
            <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" id="Path-4" opacity="0.200000003"></path>
          </g>
    
        </g>
      </svg>
	<div class=" bg-yellow-700 dark:bg-slate-700 w-screen ">
		
		<div class="container mx-auto  p-10  px-4 md:px-14 md:p-14 z-20 relative ">
			<form @submit.prevent="handlerformsubmit" method="GET">
				<h1 class="md:text-center hidden md:block font-bold text-white dark:text-gray-300 text-2xl md:text-4xl">Search Available ads</h1>

					<div class="flex items-center bg-gray-50 dark:bg-slate-800  border-gray-200 dark:border-0 border-2 rounded-full overflow-hidden px-2 py-1  flex-no-wrap  ">
						<input autocomplete="off" v-model="search" @focus="toggle_index()" @click="toggle_index()" class=" z-10 text-sm md:text-lg text-gray-600 bg-gray-50  dark:bg-slate-800 dark:text-gray-200  font-semibold flex-grow outline-none px-2 w-4/5 md:text-left " type="search" name='search'  placeholder="Search available ads" id="mini_search" />
						<div class="sm:flex items-center px-2 rounded-lg   ">
					
							<button type="submit" class="bg-orange-400 dark:bg-slate-400  text-white  rounded-full px-4 py-2 font-thin focus:outline-none focus:border-none z-10"><svg class="text-orange-200 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
			
								viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
								width="512px" height="512px">
								<path
								  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
							  </svg>
							
							</button>
						</div>
					
					</div>
				
			</form>
		<SearchIndex click="w-auto"
				:show_search_index="show_search_index"
                 :search_indexes="search_indexes"
                :currentvalue ="search"
                :show_at_route_change ="show_at_route_change"
				 @searchitem="handlerformsubmit"
				

		/>
		
		</div>
	
	</div>
</div>

</template>

<script>
import store from "../store"
import Api from "../apis/Api"
import SearchIndex from "./SearchIndex";


export default {
  components: { SearchIndex },
	data(){
		return{
			search: '',
			search_indexes: '',
       
            show_search_index: false,
            loading_index: false,

            show_at_route_change: false,


		}
	},
	methods:{
		handlerformsubmit(){
			 	this.$store.commit("reloadBrowseAds",true)
				
				this.$router.push({name:'Browseads' })



		},
		  toggle_index() {
            this.show_search_index = true
            this.show_at_route_change = true
        },
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

        }

	},
	watch:{
		search(){
			this.search && this.searchvalue(this.search)
			store.commit('setrouteParams_search',this.search)
		}
	},
	mounted(){
		   let mini_search = document.querySelector('#mini_search')
                    window.addEventListener('click',(e)=>{
                            if(e.target != mini_search  ){
                                // this.$emit('toggleshowsearch')
								this.show_search_index = false
                            }

                    })
	}

}
</script>