<template>
    <div>

       
<div class="shadow-lg rounded-2xl  bg-white dark:bg-gray-500 w-72  p-1" >
    <img v-if="!image_one" src="/images/object/3.png" alt="ad image" class="w-32 p-4 h-36 m-auto rounded-2xl"/>
    <img v-if="image_one" :src="setImage(created_at,image_one)" alt="ad image " class="w-full rounded-t-2xl  h-full m-auto add-aspect-3-2"/>
    <div class="bg-orange-300 dark:bg-orange-400/80 m-2 p-2 rounded-lg ">
        
        <p class="text-white text-xs  text-center lowercase font-bold truncate" :class="!title && ' animate-pulse w-full'">
            {{  title ?? 'getting item description'  }}
        
        </p>
        <div class="flex items-center justify-center mt-2 ">
            <router-link :to="'/ads/'+slug"  class="text-white bg-oranage-400 dark:bg-orange-500 p-2 py-1 rounded cursor-pointer ">
                {{ price ? '₵ ' + new Intl.NumberFormat({ style: 'currency', currency: 'GHS' }).format(price) : "getting price" }}

                <font-awesome-icon icon="chevron-right"/>
            </router-link>
            
            
        </div>
    </div>
</div>


    </div>
</template>
<script>
import {setImage,} from '../apis/Util'
export default{
    props: ['image_one','title','price','created_at','slug'],
    methods:{
        setImage,
    }




}

</script>

<style scoped>
.add-aspect-3-2{
    aspect-ratio: 3/2;

}
</style>