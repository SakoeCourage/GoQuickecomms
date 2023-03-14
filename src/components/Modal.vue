<template>
    
    <Transition appear
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
    >
    <div :class=" [' overflow-x-hidden w-11/12  md:w-3/5 lg:w-5/12 mx-auto shadow-lg  ', full && 'w-full md:w-full lg:w-full']   "  id="modal"  >
    <div class="relative px-4 w-full max-w-4xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white dark:bg-slate-700  rounded-lg shadow ">
            <!-- Modal header -->
            <div class="flex justify-between items-center p-2 rounded-t border-b ">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center justify-center w-5/6">
                    <h1 class="mr-1">{{title}}</h1>
                   <font-awesome-icon v-if="type=='notification'"
                        :icon="['far', 'bell']"
                        class="text-gray-600"
                        
                      />
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="large-modal " @click="$emit('close-modal')">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                </button>
            </div>
            <!-- Modal body -->
            <div class="   " >
                    <slot></slot>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
                <button v-if="accept" @click="$emit('modal-accept')" data-modal-toggle="large-modal" type="button" class="text-white bg-orange-300 hover:bg-orange-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-200 dark:border-2 ">{{accept}}</button>
                <button v-if="decline" @click="$emit('modal-decline')" data-modal-toggle="large-modal" type="button" class="text-gray-500 dark:text-white dark:bg-slate-600 dark:hover:shadow-lg dark:hover:bg-slate-600 dark:hover:text-white bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">{{ decline }}</button>
            </div>
        </div>
    </div>
</div>
</Transition>
</template>

<script>
export default {
    props:{accept:String ,decline:String,title:String,type:String,full:Boolean},
    
        
}
</script>

<style scoped>
w-90{
    width: 90%;
}
</style>