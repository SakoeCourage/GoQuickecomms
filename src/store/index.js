import { createStore } from 'vuex'
import Api from "../apis/Api"
import User from "../apis/User"
import router from '../router'


export default createStore({
    state: {
        allLocations: '',
        allCategories: '',
        currentSubCategories: null,
        routeparams: {},
        browseads: '',
        auth: '',
        popup: '',
        showLoadingbar: false,
        Unreadnotification: '',
        usernotifications: '',
        util: {},
        NewAd: false,
        Homepage_items: ''


    },
    mutations: {
        setshowLoadingbar(state, payload) {
            state.showLoadingbar = payload
        },
        setHomepageitems(state, payload) {
            state.Homepage_items = payload
        },
        setUsernotifications(state, payload) {
            state.usernotifications = payload
        },

        setcurrentSubCategories(state, payload) {
            state.currentSubCategories = payload

        },


        setPopup(state, payload) {
            state.popup = payload
        },
        setUser(state, payload) {
            state.auth = payload
        },
        setCategories(state, payload) {
            state.allCategories = payload
        },
        setLocation(state, payload) {
            state.allLocations = payload
        },
        setrouteParams_search(state, payload) {
            state.routeparams.search = payload
        },
        setrouteParams_location(state, payload) {
            state.routeparams.location = payload
        },
        setrouteParams_category(state, payload) {
            state.routeparams.category = payload
        },
        setrouteParams_order(state, payload) {
            state.routeparams.order = payload
        },
        setrouteParams_price(state, payload) {
            state.routeparams.price = payload
        },
        setrouteParams_condition(state, payload) {
            state.routeparams.condition = payload
        },
        setrouteParams_subcategory(state, payload) {
            state.routeparams.subcategory = payload
        },
        resetParams(state) {
            state.routeparams = {}

        },
        resetOnlyFilterParams(state) {
            state.routeparams.category = null
            state.routeparams.location = null
            state.routeparams.order = null
            state.routeparams.price = null

        },
        setParams(state, payload) {
            state.routeparams = payload
        },
        setfetchbrowseads(state, payload) {
            state.browseads = payload
        },
        setUnreadnotification(state, payload) {
            state.Unreadnotification = payload
        },
        setPreviousoffsetScroll(state, payload) {
            state.util.previous_offset_scroll = payload

        },
        setNewAdAdded(state, payload) {
            state.NewAd = payload

        },
        reloadBrowseAds(state, payload) {
            state.util.reload_browse_ads = payload

        }
    },
    actions: {
        async logout(context) {
            User.logout().then(response => {


                localStorage.removeItem("auth");
                context.commit("setUser", '')
                router.push({ name: "Login" });


            }).catch((error) => {
                console.log(error)

            })
        },
        async getLocations(context) {
            Api.get('/location').then(
                (response) => {

                    let marr = [];
                    response.data.map((data, i) => {

                            i > 0 && marr.push(data.location)




                        }

                    );
                    // console.log(marr)
                    context.commit("setLocation", marr)
                }
            ).catch((error) =>
                console.log(error))

        },
        async getCategories(context) {
            Api.get('/category').then(
                (response) => {
                    console.log(response.data)

                    let marr = [];
                    response.data.map((data, i) => {



                            i > 0 && marr.push(data.category)

                        }

                    );

                    context.commit("setCategories", marr)



                }
            ).catch((error) =>
                console.log(error))

        },
        async fetchbrowseads({ commit, dispatch, getters }, payload) {
            console.log(getters.getAllquery)

            Api.get(payload).then((response) => {

                if (response.status === 200) {


                    commit('setNewAdAdded', false)
                    commit('setfetchbrowseads', response.data)

                }

            }).catch((error) => {
                console.log(error)
            })


        },
        async fetchUser(context) {

            if (localStorage.getItem('auth')) {
                User.auth().then(res => {


                    console.log(res.data)

                    // context.commit("setUser", res.data)
                    return

                }).catch(error => {
                    console.log(error.response.data)
                })
            }





        },
        Fetchunreadnotifications(context) {
            Api.get('/user/notification').then((res) => {

                context.commit('setUnreadnotification', res.data.ureadnotifications)

            }).catch(error => console.log(error.response.data))

        },
        loadSubCateogries({ commit, state }) {
            // this.subcategories = "loading"

            commit('setcurrentSubCategories', 'loading')

            Api.post('/loadsubcategories', { category_name: state.routeparams.category }).then(
                (res) => {

                    // this.subcategories = res.data.subcategories
                    commit('setcurrentSubCategories', res.data.subcategories)
                    console.log(state.currentSubCategories)
                }
            ).catch(err => {
                console.log(err.response)
                commit('setcurrentSubCategories', null)
            })


        }


    },
    getters: {
        getallrouteParam(state) {
            return state.routeparams;
        },
        getAllquery(state) {
            return `/ads?search=${state.routeparams.search ?? ''}&order=${state.routeparams.order ?? ''}
            &location=${state.routeparams.location ?? ''}
            &category=${state.routeparams.category ?? ''}
            &price=${state.routeparams.price ?? ''}
            &subcategory=${state.routeparams.subcategory ?? ''}
            &condition=${state.routeparams.condition ?? ''}`

        },
        togglefilter(state) {
            if (state.routeparams.hasOwnProperty('price') && state.routeparams['price'] != null ||
                state.routeparams.hasOwnProperty('order') && state.routeparams['order'] != null ||
                state.routeparams.hasOwnProperty('location') && state.routeparams['location'] != null ||
                state.routeparams.hasOwnProperty('category') && state.routeparams['category'] != null ||
                state.routeparams.hasOwnProperty('condition') && state.routeparams['condition'] != null ||
                state.routeparams.hasOwnProperty('subcategory') && state.routeparams['subcategory'] != null
            ) {
                return true
            } else { return false }

        },
    },

})