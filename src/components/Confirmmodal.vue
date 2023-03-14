<template>
        <div class="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 dark:text-gray-300 dark:border-0 dark:ring-1 dark:ring-slate-400/50 w-64 m-auto">
    <div class="w-full h-full text-center">
        <div class="flex h-full flex-col justify-between">
             <svg xmlns="http://www.w3.org/2000/svg" class="mt-4 w-12 h-12 m-auto text-orange-200" width="40" height="40" fill="currentColor" viewBox="0 0 1792 1792">
                        <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                        </path>
                    </svg>
            <p class="text-gray-800  text-xl font-bold mt-4">
               {{ title }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 text-xs py-2 px-6">
                <slot></slot>
            </p>
            <div class="flex items-center justify-between gap-4 w-full mt-8">
                <button  v-if="accept" @click="$emit('modal-accept')" type="button" class="py-2 px-4  bg-orange-300 hover:bg-orange-400 focus:ring-orange-400 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                   {{ accept }}
                </button>
                <button v-if="decline" @click="$emit('modal-decline')"  type="button" class="py-2 px-4  bg-white hover:bg-gray-100 focus:ring-orange-400 focus:ring-offset-orange-200 text-gray-400 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    {{ decline }}
                </button>
            </div>
        </div>
    </div>
</div>


</template>
<script>
export default{

    props:['accept','decline','title']

}

</script>