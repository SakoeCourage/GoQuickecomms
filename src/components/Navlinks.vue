<template>
          <button @click="$emit('action')"
                    
                    style=" background-color: rgba(255, 255, 255, 0.586);"
                    type="button"
                    class="text-yellow-700 border border-yellow-500 hover:bg-yellow-700 focus:ring-2  focus:ring-orange-300 font-medium rounded-lg  p-1 text-center inline-flex items-center mr-2 z-[60]"
                >
                <slot>

                    </slot>
                  
                    <span class>{{ text }}</span>
                </button>
</template>

<script>
export default {
    props:['text']
}
</script>