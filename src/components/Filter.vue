<template>
  <div class="min-w-max">
    <div class="w-full" @keydown.escape="closeListbox()">
      <span class="inline-block w-full rounded-md shadow-sm" id="element_button" ref="element_button">
        <button 
          style="min-width:182px; max-width:182px"
          ref="button"
          
          @click="toggleListboxVisibility()"
          @keydown.enter.stop.prevent="selectOption()"
          @keydown.up.prevent="focusPreviousOption"

          @keydown.arrow-down.prevent="focusNextOption"
          class="  w-full py-2 pl-4 text-left  bg-gray-100 dark:bg-slate-500 dark:text-white border border-gray-100 dark:border-0 rounded-full cursor-pointer focus:outline-none sm:text-sm sm:leading-5 truncate flex justify-between  focus:ring-orange-300 focus:ring-2" :class="routeparams[placeholder] && 'ring-oranage-200 ring-2'"
        >
          <span
            class="truncate"
            v-text="(options[value] || routeparams[placeholder]) ?? 'select '+ placeholder"
            :class="{ 'text-gray-500 dark:text-white': !options[value] }"
          ></span>
       

          <span class="ml-4 mr-2 transform   ">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-400  border-0 outline-none rounded-full -rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              cl
            >
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </span>
            
        </button>
      </span>
      <transition name="slide_left">
      <div
        id="element_content"
        ref="element_content"
        class="z-[70] min-w-[182px] absolute bg-white dark:bg-slate-600 rounded-md shadow-lg inset-0 overflow-hidden  "
        style="min-width:182px"
        v-show="open" 
      >
        <ul
          ref="listbox"
          id="content_to_scroll"
          class=" hidescroll pb-1 overflow-scroll text-base leading-6 rounded-md shadow-xs focus:outline-none sm:text-sm sm:leading-5 h-full relative"
        > 
          <li class=" list-none bg-white dark:bg-slate-700 sticky z-[80] top-0 flex items-center h-8 border-b-4 "><button @click="closeListbox" class="border-none focus:outline-none ml-2 bg-gray-500 p-1 px-2 text-xs rounded-l-xl text-yellow-100 font-bold "> back </button> <h1 class=" w-4/6 text-center font-semibold ">Select {{placeholder}}</h1></li>
          
          <li  v-for="(key, index) in Object.keys(options)" :key="index">
            
            <div
              @click="selectOption()"
              @mouseenter="focusedOptionIndex = index"
              @mouseleave="focusedOptionIndex = null"
              :class="{ 'text-white bg-yellow-500 dark:text-white': index === focusedOptionIndex, 'text-gray-900 dark:text-white': index !== focusedOptionIndex }"
              class=" z-[70] min-w-max relative  py-2 px-3 text-gray-900 cursor-pointer select-none flex justify-between items-center "
            >
              <span
                class="block font-normal"
                v-text="Object.values(options)[index]"
                :class="{ 'font-semibold': index === focusedOptionIndex, 'font-normal': index !== focusedOptionIndex }"
              ></span>

              <span
                v-show="(key === value || options[key] === routeparams[placeholder] )"
                :class="{ 'text-white': index === focusedOptionIndex, 'text-yellow-600': index !== focusedOptionIndex }"
                class="max-w-max flex items-center justify-between pl-6 pr-4 text-yellow-600"
              >
            
                <svg  class="w-5 h-5 " viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </li>
            
        </ul>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>


import { createPopper } from '@popperjs/core';

import {mapState} from 'vuex'
import store from "../store"


export default {
  props: ["given_options", "placeholder","commitable"],

  data() {
    return {
      data: '',
      options: '',
      focusedOptionIndex: null,
      // placeholder: '',
      open: false,
      value: '',

    }
  },
  computed:{
      ...mapState(["routeparams"])

  },
  
  methods: {
    onClickAway() {
      // this.show = false
    },
    mypoper() {
      const button = document.querySelector('#element_button');
      const tooltip = document.querySelector('#element_content');
      createPopper(button, tooltip, {
        placement: 'left',
      });


    },
    reset_this_param(){
     
     store.commit(this.commitable, null)
    
    },

    select(config) {
      this.data = config;
      this.value = config;
    },

    closeListbox() {
      this.open = false;
      this.focusedOptionIndex = null;
    },


    selectOption() {

      if (!this.open) return this.toggleListboxVisibility();
      this.value = Object.keys(this.options)[this.focusedOptionIndex];
      
      
      store.commit(this.commitable, this.options[this.value] )
      
      this.closeListbox();
    },

    focusNextOption() {
      if (this.focusedOptionIndex === null) return this.focusedOptionIndex = Object.keys(this.options).length - 1

      if (this.focusedOptionIndex + 1 >= Object.keys(this.options).length) return

      this.focusedOptionIndex++

      this.$refs.listbox.children[this.focusedOptionIndex].scrollIntoView({
        block: "center",
      })
    },

    focusPreviousOption() {
      if (this.focusedOptionIndex === null) return this.focusedOptionIndex = 0

      if (this.focusedOptionIndex <= 0) return

      this.focusedOptionIndex--

      this.$refs.listbox.children[this.focusedOptionIndex].scrollIntoView({
        block: "center",
      })
    },

    toggleListboxVisibility() {
      if (this.open) return this.closeListbox();

      this.focusedOptionIndex = Object.keys(this.options).indexOf(this.value);

      if (this.focusedOptionIndex < 0) this.focusedOptionIndex = 0;
      this.open = true;

    }


  },
  
  mounted() {
    this.select(this.given_options)
    this.options = this.data;

    if (!(this.value in this.options)) this.value = '';
   





  }

}
</script>

<style scoped>

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

</style>