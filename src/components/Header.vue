<template>
  <!-- component -->

  <div class="h-10 md:h-14 ">
    <nav class="bg-white  dark:bg-slate-900 dark:text-white shadow relative h-full z-[90]">
      <div class="mx-auto px-6 h-full md:flex md:justify-between md:items-center">
        <div class="flex justify-between items-center h-full">
          <div>
            <a @click.prevent="$router.push({name: 'Home'})" class="text-gray-800 dark:text-white text-xl font-bold md:text-2xl hover:text-gray-700" href="/">Logo</a>
            
       
          



          
          </div>

          <div class="flex items-center justify-end  md:hidden  w-8/12">
         <span class=" flex items-center justify-between">

            <Popper arrow hover>
                     <button @click="$router.push({name:'Browseads'})" :class="['relative mr-5 text-gray-400 bg-gray-100 dark:bg-slate-400 dark:text-gray-100 p-1 h-full rounded-md', current_route === 'Browseads' && 'bg-orange-200  ring-orange-200 dark:ring-slate-400 ring-2 ring-offset-white ring-offset-2 text-white']  ">
           <svg class="h-6  rounded-full  " :class="current_route === 'Browseads' &&  'text-white'" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path fill="currentColor" d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z" class=""></path></svg>
          
          <font-awesome-icon icon='eye' class="absolute bottom-0 ring-white dark:ring-slate-300 rounded-full ring-2" :class="current_route === 'Browseads' &&  'text-white ring-orange-200 dark:ring-slate-300 '"/>
            </button>
                <template #content>
                    <ul>
                        <li class="  text-xs" >
                              Browse Ads
                        </li>
                    </ul>
                </template>
            </Popper>

            <Popper arrow hover >
            <button @click="$router.push({name:'Postad'})" :class=" ['relative text-xs h-8 text-gray-400 bg-gray-200 rounded-md transition ease-in duration-200 ', current_route === 'Postad' && ' bg-orange-200 dark:bg-slate-300 dark:text-white  ring-orange-200 ring-2 ring-offset-white ring-offset-2 text-white  dark:ring-slate-300 dark:ring-offset-slate-400 ' ]" >

               <h1
              class="  px-4 text-center rounded-md font-semibold " :class="current_route === 'Postad' && 'text-white  '"
            >
             
            </h1>
               Ad
              <font-awesome-icon
                icon="plus"
                class="absolute bottom-0 bg-orange-200 ring-2 text-white ring-white rounded-md u--swing continue"
              />
            </button>
             <template #content>
                    <ul>
                        <li class="  text-xs" >
                           Post Ad
                        </li>
                    </ul>
                </template>

            </Popper>

         </span>

            <span class="ml-10">
              <button
              type="button"
              class="text-gray-500 w-10 h-10 relative focus:outline-none"
              @click="openSidebar()"
            > 
              <div  v-if="setnewnotification" class="absolute top-2 right-0 h-2 w-2 bg-green-300 animate-pulse rounded-full"></div>
              <div
                class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  aria-hidden="true"
                  class="block absolute h-0.5 w-5 bg-gray-500 transform transition duration-500 ease-in-out"
                  :class="{ 'rotate-45': showdrop, ' -translate-y-1.5': !showdrop }"
                ></span>
                <span
                  aria-hidden="true"
                  class="block absolute h-0.5 w-5 bg-gray-500 transform transition duration-500 ease-in-out"
                  :class="{ 'opacity-0': showdrop }"
                ></span>
                <span
                  aria-hidden="true"
                  class="block absolute h-0.5 w-5 bg-gray-500 transform transition duration-500 ease-in-out"
                  :class="{ '-rotate-45': showdrop, ' translate-y-1.5': !showdrop }"
                ></span>
              </div>
            </button>
            </span>
          </div>
        </div>

        <div
          id="sidebar"
          class="md:relative z-20 md:left-0 inset-x-0 bg-orange-400 dark:bg-slate-800 dark:text-white md:bg-white md:dark:bg-slate-900 flex flex-col h-screen md:h-full justify-center items-center md:py-1 leading-8 md:leading-normal md:flex md:flex-row md:mx-6 absolute overflow-hidden md:overflow-visible"
          :class="showdrop ? 'animate-open left-0 ' : '  left-full animate-close'"
        >
          <router-link
            :to="{ name: 'Home' }"
            @click="closeSidebar()"
            class="w-full text-center md:w-auto my-2 text-lg md:text-sm text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-500 md:text-gray-700 dark:text-gray-100 md:dark:text-gray-100 px-5 py-2 rounded font-medium hover:text-yellow-500 md:mx-4 md:my-0"
          >Home</router-link>
          <router-link
            :to="{ name: 'Browseads' }"
            @click="closeSidebar()"
            class="w-full text-center md:w-auto md:text my-2 text-lg md:text-sm text-gray-200 md:text-gray-700 hover:bg-gray-200 dark:hover:bg-slate-500 dark:text-gray-100 md:dark:text-gray-100 px-5 py-2 rounded hover:text-yellow-500 font-medium md:mx-4 md:my-0"
          >Browse ads</router-link>
          <router-link
            :to="{ name: 'Postad' }"
            @click="closeSidebar()"
            class="w-full text-center md:w-auto my-2 text-lg md:text-sm text-gray-200 md:text-gray-700 hover:bg-gray-200 dark:hover:bg-slate-500 dark:text-gray-100 md:dark:text-gray-100 px-5 py-2 rounded font-medium hover:text-yellow-500 md:mx-4 md:my-0"
          >
            Post
            <h1
              class="inline text-gray-500 px-2 py-1 rounded-lg font-semibold relative bg-green-100"
            >
              Ads
              <font-awesome-icon
                icon="plus"
                class="absolute -top-1 -right-1 text-green-500 bg-green-100 rounded-md u--swing continue"
              />
            </h1>
          </router-link>

          <div class="relative">
            <button
              @click="show = !show"
              class="mx-2 px-3 flex items-center bg-gray-100 dark:bg-slate-600 rounded-full py-1 focus:outline-none focus:shadow-outline-orange relative ring-green-400 focus:ring-1"
            >
              <font-awesome-icon
                v-if="!setUserinfo.businessprofile || !setUserinfo.businessprofile.profile_image"
                icon="user"
                class="h-4 w-4 mx-1 text-gray-400"
              />
              <img
                v-if="setUserinfo.businessprofile && setUserinfo.businessprofile.profile_image "
                class="h-6 w-6 rounded-full"
                :src="setProfileImage(setUserinfo.businessprofile.profile_image)"
                alt
              />

              <svg
                fill="currentColor"
                class="text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
                  class="heroicon-ui"
                />
              </svg>
              <span
                v-if="setnewnotification"
                class="absolute w-2 h-2 animate-pulse top-0 right-0 bg-green-400 rounded-full"
                role="notifcation-indicator"
              ></span>
            </button>

            <transition name="slide">
              <div
                v-if="show"
                v-cloak
                v-click-away="onClickAway"
                class="z-[100] absolute md:bottom-auto bottom-10 right-0 mt-4   min-w-max  md:w-max rounded-md bg-white dark:bg-slate-900 shadow-outline-orange"
              >
                <ul
                  class="bg-gray-100 dark:bg-slate-800 shadow-md w-full p-2  rounded-md relative drop-shadow-md dropitem "
                >
                <transition name="slide_left">
                <ul v-if="ChangeThemeMenu" v-cloak class="absolute  rounded-md inset-0 z-[100] w-full h-full bg-gray-100 dark:bg-slate-800"> 
                <div class="w-full h-full px-1 flex flex-col items-center justify-center relative">
                  <span @click="ChangeThemeMenu=false" class="absolute text-gray-500 text-sm bottom-0 cursor-pointer dark:text-gray-200 mb-2"> <font-awesome-icon class=" mr-2 opacity-50 " icon="chevron-left" />back</span>
                 <li @click="changeTheme('light')" class=" text-sm leading-8 ring-1 ring-orange-200  dark:ring-slate-400/50 dark:text-gray-200 text-gray-500 w-full rounded-full text-center" :class="!dark && 'bg-orange-100'"><button>light</button></li>
                <li @click="changeTheme('dark')" class=" text-sm leading-8 ring-1 ring-orange-200 dark:ring-slate-400/50 dark:text-gray-200 text-gray-500 w-full rounded-full text-center mt-2" :class="dark && 'dark:bg-slate-500'"><button>dark</button></li>

                  </div>  
               
                  </ul>
                  </transition>
                  <li @click="navigateuser()"
                    class=" cursor-pointer px-5 py-2 my-1 w-full hover:bg-gray-200 hover:text-green-500 dark:hover:bg-slate-600 dark:hover:text-white rounded-md flex pr-4 items-center"
                  >
                    <img
                      v-if="setUserinfo.businessprofile && setUserinfo.businessprofile.profile_image"
                      class="h-6 w-6 rounded-full"
                      :src="setProfileImage(setUserinfo.businessprofile.profile_image)"
                      alt
                    />

                    <svg
                      v-if="!setUserinfo.businessprofile || !setUserinfo.businessprofile.profile_image"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      class="text-gray-600"
                    >
                      <path
                        d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                        class="heroicon-ui"
                      />
                    </svg>
                    <a @click.prevent=""
                      href
                      class="w-full inline-block pl-2"
                    >{{ setUserinfo.user ? setUserinfo.user.name : "My Account" }}</a>
                  </li>
                  <li
                    v-if="!setUserinfo.user" @click="this.$router.push({name:'Login'})"
                    class="px-5 py-2 my-2 w-full hover:bg-gray-200 cursor-pointer hover:text-green-500 dark:hover:bg-slate-600 dark:hover:text-white rounded-md flex items-center pr-4"
                  >
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      class="text-gray-600"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                      />
                    </svg>

                    <router-link
                      :to="{ name: 'Login' }"
                      @click="closeSidebar()"
                      class="inline-block pl-2"
                    >Login</router-link>
                  </li>
                  <li @click="$emit('toggle-notification',this.show=false)" v-if="this.$store.state.auth" class="curson-pointer px-5 py-2 my-2 w-full hover:bg-gray-200 hover:text-green-500 dark:hover:bg-slate-600 dark:hover:text-white rounded-md flex items-center">
                    <nav class="inline relative h-full flex items-center">
                      <font-awesome-icon
                        :icon="['far', 'bell']"
                        class="text-gray-600 dark:text-white"
                        style="width: 23px; height:23px;"
                      />
                      <span v-if="setnewnotification"
                        class="absolute z-50 -top-2 -right-2 bg-green-400 text-white rounded-full text-xs text-center p-2 h-4 w-4 flex items-center justify-center"
                        role="notification-count"
                      >{{ setnoficationcount }}</span>
                    </nav>
                    <a
                      @click.prevent=""
                      href
                      class="ml-2 inline-block"
                    >Notifications</a>
                  </li>
                  <li @click="ChangeThemeMenu = true" class="curson-pointer px-5 my-2 py-2 w-full hover:bg-gray-200  rounded-md dark:hover:bg-slate-600 dark:hover:text-white flex  items-center">
                 <font-awesome-icon class="h-[22px] text-gray-600 " icon="palette"/>
                    <a @click.prevent="" href class="mx-2 inline-block hover:text-green-500 dark:hover:text-white  ">appearance</a>
                    <font-awesome-icon icon="chevron-right" class=" opacity-50 text-gray-600 dark:text-white  "/>
                  </li>
                  <hr v-if="setUserinfo" class="bg-gray-500 border-gray-300" />
                  <li  @click="loguserout()"
                    v-if="setUserinfo"
                    class=" cursor-pointer px-5 my-2 w-full py-2 hover:bg-gray-200 hover:text-orange-700 rounded-md flex dark:hover:bg-slate-600 dark:hover:text-white items-center"
                  >
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      class="text-gray-600 dark:text-white "
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                      />
                    </svg>
                    <button
                     
                    
                      class="inline-block pl-2 border-none focus:outline-none"
                    >Logout</button>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <button
            class="absolute bottom-20 rounded-full border-2 px-3 text-gray-100 md:hidden focus:border-white border-white hover:border-2 focus:outline-none"
            @click="closeSidebar()"
          >
            <font-awesome-icon icon="times" class="text-white" />
          </button>
        </div>
      </div>
    </nav>
    <Loadingbar :load="showLoadingbar" class />
  </div>
