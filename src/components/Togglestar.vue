<template>
    <div class>
        <div class="pl-2 my-2 p-2 rounded-md relative w-max">
            <span class="absolute top-0 right-0 flex notice cursor-pointer overflow-visible">
                <span
                    class="mr-2 notice_info hidden px-2 text-xs bg-orange-50 dark:bg-slate-900 text-inherit shadow-lg"
                >
                    <nav v-if="original_author" class="p-2"> Your Ads current Rating by viewers</nav>
                    <nav v-else>
                        <nav v-if="!liked && likescount < 5">
                            <h1 class="text-sm">Found what you want?</h1>
                            <br />
                            <h1 class="text-xs">Help item reach 5 star</h1>
                        </nav>
                        <h1 class="text-sm" v-if="likescount >= 5">Items is 5 starred</h1>
                        <h1
                            class="text-sm"
                            v-if="liked && likescount < 5"
                        >Great, you starred this ad</h1>
                    </nav>
                </span>
                <span
                    class="h-5 w-5 rounded-full bg-orange-300 dark:bg-orange-400 shadow-sm z-40 ring-2 ring-white grid place-items-center"
                >
                    <span class="rounded-full text-orange-50 text-center">?</span>
                </span>
            </span>

            <div class="flex items-end">
                <button
                    class="w-min shinable flex px-4 py-1 relative rounded-lg shadow-sm"
                    @click="togglelike($event)"
                >
                    <Star v-for="(x, i) in 5" :key="i" :toggled="i + 1 <= likescount" />
                </button>
                <Popper arrow hover v-if="items_likes.length">
                    <button class="rounded-full bg-white dark:bg-gray-800 dark:text-white text-gray-600">
                        <h1 class="justify-self-end text-xs">{{ items_likes.length }}</h1>
                    </button>
                    <template #content>
                        <ul>
                            <li
                                class="my-1 text-xs md:text-sm"
                                v-for="items in items_likes"
                                :key="items.id"
                            >
                                <router-link :to="'/' + items.name + '/profile'">{{ items.name }}</router-link>
                            </li>
                        </ul>
                    </template>
                </Popper>
            </div>
        </div>
        <Backdrop class="absolute inset-0 z-50" v-if="show_modal" v-cloak>
            <Modal
                title="Confirm"
                accept="Okay"
                decline="not now"
                @close-modal="closemodal()"
                @modal-accept="navigate_to_login()"
                @modal-decline="closemodal()"
                :full="true"
            >
                <div class="w-full text-center my-8">
                    <h1>You need to sign in to give a Star</h1>
                    <p class="text-sm">
                        Click
                        <router-link :to="{ name: 'Login' }" class="text-orange-400">Okay</router-link>to continue
                    </p>
                </div>
            </Modal>
        </Backdrop>
    </div>
</template>
<script>
import Api from "../apis/Api"
import Star from "./Star"
import Popper from "vue3-popper";
import Modal from "./Modal";
import Backdrop from "./Backdrop";


export default {
    props: ['ad_id', 'liked_by', 'likes', 'author_id'],
    components: { Star, Popper, Modal, Backdrop },
    data() {
        return {
            liked: '',
            items_likes: '',
            likescount: 0,
            show_modal: false,
            original_author: false

        }
    },

    methods: {
        closemodal() {
            this.show_modal = false

        },
        navigate_to_login() {
            this.$router.push({ name: 'Login' })

        },

        togglelike: function (e) {
            if (this.liked || this.likescount >= 5 || this.original_author) {

            } else if (!this.$store.state.auth) {
                this.show_modal = true

            }

            else {


                e.target.classList.add('clickedanimate')
                setTimeout(() => {
                    e.target.classList.remove('clickedanimate')
                }, 500)
                this.likescount = this.likescount + 1
                this.liked = !this.liked


                Api.post('/ads/likead', { ad_id: this.ad_id, user_id: this.$store.state.auth.user.id, author_id: this.author_id }).then(res => {
                    console.log(res.data.toggle)


                    if (typeof (res.data.toggle) == 'object') {
                        this.items_likes = res.data.toggle
                    }


                })
                    .catch(err => {
                        this.liked = !this.liked
                        console.log(err.response.data)
                    })

            }

        },

    },
    mounted() {
        this.liked = this.liked_by
        this.items_likes = this.likes
        this.likescount = this.items_likes.length


        if (this.$store.state.auth) {
            if (this.$store.state.auth.user.id == this.author_id) {
                this.original_author = true
                console.log({
                    original_author: this.original_author
                })
            }
        }





        window.Echo.channel('usernotification' + this.author_id)
            .listen('Usernotification', (e) => {
                Api.post('/ads/likers', { ad_id: this.ad_id }).then((res) => {

                    this.items_likes = res.data.likers
                    this.likescount = this.items_likes.length

                }).catch(error => console.log(error.response.data))


            })






    }



}
</script>
<style >
.shinable {
    position: relative;
    overflow: hidden;
    z-index: 30;
}
.shinable::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    filter: blur(15px);
    /* background-color: aqua; */
    background-color: rgba(238, 231, 192, 0.7);
    isolation: isolate;
    z-index: 10;
}
.shinable:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: -10%;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 30;
    transform: rotate(30deg);
    background: rgba(255, 255, 255, 0.13);
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.13) 0%,
        rgba(255, 255, 255, 0.3) 77%,
        rgba(255, 255, 255, 0.8) 92%,
        rgba(255, 255, 255, 0) 100%
    );
    animation: shine 3s 1s reverse;
    animation-iteration-count: infinite;
    animation-play-state: running;
}
@keyframes shine {
    to {
        opacity: 1;
        right: 110%;
    }
}

.clickedanimate {
    animation: click 0.5s cubic-bezier(0, 0.32, 0.83, 0.67);
}

@keyframes click {
    0% {
        transform: scale(0.9);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: unset;
    }
}

.notice:hover .notice_info {
    display: inline;
    cursor: pointer;
}

.notice_info {
    animation-duration: 0.3s;
    position: relative;
    z-index: 50;
}

.notice_info::after {
    content: " ";
    height: 30%;
    background-color: inherit;
    width: 1rem;
    position: absolute;
    top: 5%;

    right: -3%;
    transform: rotate(45deg);
    z-index: -1;
}
</style>