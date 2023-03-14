<template>
    <div class="container mx-auto"
    >
        <div class="  grid place-items-center  min-h-screen">

     <div class=" ">

            <div class=" flex justify-between  p-2">

                <nav class=" text-7xl border-2 border-r-gray-300 text-gray-600 mr-2 pr-2 font-semibold">404</nav>
                
                <nav class="flex flex-col min-w-max text-xl text-gray-600">
                     <span>
                             <span class="text-sm md:text-lg text-center">
                             <p>  Page was not found</p>
                         <p class="text-xs text">make sure the correct url is set </p>
                         </span>
                         <p class="w-full text-sm text-center flex items-center justify-center crosshair relative  "><span class="w-max bg-gray-200 p-1 ">or</span></p>

                         <p class="text-sm ">Item may have been removed</p>
                     

                     </span>
                     <span></span>


                </nav>



        </div>
        <div class="grid grid-cols-2 mt-2 h-10 ">
            <button @click="$router.push({name:'Browseads'})" class=" text-center border-2 h-full bg-orange-300 text-gray-100 border-gray-100 rounded-md   "><font-awesome-icon icon="list" class="mr-2 inline" /><h1 class="inline">All Ads</h1></button>
            <button @click="$router.push({name:'Postad'})" class=" text-center border-2 h-full bg-gray-100 border-orange-300 rounded-md "><font-awesome-icon icon="circle-plus" class="mr-2" /><h1 class="inline">Post Ad</h1></button>
        </div>
     </div>



    </div>

    </div>
    

</template>

<style>
.crosshair::before{
    content: ' ';
    position: absolute;
    inset: 48% auto;
    z-index: -1;
 
    right: 0;
    
    
    background: #cbd5e1;
    width: 100%;
   
        

}



</style>