</template>

<script>


import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { mapActions,mapState } from "vuex";
import Loadingbar from "./Loadingbar";
import { setProfileImage } from '../apis/Util'
import Notifications from './Notifications'
import Popper from "vue3-popper";


export default {
  props: ["showLoadingbar", "newnotification"],
  components: { Loadingbar, Notifications,Popper },
  data() {
    return {
      showdrop: false,
      show: false,
      auth_user: '',
      setnewnotification: false,
      current_route: '',
      ChangeThemeMenu:false,
      dark:false

    }
  },
  computed: {
      ...mapState(['auth']),
    setUserinfo() {
      return this.auth
    },

    loggedIn() {
      return localStorage.getItem('auth')

    },
    setnoficationcount() {
      let items = this.$store.state.Unreadnotification
      if (items.length >= 10) {
        return "9+"
      } else {
        return items.length
      }

    }

  },


  methods: {
    changeTheme(theme){
   
      if(theme ==='dark' ){
        localStorage.setItem('theme',theme)
        document.documentElement.classList.add(theme)
        this.dark = true

      }else{
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme',theme)
        this.dark = false
      }
    },

    ...mapActions(["logout"]),
    setProfileImage,


    onClickAway() {
      this.show = false
      this.ChangeThemeMenu = false
    },

    navigateuser(){
      this.show = false;

        this.setUserinfo.user ? this.$router.push('/'+this.setUserinfo.user.name+'/profile') : this.$router.push({name:'Login'}) 

    },

    runcheck() {
      if (this.showdrop == true) {
        disableBodyScroll(document.querySelector('#sidebar'));

      }
      else {
        enableBodyScroll(document.querySelector('#sidebar'));
      }
    },

    openSidebar() {
      this.showdrop = !this.showdrop;
      this.runcheck();
    },

    closeSidebar() {

      this.show = false;

      this.showdrop = false;
      
      this.runcheck();
    },
    loguserout() {
      this.closeSidebar()
      this.logout()
    },




  },
  watch: {
    $route(to, from) {
      this.current_route = this.$route.name
   
      this.closeSidebar()
    },
    auth() {


      this.auth_user = this.auth;

      this.setUserinfo

    },
  
    newnotification() {

      if (this.newnotification) {
        this.setnewnotification = true
        this.setnoficationcount;
      } else {
        this.setnewnotification = false
      }
    }
  },


  mounted() {
    // console.log(this.$route)
    if(localStorage.theme === 'dark'){
      this.dark = true
    }else if(!localStorage.theme){
      this.dark = false
    }
    console.log(localStorage.theme)

    

  }

}
</script>

