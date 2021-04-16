<template>
    <ul>
        <li v-for="item in goodsList" :key="item.id" @click="toProductDetail(item.id)">
            <img :src="item.list_pic_url" style="display:block;" width="100%" alt="" />
            <div class="van-ellipsis">{{item.name}}</div>
            <div class="price">{{item.retail_price | RMBformat}}</div>
            <!-- | RMBformat -->
        </li>
    </ul>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    props:["goodsList"],
    methods:{
        toProductDetail(id){
            this.$router.push("/pruductDetail?id="+id);
            setTimeout(()=>{
                this.$router.go(0);
            },10)
        }
    }
}
</script>
 
<style lang = "less" scoped>
ul{
    padding: .1rem 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
        width: 49%;
        margin-bottom: .1rem;
        background: #fff;
        text-align: center;
        line-height: .3rem;
        .price{
            color: darkred;
        }
    }
}
</style>