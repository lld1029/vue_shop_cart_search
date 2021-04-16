<template>
    <div class="search-popup">
        <van-search
            v-model="searchVal"
            show-action
            :placeholder="placeholderVal"
            @search="onSearch"
            @cancel="onCancel"
            @input="onInput"    
        />
    <!-- @input="onInput" 表示输入框内容发生变化的时候触发onInput这个事件函数 -->
        <HistoryHot 
            v-if="blockShow==1"  
            :historyListData="historyListData"
            :hotKeywordListData="hotKeywordListData"
            @tagClick="tagClick"
        />
        <SearchTipsList 
            v-else-if="blockShow==2"  
            :searchTipsListData="searchTipsListData"
            @cellClick="tagClick"
        />
        <SearchProducts v-else
            :filterCategory="filterCategory"
            :goodsList="goodsList"
            @categoryChange="categoryChange"
            @priceChange="priceChange"
        />
        <!-- <comp1 v-if="blockShow==1"></comp1>   
        <comp2 v-else-if="blockShow==2"></comp2>   
        <comp3 v-else></comp3>    -->
    </div>
</template>
<script>
import HistoryHot from "@/components/HistoryHot" 
import SearchTipsList from "@/components/SearchTipsList" 
import SearchProducts from "@/components/SearchProducts" 
import {GetSearchPopupData, GetSearchTipsListData, GetGoodsListData} from "@/request/api"
export default {
    data () {
        return {
            // 搜索的文字，也就是用户输入的文本
            searchVal:"",
            // 占位符文本
            placeholderVal:"",
            // blockShow值可以为1或2或3
            // 为1，表示展示历史记录和热门搜索
            // 为2，表示展示搜索提示的列表
            // 为3，表示展示搜索的产品的内容
            blockShow:1,
            // 历史记录的列表数据
            historyListData:[],
            // 热门搜索列表数据
            hotKeywordListData:[],
            // 搜索实时提示的列表数据
            searchTipsListData:[],
            // 搜索产品内容的分类数据
            filterCategory:[],
            // 搜索产品内容的列表数据
            goodsList:[],
            // 价格排序：(由高到低或者由低到高)
            order:"desc",
            // 分类id
            categoryId:0,
            // 搜索方式  是id 还是price
            sort:"id"
        }
    },
    created(){
        

        GetSearchPopupData().then(res=>{
 
            if(res.errno==0){
                // console.log(res.data);
                this.placeholderVal = res.data.defaultKeyword.keyword
                this.historyListData = res.data.historyKeywordList
                this.hotKeywordListData = res.data.hotKeywordList
            }
            
        })


    },
    methods: {
        tagClick(val){
            // 改变上面搜索框的值，后面再给价格排序的时候调用到priceChange()的时候传入的就是这次点击的这个值
            this.searchVal = val
            this.onSearch(val)
        },
        priceChange(value){  // value是desc或者asc
            this.order = value
            this.sort = "price"
            this.onSearch(this.searchVal)
        },
        categoryChange(value){
            // 改id
            this.categoryId = value
            // 发送搜索商品的请求
            this.onSearch(this.searchVal)
        },
        onSearch(val) { //onSearch用户回车搜索的时候执行，val就是用户输入的值
            // console.log("onSearch什么时候执行",val);
            this.blockShow = 3;

            GetGoodsListData({
                keyword:val,
                page:1,
                size:10,
                order:this.order,
                categoryId:this.categoryId,
                sort:this.sort
            }).then(res=>{
                if(res.errno==0){
                    // console.log(res.data);
                    // filterCategory  
                    // goodsList
                    // this.filterCategory = res.data.filterCategory
                    // this.goodsList = res.data.goodsList
                    let {filterCategory, goodsList} = res.data;
                   
                    this.goodsList = goodsList
                    
                    let newArr = JSON.parse(JSON.stringify(filterCategory).replace(/name/g, 'text').replace(/id/g, 'value'))
                    // console.log(newArr);
                    this.filterCategory = newArr
                }

            })
        },
        onCancel() {
            // console.log("onCancel");
            // this.$router.push("/home")
            this.$router.go(-1);
            this.$store.commit("changeIsShowPopupShadow", false);
        },
        onInput(val){
            this.blockShow = 2;
            // console.log(val);
            // 发送请求，获取实时搜索的文本提示的数据列表
            GetSearchTipsListData({keyword:val}).then(res=>{
                if(res.errno == 0){
                    this.searchTipsListData = res.data
                }
            })
        }
    },
    components:{
        HistoryHot,
        SearchTipsList,
        SearchProducts
    }
}
</script>
 
<style lang = "less" scoped>
.search-popup{
    width: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    /* background-color: rgba(0,0,0,.5);     */
    background-color:#efefef;    
    z-index: 99;
}
</style>