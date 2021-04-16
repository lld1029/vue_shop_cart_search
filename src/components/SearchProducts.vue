<template>
    <div>
        <van-dropdown-menu>
            <van-dropdown-item disabled title="综合" />
            <van-dropdown-item @change="priceChange" title="价格" v-model="priceVal" :options="option2" />
            <van-dropdown-item @change="categoryChange" title="分类" v-model="categoryVal" :options="filterCategory" />
        </van-dropdown-menu>

        <van-empty v-if="goodsList.length==0" image="search" description="没有您搜索的商品" />
        <Products v-else :goodsList="goodsList"/>
    </div>
    <!-- 
checked: true
value: 0
text: "全部"

checked: false
value: 1005000
text: "居家" -->
</template>

<script>
import Products from "./Products"
export default {
    data () {
        return {
            priceVal: "",
            categoryVal: "",  // 这个的值是哪一项的value，就表示这一项被勾上
            option2: [
                { text: '价格由高到低', value: 'desc' },
                { text: '价格由低到高', value: 'asc' },
            ],
 
        }
    },
    beforeUpdate(){
        // 数据挂载完毕， 遍历filterCategory数组，看看哪一项的checked为true，
        // 遍历的时候 遇到checked为true时，就把  this.categoryVal 改成它的value值，这样这一项就被勾上了
        // setTimeout(()=>{
        this.filterCategory.map(item=>{
            // 如果item的checked为true，就改this.categoryVal
            if(item.checked){
                this.categoryVal=item.value
                return
            }
        })
        // },60)
    },
    props:["filterCategory", "goodsList"],
    components:{
        Products
    },
    methods:{
        categoryChange(value){
            //console.log(value);  // 就是分类id
            this.$emit("categoryChange", value)
        },
        priceChange(value){
            // console.log(value);
            this.$emit("priceChange", value)
        }

    }
}
</script>
 
<style lang = "less" scoped>
    
</style>