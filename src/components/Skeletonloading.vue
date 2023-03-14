<template>
         <div class=" relative p-2">
            
         <div class=" bg-gray-100 dark:bg-gray-700 dark:backdrop-filter dark:backdrop-blur-lg shadow-md w-full rounded-md h-full">
        <div class="grid gap-x-1 grid-cols-2 p-1">
            <div  class="  w-full   bg-gray-200 skeleton aspect-square dark:bg-gray-700  " style="
    --c-w: 100%;
    --c-bg: #f8f7fc;
    --shine: none;
 
    --c-p:1px;
   
   
   
  "
              ></div>
            <div  class="   w-full bg-gray-200 dark:bg-gray-700  skeleton aspect-square " 
            style="
    --c-w: 100%;
    --c-bg: #f8f7fc;
    --shine: none;

 
    --c-p:1px;

    
   
  "
            ></div>
        </div>
        <hr class=" shadow-xl my-1 border-gray-300 dark:border-0">
        <div class=" mb-2 h-6 md:h-8" >
            <div class=" flex  justify-between "> 
                <div class="ml-5 truncate text-center w-3/5 h-7 font-semibold text-orange-600 dark:text-gray-500 rounded-full skeleton ">  </div> 
                    <div class=" mr-5 bg-orange-100 dark:bg-gray-400  h-7 text-orange-600 dark:text-orange-600 rounded-md px-2 grid place-items-center text-xs skeleton w-1/5"
                        
                    ></div>
            </div>
           

        </div>
              <div class=" mb-2 h-6 md:h-8" >
            <div class=" flex  justify-between "> 
                <div class="mx-5 bg-gray-100 dark:bg-gray-400 text-gray-600 rounded-md h-4 md:h-7 font-semibold  skeleton ">  </div> 
                    <div class=" mx-5 bg-gray-100 dark:bg-gray-400 h-4 md:h-7 text-gray-600 rounded-md px-2 grid place-items-center text-xs skeleton "
                        
                    ></div>
            </div>
           

        </div>

        
    </div>

     </div>
</template>

<style scoped>
 @media (prefers-color-scheme: dark) {
    .skeleton{
      
         --bg: #6b7280;
         --shine: none;
    }
}
    .skeleton{
      
         
         --shine: none;
    }

</style>