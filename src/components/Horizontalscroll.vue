<template>
    <div class="  flex flex-col mx-auto 2xl:container  md:mx-auto lg:m-auto p-auto relative   beforeitems transition-all " :class=" items ? 'whenitems bg-white dark:bg-slate-300 bg-opacity-90': 'bg-orange-100 dark:bg-slate-300 u--pulse continue skeleton skeleton-image  u--shake '  "  :style="['box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;  ', !items && '  --i-w: 10rem;   --c-bg: #f8f7fc; --c-p:5px; --lines:5; ']  " >
              
                 
                   <button
                @click="scrolltoLeft()"
                v-show="items"
                v-if="scrolledleft"
                class="absolute rounded-full h-6 w-6 md:h-12 md:w-12 bg-orange-300 dark:bg-slate-700/90 ring-2  ring-white left-2 grid place-items-center focus:outline-none z-10"
                style="top:45%;"
            >
                  <font-awesome-icon icon="chevron-left" class=" text-white" />
            </button>
            <button
                v-show="items"
                @click="scrolltoRight()"
                v-if="scrolledright"
                class="absolute h-6 w-6 md:h-12 md:w-12 rounded-full bg-orange-300 dark:bg-slate-700/90 ring-2 ring-white right-2 grid place-items-center focus:outline-none z-10"
                style="top: 45%;"
            >
                <font-awesome-icon icon="chevron-right" class=" text-white"/>
            </button>
        <div 
            id="recentcontainer"
            @scroll="getscrolledamount()"
            
            class="flex overflow-x-scroll py-5 hidescroll  my-1  scroll-snap-x w-full "
        >      

            <div class="flex flex-nowrap w-full h-full p-0   " v-if="items">
            
                <Recentcard  v-for="(item, i) in items" :key="i" :price="item.price" :item_name="item.item_name" :image_one="item.image_one" :created_at="item.created_at" :slug="item.slug"  />
            </div>
                <span class="absolute  bottom-0 inset-x-[40%] flex mb-2  " v-if="items"> 
                        <div v-for="(item, i) in items" :key="i" @click="scrolltoitem(i)" class="h-1 cursor-pointer opacity-80  md:h-2 w-[8%] bg-white  border-orange-300 dark:border-gray-500 border-[1px] mx-[1%]  rounded-md transition-transform duration-500 ease-linear hover:transform hover:scale-125 hover:bg-orange-300 dark:hover:bg-slate-500 " :class="current_index == i+1 && 'bg-orange-500/70 dark:bg-slate-500 transform scale-125'"></div>
                </span>
        </div>
        
    </div>
</template>

<script>
import Recentcard from "./Recentcard";
import { scroller } from 'vue-scrollto/src/scrollTo';


export default {
    props: ['items'],
    components:{Recentcard},
    

    data() {
        return {
            scrolledleft: false,
            scrolledright: true,
            
            innneritem: document.querySelector('#inneritem'),
            current_index: 1

        }

    },

    methods: {
        container() {
            return document.querySelector('#recentcontainer')
        },
        scrolltoitem(index){
             const firstScrollTo = scroller()
             let element = document.querySelectorAll('.scroll-card')
            var options = {
            container: '#recentcontainer',
            easing: 'ease-in-out',
            lazy: false,
            // offset: 0,
            force: true,
            cancelable: true,

            x: true,
            y: false
        }
            
        firstScrollTo(element[index],200, options)


        },

     
        getviewPortWidth() {
            let intViewportWidth = window.innerWidth;
            let scrollamout = 0;
            if (intViewportWidth <= 700) {
                scrollamout = 200;
            } else if (intViewportWidth > 700 && intViewportWidth <= 900) {
                scrollamout = 300;
            }
            else if (intViewportWidth > 900) {
                scrollamout = 600;
            }
            return scrollamout;

        },
        getscrolledamount() {
                let index = []
            let element = document.querySelectorAll('.scroll-card')
                element.forEach((el,i)=>{
                    if(el.getClientRects()[0].left > 0){
                        index.push(i)
                      this.current_index = index[0] + 1
                      
                    }
                    
                })
          
            this.container().scrollLeft > 0 ? this.scrolledleft = true : this.scrolledleft = false;
            this.container().scrollWidth == this.container().scrollLeft + this.container().getBoundingClientRect().width ? this.scrolledright = false : this.scrolledright = true;


        },


        scrolltoLeft() {



            this.container().scrollBy({
                left: -(this.getviewPortWidth()), behavior: 'smooth'
            })




        },
        scrolltoRight() {


            this.container().scrollBy({
                left: this.getviewPortWidth(), behavior: 'smooth'
            })


        }
        ,
        addautoscroll(){
            
      var scroll = true;
        var container = document.querySelector('#recentcontainer');
    
        container.addEventListener("mouseover", function () {
            scroll = false;

        });
        container.addEventListener("mouseout", function () {
            scroll = true;
        });

        function scrollableamout() {
            let intViewportWidth = window.innerWidth;
            let scrollamout = 0;
            if (intViewportWidth <= 700) {
                scrollamout = 200;
            } else if (intViewportWidth > 700 && intViewportWidth <= 900) {
                scrollamout = 300;
            }
            else if (intViewportWidth > 900) {
                scrollamout = 600;
            }
            return scrollamout;

        }


        function autoscroll() {

            if (container.scrollWidth != container.scrollLeft + container.getBoundingClientRect().width) {
                container.scrollBy({
                    left: scrollableamout(), behavior: 'smooth'
                })
            } else {
                container.scrollTo({
                    left: 0, behavior: 'smooth'
                })
            }

        }
        setInterval(() => {
            if (scroll == true) {
                autoscroll()
            } else { return }
        }, 5000);
      

        }




    },
    watch:{
     
    },

     mounted() {
       
        
      
        this.addautoscroll()
     

        

       
        


      
      



    }
}
</script>

<style >

.scroll-snap-x {
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

.scroll-snap-center {
    scroll-snap-align: center;
}
.scroll-snap-x:hover {
    scroll-snap-type: none;
}




.beforeitems{
    transform: scale(0.5);
    background-color: rgba(100, 99, 94, 0.404);

   
    
    
    transition: all 200ms;
   
}


.whenitems{
    transform: scale(1);
  
}
.continue{
     animation-iteration-count: infinite;
     animation-play-state: running;
    
}

.animate-left-right{
  animation: animate-left-right 1s linear infinite alternate;
 
}

@keyframes animate-left-right{
  0%{
      
       transform: translateX(5px);
  }
  25%{
     transform: translateX(5px);
  }
  50%{
     
        transform: translateX(5px);
  }
  75%{
    
    
      transform: translateX(-5px);
      
      

  }
  100%{
      transform: translateX(0)
    
  }

}




</style>