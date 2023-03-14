<template>
    <div :class="['p-4 shadow-md bg-white z-50 flex items-center', type ==='sucess' ? 'text-green-500 ': 'text-red-500'] "> <h1 class=" mr-2" v-text="message"> </h1>

    <font-awesome-icon :icon="type==='sucess'? 'check': 'times' "/>
  
    </div>
</template>
<script>
export default {
    props:["message", "type"]
}
</script>
