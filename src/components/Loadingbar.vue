<template>
    <div >
        <div :class="[' my-0 bg-white h-1 ', load && 'u--pulse continue']" >
            <div :class=" [ ' bg-yellow-600 h-full   inner-line    ', load ? 'animate-width w-75 ' : 'animate-width-done w-100']"></div>

        </div>
    
    </div>
</template>
<script>
export default {
    props:['load'],
   
}
</script>

<style scoped>
.w-75{
    width: 75%;
}
   
.continue{
    animation-iteration-count: infinite;
}

.animate-width{

    
    animation: mover-inner-width cubic-bezier(0.52,-0.01, 0.28, 1.12) 1s ;
    /* animation-iteration-count: infinite; */

}

@keyframes mover-inner-width {
    0%{
            width: 0;
         

    }
   
    75%{
        width: 75%;
       

    }
    
}

.animate-width-done{

    animation: mover-inner-done cubic-bezier(0.52,-0.01, 0.28, 1.12) 1s ;
}

@keyframes mover-inner-done {
      0%{
            width: 75%;
         

    }
   
    100%{
        width: 100%;
       

    }
    
}



</style>