import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'css-skeletons'

import './output.css'
import VueClickAway from "vue3-click-away";
import { library } from '@fortawesome/fontawesome-svg-core'

import Echo from 'laravel-echo';
import "vue-toastification/dist/index.css";
import Toast, { POSITION } from "vue-toastification";

import {
    faUserSecret,
    faTimes,
    faArrowRight,
    faCheck,
    faUserTimes,
    faChevronLeft,
    faChevronRight,
    faTshirt,
    faBusAlt,
    faMobileAlt,
    faGrinHearts,
    faPrescriptionBottleAlt,
    faDog,
    faRunning,
    faGamepad,
    faSeedling,
    faBook,
    faTags,
    faHandsHelping,
    faClock,
    faMapMarkerAlt,
    faUser,
    faCircleMinus,
    faSignInAlt,
    faPlus,
    faLayerGroup,
    faPhone,
    faFilter,
    faAlignRight,
    faCaretRight,
    faQuoteRight,
    faAngleRight,
    faArrowLeft,
    faForwardStep,
    faEye,
    faEyeSlash,
    faLineChart,
    faChartLine,
    faPenToSquare,
    faLock,
    faArrowRightToBracket,
    faTrashCan,
    faList,
    faCirclePlus,
    faRightLong,
    faPalette,
    faLightbulb

} from '@fortawesome/free-solid-svg-icons'

import { faBell, } from '@fortawesome/free-regular-svg-icons'
library.add(faBell)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'


library.add(faUserSecret, faTshirt, faBusAlt, faUser, faSignInAlt, faPlus,
    faCheck,
    faCirclePlus,
    faLightbulb,
    faPalette,
    faRightLong,
    faList,
    faTrashCan,
    faArrowRightToBracket,
    faLineChart,
    faForwardStep,
    faEye,
    faEyeSlash,
    faChartLine,
    faPenToSquare,

    faArrowRight,
    faAlignRight,
    faCaretRight,
    faQuoteRight,
    faAngleRight,
    faCircleMinus,
    faArrowLeft,
    faMobileAlt,
    faLayerGroup,
    faPhone,
    faGrinHearts,
    faPrescriptionBottleAlt,
    faDog,
    faRunning,
    faGamepad,
    faSeedling,
    faBook,
    faTags,
    faHandsHelping,
    faFilter,
    faClock,
    faMapMarkerAlt,
    faLock


)
library.add(faFontAwesome)
library.add(faTimes)
library.add(faUserTimes)
library.add(faChevronLeft)
library.add(faChevronRight)



window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_WEBSOCKETS_KEY,
    wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true

});



const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueClickAway)

app.use(Toast, { position: POSITION.BOTTOM_RIGHT })
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false



app.mount('#app')