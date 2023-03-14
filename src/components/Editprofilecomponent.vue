<template>
    <div class="grid gap-8 grid-cols-1">
					<div class="flex flex-col ">
						<div class="mt-5">
							<form @submit.prevent="processform()" class="form">
								<div class="mb-4">
									<h1 class="font-semibold text-gray-600 py-2 text-xs dark:text-gray-300">Select profile Image</h1>
									 <div
                                        v-if="errors.profile_image"
                                        ref="error"
                                        class="p-4 mb-4 text-xs md:text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
                                        role="alert"
                                    >
									 <p
                                            v-if="errors.profile_image"
                                            class="flex items-center"
                                            ref="error"
                                        >
                                            <svg
                                                class="inline flex-shrink-0 mr-3 w-5 h-4 md:h-5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                            {{  errors.profile_image[0]  }}
                                        </p>
									</div>
									
									<Imageframe name="profile_image" :source="current_image ?? '' " @profile_image="set_profile_image"  />

									
								</div>

								<div class="md:flex flex-row md:space-x-4 w-full text-xs">
									<div class="mb-3 space-y-2 w-full text-xs">
										<label class="font-semibold text-gray-600 dark:text-gray-300 py-2">
											Business Name
											<abbr title="required" class="text-red-500">*</abbr>
										</label>
										<input
											placeholder="business Name"
											v-model="business_name"
											class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-lighter rounded-lg h-10 px-4 focus:outline-none focus:shadow-outline-orange ring-yellow-500 focus:ring-1"
											type="text"
										/>

										<p v-if="errors.business_name" ref="error" class="text-red-500 text-xs">{{ errors.business_name[0] }}</p>
									</div>
									<div class="mb-3 space-y-2 w-full text-xs">
										<label class="font-semibold text-gray-600 py-2 dark:text-gray-300">business email</label>
										<input
											placeholder="business email"
											v-model="business_email"
											class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 ring-yellow-500 focus:ring-1 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none focus:shadow-outline-orange"
											type="text"
										/>

										<p v-if="errors.business_email" ref="error" class="text-red-500 text-xs">{{ errors.business_email[0] }}</p>
									</div>
								</div>
								<div class="mb-3 space-y-2 w-full text-xs ">
									<label class="font-semibold text-gray-600 dark:text-gray-300 py-2">Business address</label>
									<div class="block w-full mb-4 relative">
										<input
											type="text"
											v-model="business_address"
											class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 ring-yellow-500 focus:ring-1 w-full leading-normal border h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:outline-none focus:shadow-outline-orange"
											placeholder="business address.."
										/>

										<p ref="error"
											v-if="errors.business_address"
											class="text-red-500 text-xs"
										>{{ errors.business_address[0] }}</p>
									</div>
								</div>
								<div class="md:flex md:flex-row md:space-x-4 w-full text-xs">
									<div class="w-full flex flex-col mb-3">
										<label class="font-semibold dark:text-gray-300 text-gray-600 py-2">
											Contact number
											<abbr title="required" class="text-red-500">*</abbr>
										</label>

										<div class="flex items-center">
											<nav class="pr-2">+233</nav>
											<input
												placeholder="(000) 000-0000"
												v-model="contact_number"
												class="ring-yellow-500 dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 focus:ring-1 block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none focus:shadow-outline-orange"
												type="tel"
											/>
										</div>

										<p v-if="errors.contact_number" ref="error" class="text-red-500 text-xs">{{ errors.contact_number[0] }}</p>
									</div>

									<div class="w-full flex flex-col mb-3">
										<label class="font-semibold text-gray-600 py-2 dark:text-gray-300">
											Location
											<abbr title="required" class="text-red-500">*</abbr>
										</label>
										<select
											v-if="allLocations"
											v-model="location"
											class="ring-yellow-500 dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 focus:ring-1 block w-full bg-grey-lighter text-gray-500 border border-grey-lighter rounded-lg h-10 px-4 md:w-full focus:outline-none focus:shadow-outline-orange"
										>
											<option value disabled>select location</option>
											<option v-for="(location, i) in allLocations " :key="i" v-text="location" :value="i + 2"></option>
										</select>

										<p v-if="errors.location" ref="error" class="text-red-500 text-xs">{{ errors.location[0] }}</p>
									</div>

									<div class="w-full flex flex-col mb-3">
										<label class="font-semibold text-gray-600 dark:text-gray-300 py-2">
											Category of business
											<abbr title="required" class="text-red-500">*</abbr>
										</label>
										<select
											v-if="allCategories"
											v-model="category"
											class="ring-yellow-500 dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 focus:ring-1 block w-full text-gray-500 text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full focus:outline-none focus:shadow-outline-orange"
										>
											<option value disabled>Select category</option>

											<option v-for="(category, i) in allCategories " :key="i" v-text="category" :value="i + 2"></option>
										</select>

										<p v-if="errors.category" ref="error" class="text-red-500 text-xs">{{ errors.category[0] }}</p>
									</div>
								</div>

								<div class="flex-auto w-full mb-1 text-xs space-y-2">
									<label class="font-semibold dark:text-gray-300 text-gray-600 py-2">State Others if chossen</label>
									<textarea
										v-model="others"
										id
										class="ring-yellow-500 dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 focus:ring-1 min-h-[100px] max-h-[300px] h-20 appearance-none block w-full bg-gray-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4 focus:outline-none focus:shadow-outline-orange"
										placeholder="State other cateogory"
										spellcheck="false"
									></textarea>

									<p v-if="errors.others" ref="error" class="text-red-500 text-xs">state others</p>
								</div>

								<!-- </div> -->
								<p class="text-xs text-red-500 text-right my-3">
									Required fields are marked with an
									asterisk
									<abbr title="Required field">*</abbr>
								</p>
								<div class="mt-5 text-right md:space-x-3 md:block flex flex-col">
									<button
										type="submit"
										class="ring-yellow-500 focus:ring-1 items-center justify-center mb-2 md:mb-0 bg-orange-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-orange-500 focus:outline-none focus:shadow-outline-orange"
									>
										<h1 v-if="!isLoading">Save</h1>
										<svg
											v-if="isLoading"
											class="animate-spin  h-5 w-5 text-white mx-auto"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												class="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												stroke-width="4"
											/>
											<path
												class="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											/>
										</svg>
									</button>
									
								</div>
							</form>
						</div>
					</div>
				</div>
