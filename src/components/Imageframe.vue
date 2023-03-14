<template>
  <div
    :class="['inline-block mx-4 md:mx-8 transition-transform ease-linear ', inactive && 'pointer-events-none opacity-60 transform  scale-90']"
  >
    <div class="flex flex-col py-2 h-full w-full ">
      <div
        class="w-44  h-44 md:w-44 md:h-44 self-center flex-none rounded-xl overflow-hidden relative"
        :class="fileisvalid ? '' : 'border-2 border-red-500'"
      >
        <img
          :class="['w-full h-full  aspect-square object-contain img_file', !file && 'opacity-50 object-cover bg-gray-200']"
          :src="file ?? setDefualtImage()"
          alt="Image Upload"
          :id="name"
        />
        <button
          @click="resetImage()"
          v-if="file && removable"
          class="absolute top-1 right-1 text-red-500 font-bold"
        >
          <font-awesome-icon icon="circle-minus" />
        </button>
      </div>
      <label class="cursor-pointer flex flex-col self-center w-max my-2 ">
        <!-- <span
          v-text="filename"
          class="self-center text-xs md:text-sm truncate text-center max-w-xs mx-2 text-gray-600" 
          :class="fileisvalid ? '' : 'underline text-red-500'"
        ></span> -->
        <span
          class="max-w-min self-center focus:outline-none text-center text-yellow-700 text-sm px-4 rounded-full bg-yellow-100 hover:bg-yellow-400 hover:text-white hover:shadow-lg"
        >{{!file ? 'choose' : 'change'}}</span>
        <input
          v-on:change="getimage($event, name)"
          type="file"
          class="hidden"
          accept=".jpg, .jpeg, .png .tiff"
          :name="name"
          :id="name"
        />
      </label>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'

export default {

  props: ["name", "setimage", "inactive", "removable","source"],
  data() {
    return {
      fileisvalid: true,
      filename: 'no file choosen',
      filetype: null,
      file: null,
      prev_file:null,
      image: '../../public/avatar.svg',
      accepted_types: ['image/jpeg', 'image/jpg', 'image/png', 'image/tiff']





    }
  },

  computed: {
    getif_file() {
      return this.file
    }

  },
  watch:{
    file(){
      if (this.file){
        this.prev_file=this.file
      }else{
        this.file = this.prev_file
      }
 
     
    },
    source(){
      if(this.source ){
       this.file = this.source
    
       this.getfileinfo();
        
                   }
    }
  },
  methods: {

    setDefualtImage() {

      return require('../../public/uploads.svg')
    },
    getfileinfo() {

      this.filename = this.file.name;
      this.filetype = this.file.type;

    },

    checkvalidfile() {


      if (this.accepted_types.includes(this.filetype)) {


        this.fileisvalid = true;
      }

      else {

        this.fileisvalid = false;
      }

    },

    getimage(e, img) {
      
         this.file = e.target.files[0]

      const [file] = e.target.files
      

      this.$nextTick(() => {

        if (file) {
          document.querySelector(`#${img}`).src = URL.createObjectURL(file);


        }
        this.getfileinfo();
        this.checkvalidfile();

        this.$emit(`${this.name}`, this.file)
      })

      
    },
    resetImage() {
      this.file = '';
      this.fileisvalid = true
        this.filename = 'no file choosen'
        this.filetype = null
        this.prev_file = null
       
        this.$emit(`${this.name}`, this.file)

    },

  },
  mounted() {
     





  }


}
</script>