<template>
    <div>
        <van-list
            :finished="finished"
            finished-text="没有更多了"
        >
            <van-cell @click="cellClick(item)" v-for="(item,index) in searchTipsListData" :key="index" :title="item" />
        </van-list>
    </div>
</template>

<script>
export default {
    data () {
        return {
            finished: true,
        }
    },
    props:["searchTipsListData"],
    methods:{
        cellClick(val){
            // console.log(val);
            this.$emit("cellClick", val)
        }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>