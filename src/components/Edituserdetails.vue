<template>
    <div class="  min-h-screen text-sm  ">
            <div class=" h-full w-full mt-8">

                <form @submit.prevent="void(0)" action="" class=" text-xs md:text-sm overflow-x-hidden overflow-y-visible  p-5 pb-20 w-full rounded-md md:w-1/2 mx-auto addshadow relative ">
                        <div v-if="loading_data" class="absolute top-0 w-full bg-transparent">
                <div class="absolute rounded-md top-0 transform bg-orange-400 h-1 w-1/2 z-50 move"></div>
            </div>
                        <span class=" justify-between mt-5">
                            
                        <label for="username" class="mr-2 mb-1 dark:text-gray-300 inline-block font-semibold text-gray-600">username</label>
                        <input type="text" v-model="username" name="username" class="ring-yellow-500 dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 focus:ring-1 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none focus:shadow-outline-orange" id="">

                            <nav
                            v-if="errors.name"
                            class="text-xs text-red-300 mt-2"
                        >{{ errors.name[0] }}</nav>

                        </span>
                        
                        <span class=" justify-between block mt-4 ">
                            
                        <label for="email " class="dark:text-gray-300 mr-2 mb-1 inline-block font-semibold text-gray-600 ">email</label>
                        
                        <input type="text" v-model="email" name="email" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 ring-yellow-500 focus:ring-1 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none focus:shadow-outline-orange" id="">

                            <nav
                            v-if="errors.email"
                            class="text-xs text-red-300 mt-2"
                        >{{ errors.email[0] }}</nav>

                        </span>

                        <span class=" justify-between block mt-4">
                            
                        <label for="password_old" class="dark:text-gray-300 mr-2 mb-1 inline-block font-semibold text-gray-600">current password</label>
                        <button @click="toggle_change_password=!toggle_change_password" class=" float-right text-xs p-1 px-2 bg-orange-50 text-orange-400 rounded-full"> change password <font-awesome-icon icon="lock" /></button>

                        
                        <input type="password" name="password_old" v-model="current_password" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 ring-yellow-500 focus:ring-1 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none focus:shadow-outline-orange" id="">
                            <nav
                            v-if="errors.current_password"
                            class="text-xs text-red-300 mt-2"
                        >{{ errors.current_password[0] }}</nav>

                        </span>
                       <div :class="['h-0 overflow-hidden transition-[height] duration-500 ease-in-out',toggle_change_password && 'h-auto']">
                            <span class=" justify-between block mt-4">
                            
                        <label for="password" class="dark:text-gray-300 mr-2 mb-1 inline-block font-semibold text-gray-600">new password</label>
                        
                        <input type="password" v-model="password" name="password" class="dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 ring-yellow-500 focus:ring-1 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none focus:shadow-outline-orange" id="">
                            <nav
                            v-if="errors.password"
                            class="text-xs text-red-300 mt-2"
                        >{{ errors.password[0] }}</nav>

                        </span>

                        <span class=" justify-between block mt-4">
                            
                        <label for="password_confirm" class="mr-2 mb-1 inline-block font-semibold text-gray-600 dark:text-gray-300">confirm new password</label>
                        
                        <input type="password" v-model="password_confirmation" name="password_confirm" class="ring-yellow-500 focus:ring-1 dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 focus:outline-none focus:shadow-outline-orange" id="">

                           

                        </span>
                       </div>
                        <span @click="confirm=true"
                        class="mt-4 block absolute bottom-4  right-2 text-center cursor-pointer transition-[absolute] ease-linear ring-yellow-500  focus:ring-1 items-center justify-center mb-2 md:mb-0 bg-yellow-100 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-orange-600 rounded-full hover:shadow-lg  focus:outline-none focus:shadow-outline-orange" 
                        
                         >
                        Save</span>

                        <span @click="confirm_account_delete=true"
                        class="mt-4 block absolute bottom-4  text-center cursor-pointer transition-[absolute] ease-linear ring-yellow-500  focus:ring-1 items-center justify-center mb-2 md:mb-0  px-5 py-2 text-xs shadow-sm font-medium tracking-wider text-orange-600 rounded-full hover:shadow-lg  focus:outline-none focus:shadow-outline-orange" 
                        
                         >
                               <font-awesome-icon icon="trash-can" />  delete my account</span>

                        <Backdrop class="absolute" v-if="confirm">
                            <Confirmmodal @modal-decline="confirm=false" @modal-accept="submitform" accept="Okay" decline="cancel">
                                 You might be logged out 
                                click Okay to continue
                                <p v-if="password && password_confirmation" class="text-red-300">current password will be changed</p>
                            </Confirmmodal>
                            

                        </Backdrop>

                         <Backdrop class="absolute" v-if="confirm_account_delete">
                            <Confirmmodal @modal-decline="confirm_account_delete=false" @modal-accept="deleteaccount()" accept="Continue" decline="cancel">
                                    <p class="text-sm">This action is irreversible</p>
                                    <p class="text-red-400 block">Your account will be deleted!</p>
                                    
                               
                            </Confirmmodal>
                            

                        </Backdrop>
                        

                </form>
                
              
            </div>    
    </div>    
</template>
<script>
import Api from "../apis/Api"
import Modal from "./Modal"
import Backdrop from "./Backdrop"
import Confirmmodal from "./Confirmmodal"
export default {
        components:{Modal,Backdrop,Confirmmodal},
       data(){
        return{
            username: '',
            email: '',
            password: '',
            current_password:'',
            password:'',
            password_confirmation:'',
            toggle_change_password: false,
            loading_data: false,
            confirm: false,
            confirm_account_delete:false,
             errors: [],
        }
    },
    methods:{
        submitform(){
            this.errors=[]
            this.loading_data=true
            this.confirm=false
            Api.post('/user/updatelogininfo',{current_password:this.current_password,password:this.password,password_confirmation:this.password_confirmation ,email:this.email, name:this.username}).then(res=>{
                
                this.loading_data=false
                   this.$store.dispatch('logout')
                
                

            }).catch(err=>{
                this.loading_data=false
                this.errors = err.response.data.errors
                
                })
        },
        deleteaccount(){
                this.errors=[]
             this.loading_data=true
            this.confirm_account_delete=false
            Api.post('/user/deleteaccount',{current_password:this.current_password}).then(res=>{
                    this.$store.commit('reloadBrowseAds',true)  
                    this.$store.dispatch('logout')
            }).catch(err=>{
               
                this.loading_data=false
                this.errors = err.response.data.errors
                console.log(err.response.data);
            })
        }

    },

mounted(){

 
       this.loading_data=true 
    Api.post('/getuser').then(res=>{
        this.loading_data = false
        const {user, businessprofile} = res.data;
        this.username = user.name
        this.email = user.email
       
    }).catch(error=>{
        this.loading_data=false
        console.log(error.response.data)
    })

}

}   



</script>






<style scoped>
.addshadow{
   
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}


.addtransition{

    transition: absolute;

}
</style>

