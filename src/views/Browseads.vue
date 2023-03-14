<template>
<div class="pt-3 relative lg:container  mx-auto">
    <div>
        <Searchresult :ads="data" :isLoading="isLoading" v-on:fetchItems="getAdds" :total="total" />
        <Pagination class="container mx-auto flex justify-center items-center flex-nowrap hidescroll bg-inherit py-2 h-auto" style=" " v-if="links && total > perpage" :prev_page_url="prev_page_url" :last_page="last_page" :path="path" :first_page_url="first_page_url" :last_page_url="last_page_url" :current_page="current_page" :links="links" :next_page_url="next_page_url" v-on:fetch-Items="fetchallad" />
    </div>
</div>
</template>

<script>
import Searchresult from "../components/Searchresult"
import Api from "../apis/Api"
import Pagination from "../components/Pagination"
import Skeletonloading from "../components/Skeletonloading"
import {
    mapActions,
    mapState
} from "vuex"
import store from "../store"

import {
    scroller
} from 'vue-scrollto/src/scrollTo';

export default {
    components: {
        Searchresult,
        Pagination,
        Skeletonloading
    },
    data() {
        return {
            data: '',
            first_page_url: '/ads',
            prev_page_url: '',
            last_page: '',
            path: '',
            last_page_url: '',
            current_page: '',
            next_page_url: '',
            links: '',
            isLoading: false,
            perpage: '',
            total: '',

        }
    },
    computed: {
        ...mapState(["routeparams", "browseads", "auth"]),
    },

    methods: {

        ...mapActions(["getCategories", "getLocations", "fetchbrowseads"]),

        fetchallad(url) {
            this.isLoading = true;
            this.fetchbrowseads(url)
            store.commit('setNewAdAdded', false)

        },
        getAdds() {
            this.fetchallad(this.$store.getters.getAllquery)
        },
        setdata() {

            this.data = this.browseads.data
            this.next_page_url = this.browseads.next_page_url;
            this.current_page = this.browseads.current_page;

            this.prev_page_url = this.browseads.prev_page_url;
            this.last_page = this.browseads.last_page;
            this.last_page_url = this.browseads.last_page_url;
            this.links = this.browseads.links;
            this.total = this.browseads.total;
            this.last_page = this.browseads.last_page;
            this.path = this.browseads.path;
            this.perpage = this.browseads.per_page

        }

    },

    watch: {
        isLoading() {

            const firstScrollTo = scroller()
            firstScrollTo({
                y: 0,
                easing: 'ease-in-out'
            })

        },

        $route(to, from) {

            if (to) {
                store.commit('setPreviousoffsetScroll', window.scrollY)
            }

        },
        browseads() {
            this.browseads ? this.isLoading = false : this.isLoading = true;
            console.log(this.browseads)

            this.setdata()

        },
        auth() {

        }
    },
    created() {

    },
    async mounted() {

        if (store.state.util.reload_browse_ads == true) {
            this.fetchbrowseads(this.$store.getters.getAllquery)
            this.isLoading = true
            store.commit('reloadBrowseAds', false)
        } else {
            let expression = "^\/ads\/[a-z0-9]+(?:-[a-z0-9]+)*"

            let slug = this.$router.options.history.state.forward !== null ? (this.$router.options.history.state.forward).toString() : ''

            if (slug.match(expression)) {
                this.setdata()

                if (typeof this.data === 'undefined') {
                    this.fetchbrowseads(this.$store.getters.getAllquery)

                }

            } else if (this.browseads) {

                this.setdata()

                let previous_scroll = store.state.util.previous_offset_scroll

                this.$nextTick(() => {
                    previous_scroll && window.scrollTo({
                        top: previous_scroll
                    })
                })
                if (Object.keys(this.routeparams).length === 0 && this.browseads.current_page === 1 && store.state.NewAd) {
                    this.fetchbrowseads(this.$store.getters.getAllquery)

                }

            } else {

                this.fetchbrowseads(this.$store.getters.getAllquery)
                this.isLoading = true

            }

        }

        this.getCategories();
        this.getLocations();

    }

}
</script>