</template>


<script>
import Imageframe from './Imageframe'
import { mapState, mapActions } from "vuex"
import Api from '../apis/Api'
import store from '../store'
import { scroller } from 'vue-scrollto/src/scrollTo';
import { useToast } from "vue-toastification";

export default {
	components: { Imageframe },


	data() {
		return {
			business_name: '',
			business_email: '',
			business_address: '',
			contact_number: '',
			location: '',
			category: '',
			profile_image: '',
			others: '',
			errors: {},
			isLoading: false,
			current_image:'',
			checkprofile_image: ''


		}
	},

	computed: {

		...mapState(["allLocations", "allCategories","auth"]),
		...mapActions(['fetchUser']),
	},


	methods: {
		...mapActions(["getLocations", "getCategories"]),
		set_profile_image(file) {
			this.profile_image = file;
			this.checkprofile_image = file
		
		},
		 processform() {
		
			this.isLoading = true
			this.errors = {}
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			}

			let data = new FormData();
			data.append('profile_image', this.profile_image)
			data.append('business_name', this.business_name)
			data.append('business_email', this.business_email)
			data.append('business_address', this.business_address)
			data.append('contact_number', this.contact_number)
			data.append('location', this.location)
			data.append('category', this.category)
			data.append('others', this.others)
			data.append('checkprofile_image', this.checkprofile_image)
			data.append("_method", "PUT");
			
			

			Api.post('/businessprofile', data, config).then((response) => {
				 useToast().success('profile updated',{timeout:1600})

				this.isLoading = false

				this.fetchUser
				console.log(response.data)

				
				// this.$router.push({ name: 'Postad' })
			


			}).catch(error => {
				this.isLoading = false
				console.log(error.response.data)


				this.errors = error.response.data.errors
				
                    this.$nextTick(() => {
                        
                        const firstScrollTo = scroller()
                        var options = {
                            easing: 'ease-in',
                            lazy: false,
                            offset: -100,
                            force: true,
                            cancelable: true,
                            
                            x: false,
                            y: true
                        }



                        firstScrollTo(this.$refs.error,200,options)
                        this.$refs.error.classList.add('u--flash')


                    })
				
				
			
				

			})

		},
		checkbusinessprofile(){
			const { businessprofile, user } = this.auth
					if(businessprofile){
					
						this.current_image = businessprofile.profile_image ? process.env.VUE_APP_PROFILE_IMAGE+"/"+businessprofile.profile_image : null
						this.profile_image = businessprofile.profile_image
						this.checkprofile_image= businessprofile.profile_image
					
						
						this.business_name = businessprofile.business_name
						this.business_email = businessprofile.email
						this.business_address = businessprofile.address
						this.contact_number = businessprofile.contact_number
						this.location = businessprofile.location_id
						this.category = businessprofile.category_id
						businessprofile.category_id === 13 && (this.others = businessprofile.others)
						
						
		}

		}
	



	},
	watch: {
		auth(){
			this.auth && this.checkbusinessprofile()
			
			
		}


	},


	
	mounted() {
		this.checkbusinessprofile()
		this.getLocations()
		this.getCategories()
	

	}


}



</script>
