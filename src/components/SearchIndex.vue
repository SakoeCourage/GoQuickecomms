<template>
    <div
                    v-show="show_search_index && search_indexes && currentvalue && show_at_route_change"
                    class="  min-h-max bg-gray-50 dark:bg-slate-600/90  border-gray-300 border-2 absolute z-30 mt-1 rounded-md text-sm shadow-md overflow-hidden"
                    id="search_index"
                >
                    <div v-if="loading_index" class="sticky top-0 w-full bg-transparent">
                        <div
                            class="absolute rounded-md top-0 transform bg-orange-300 h-1 w-1/2 z-50 move"
                        ></div>
                    </div>
                    <ul class="w-full my-2">
                        <li
                            v-for="(item,i) in index_list"
                            :key="i"
                            @click="searchitem(item.item_name,item.category)"
                            class="my-1 p-2 px-5 w-full text-gray-400 dark:text-gray-100 hover:text-gray-500 hover:bg-orange-100 dark:hover:bg-slate-400/50 dark:hover:text-gray-50 cursor-pointer"
                        >
                            {{item.item_name}}&nbsp;in&nbsp;
                            <b
                                class="text-gray-500 dark:text-gray-200"
                            >{{ item.subcategory  ?? item.category }}</b>
                        </li>
                    </ul>
                </div>


</template>

<script>


    export default{
            props: ['show_search_index','search_indexes','currentvalue','show_at_route_change','loading_index'],

        data(){
            return{
                index_list: []
            }
        },
        computed:{
                numberofwords(){
                    return this.currentvalue.split(' ')
                }

        },

        methods:{
            searchitem(item_name,category){
                 document.querySelector('#mini_search').value = item_name
                this.$store.commit('setrouteParams_search', item_name)
                this.$store.commit('setrouteParams_category',category)
              
                this.$emit('searchitem',category)
            }

               
        },

    watch:{
   
        search_indexes(){
            console.log(this.search_indexes)
            this.index_list = []
            var enteredvalue = (this.currentvalue.toLowerCase()).split(' ')
          

                     this.search_indexes.forEach(element => {
                         var individual_words = ((element.item_name).toLowerCase()).split(' ') 
                          var get_continuous_word = function(current_index){
                                        var items = []
                                    for (let index = current_index; index < individual_words.length; index++) {
                                        
                                        items.push(individual_words[index])
                                        
                                    }
                                    return items
                            } 
               
     
                     individual_words.forEach((words,i) =>{
                       
                       

                        if(words.includes(enteredvalue[0])){
         
                            this.index_list.push({
                                item_name : get_continuous_word(i).join(' '),
                                category : element.category.category,
                                subcategory: element.subcategory && element.subcategory.subcategory_name

                            })
                        
                            
                           
                        }
                })
            
           });
         
        }        

    }



    }
    

</script>