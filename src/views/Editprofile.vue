<template>
	<Transition appear name="slide">
		<div>
			<div class="lg:container sm:mx-auto sm:mt-5 grid place-items-center relative bounce ">
			<div
				class="border-blue border-2 w-full p-5 pt-16 md:p-10 md:pt-24 bg-white dark:bg-gray-900/50 dark:border-0 dark:ring-2 dark:ring-slate-400/50  min-h-screen md:rounded-xl shadow-lg  relative"
			>
					<div v-if="!this.$store.state.auth" class="absolute inset-0 z-40 bg-gray-200 opacity-40">


					</div>
				<div
					class="px-4 z-40 md:px-8 flex  items-center bg-orange-300 dark:bg-gray-700 absolute top-0.5 inset-x-0.5 md:rounded-t-xl h-16 md:h-24"
				>
					<h2 class="cursor-pointer md:text-md mr-5 text-sm  border-[1px] border-gray-100 p-1 px-2 rounded-full text-gray-700 dark:text-gray-300 dark:bg-gray-500 dark:border-0 transform transition-all ease-in-out flex items-center" :class="current=='Editprofilecomponent' && 'bg-gray-100 text-gray-600 shadow-lg  scale-110 '"   @click="current='Editprofilecomponent'"><font-awesome-icon icon="user" class="mx-1 mr-2"/>  Profile info</h2>
					<h2 class="cursor-pointer md:text-md mr-auto text-sm border-[1px] border-gray-100 rounded-full p-1 px-2 text-gray-700 dark:text-gray-300 dark:bg-gray-500 dark:border-0 transform transition-all ease-in-out flex items-center"  :class="current=='Edituserdetails' && 'bg-gray-100 text-gray-600 shadow-lg  scale-110 '" @click="current='Edituserdetails'"  > <font-awesome-icon icon="arrow-right-to-bracket" class="mx-1 mr-2" />  Login info</h2>
					
				</div>

					 <KeepAlive>
      				<component :is="current"></component>
    				</KeepAlive>
				

			</div>
		</div>
		</div>
	</Transition>
</template>


<script>

import Editprofilecomponent from "../components/Editprofilecomponent"
import Edituserdetails from "../components/Edituserdetails"


export default {

		components:{Editprofilecomponent , Edituserdetails},

		data(){
			return{
				current: 'Editprofilecomponent'

			}
		}
}
</script>


<style scoped>
.slide-enter-active {
	animation: slide 0.4s;
}

.slide-leave-active {
	animation: slide 0.4s reverse;
}
@keyframes slide {
	0% {
		transform: translate3d(0, 100%, 0);
	}
	100% {
		transform: none;
	}
}


</style>