<style scoped >
.animate-close {
  animation: close-keyframe cubic-bezier(0.52, -0.01, 0.28, 1.12) 0.2s;
}

@keyframes close-keyframe {
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}

.animate-open {
  animation: open-keyframe cubic-bezier(0.52, -0.01, 0.28, 1.12) 0.2s;
}
@keyframes open-keyframe {
  0% {
    left: 100%;
  }
  100% {
    left: 0;
  }
}

a.router-link-exact-active {
  color: rgba(234, 179, 8, 0.8);
  position: relative;
}
a.router-link-exact-active::before {
  content: "";
  position: absolute;
  inset: auto 30%;
  bottom: 1px;

  background-color: rgba(234, 179, 8, 0.8);
  height: 2px;
}

.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-10px), scale(0.5);
    /* transform: ; */
    opacity: 0;
  }
  50% {
    opacity: 0.5;
    transform: scale(0.7);
  }
  100% {
    transform: unset;
    opacity: 1;
  }
}

.slide-enter-active {
  animation: slide 0.2s;
}

.slide-leave-active {
  animation: slide 0.2s reverse;
}
@keyframes slide {
  0% {
    transform: translateY(30px);

    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: unset;
    opacity: 1;
  }
}

.dropitem::before {
  content: "";
  position: absolute;

  inset: auto 85%;
  top: -5px;

  height: 12px;
  width: 12px;
  background-color: inherit;
  transform: rotate(45deg);
}

.slide_left-enter-active {
  animation: slide_left cubic-bezier(0, 0, 0, 0.96) .2s;
}

.slide_left-leave-active {
  animation: slide_left  cubic-bezier(0, 0, 0, 0.96) .2s reverse;
}
@keyframes slide_left {
  0% {
    /* transform: translateX(100%); */
    transform: translateX(20%);
   
    filter:opacity(0.5) blur(6px);
 
   
 
    
  }
  
  100% {
    transform: translateX(0);;
    filter: none;

  }
}


@media only screen and (max-width: 768px) {
  .dropitem::before {
    display: none;
  }
  a.router-link-exact-active::before {
    background-color: white;
    inset: auto 45%;
    bottom: 1px;
  }

  a.router-link-exact-active {
    color: white;
    /* background: #000; */
  }
}
</style>

