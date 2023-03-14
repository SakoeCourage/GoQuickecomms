<template>
       <div class="text-sm flex items-center">
        <h1 class=" inline mx-1">New Items are available</h1>
        <button @click="$emit('refreshAd')" class=" bg-orange-100 p-1 rounded-md inline">refresh</button>
        
    </div>
</template>