<template>
  <div class="relative ">
    <Header :auth="auth_items" :showLoadingbar="showLoadingbar"
      :class="['z-50 transition-all ease-linear ', showLoadingbar && 'sticky top-0']"
      @toggle-notification="togglenotification()" :newnotification="newnotification" />

   

    <div class="min-h-screen w-full ">
      <router-view :auth_user="auth_items" />

      <Backdrop class="z-[100]" v-if="shownotification" v-cloak>
        <Modal title="Notifications" @close-modal="togglenotificationoff()" decline="close" type='notification'
          :full="false" @modal-decline="togglenotificationoff()">

          <Notifications @toggle-notification="togglenotificationoff()" />



        </Modal>
      </Backdrop>

    </div>

    <Footer />
  </div>
</template>

<script>

import Header from "./components/Header"
import Footer from './components/Footer'
import Popup from "./components/Popup"
import Loadingbar from "./components/Loadingbar"
import { mapActions, mapState } from "vuex"
import store from "./store"
import Modal from "./components/Modal"
import Backdrop from "./components/Backdrop"
import Notifications from "./components/Notifications"
import Api from "./apis/Api"
import axios from "axios"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";


export default {
  components: { Header, Footer, Popup, Loadingbar, Modal, Backdrop, Notifications },
  data() {
    return {
      auth_items: '',
      shownotification: false,
      newnotification: false,
    }
  },

  computed: {
    ...mapActions(["fetchUser"]),
    ...mapState(['auth', 'popup', 'showLoadingbar', 'Unreadnotification','routeparams']),

  },
  watch: {
    'routeparams.category'(){
          store.commit('setrouteParams_subcategory',null)
          store.dispatch('loadSubCateogries')
          
    },


    auth() {
      this.auth ? this.auth_items = this.auth : this.auth_items = '';
      if (this.auth) {
        store.dispatch('Fetchunreadnotifications')
        window.Echo.channel('usernotification' + this.auth_items.user.id)
          .listen('Usernotification', (e) => {
            store.dispatch('Fetchunreadnotifications')
          })
      }
    },


    Unreadnotification() {
      this.Unreadnotification.length > 0 ? this.newnotification = true : this.newnotification = false;

    },
    shownotification() {
      // this.shownotification ? disableBodyScroll(document.querySelector('body')) : enableBodyScroll(document.querySelector('body'))

    }
  },
  methods: {
    togglenotification() {
      this.shownotification = !this.shownotification;
    },

    togglenotificationoff() {
      this.shownotification = false;
      Api.get('/user/notifications/markasread').then((res) => {
        console.log(res.data)
        this.$store.commit('setUnreadnotification', '')
      }).catch(err => console.log(err.response.data))

    },


  },
  mounted() {
    localStorage.getItem('auth') && this.fetchUser
    window.Echo.channel('NewAdAdded').listen('NewAdAdded', (e) => {
      store.commit('setNewAdAdded', true)
    })
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }


}


</script>


<style>
@font-face {
  font-family: Poppins-Light;
  src: url("./fonts/poppins/Poppins-Regular.ttf");
}

.hidescroll::-webkit-scrollbar {
  display: none;
}

.hidescroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#app {
  font-family: Poppins-Light, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #353d46;
}

#nav {
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.trix-editor ul {
  list-style-type: disc !important;
  margin-left: 1rem !important;
}

.trix-editor ol {
  list-style-type: decimal !important;
  margin-left: 1rem !important;
}

v-cloak {
  display: none !important;
}

.move {
  animation: move 1s cubic-bezier(0, 0.32, 0.83, 0.67) reverse;
  animation-iteration-count: infinite;
}

@keyframes move {
  0% {
    right: 0px;
    /* transform: translateX(0); */
    width: 10%;
  }

  50% {
    width: 50%;
  }

  100% {
    width: 10%;
    right: 120%;
    /* transform: translateX(-200%); */
  }
}


:root {
  --popper-theme-background-color: #4b5563;
  --popper-theme-background-color-hover: #4b5563;
  --popper-theme-text-color: #ffffff;
  --popper-theme-border-width: 0px;
  --popper-theme-border-style: solid;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 10px;
  --popper-theme-box-shadow: 0 6px 30px -6px #4b5563;
}



.Vue-Toastification__toast.Vue-Toastification__toast--success.bottom-right {
  background-color: #4caf4fb9;
  color: #bbf7d0;
  backdrop-filter: blur(1px);
}


@media (prefers-color-scheme: dark) {
  .Vue-Toastification__toast.Vue-Toastification__toast--success.bottom-right {
    background-color: #14532d;
    color: #cbd5e1;
    backdrop-filter: blur(1px);
  }
}
</style>
