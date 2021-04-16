<template>
    <div class="product-detail">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in gallery"  :key="item.id">
                <img :src="item.img_url" alt="" width="100%" style="display:block">
            </van-swipe-item>
        </van-swipe>
        <Tips />
        <div class="info">
            <div class="title">{{info.name}}</div>
            <div class="goods_brief">{{info.goods_brief}}</div>  
            <div class="retail_price">{{info.retail_price | RMBformat}}</div>  
        </div>
        <van-cell title="展示弹出层" is-link @click="isSkuShow=true"/>
        <div class="attribute">
            <h3>商品参数</h3>
            <ul>
                <li v-for="(item,key) in attribute" :key="key">
                    <div class="l">{{item.name}}</div>
                    <div class="r van-ellipsis">{{item.value}}</div>
                </li>
            </ul>
        </div>
        <div class="goods_desc" v-html="goods_desc"></div>
        
        <div class="title0">
            <span>常见问题</span>
        </div>
        <ul class="issue">
            <li v-for="item in issue" :key="item.id">
                <h3>{{item.question}}</h3>
                <p>{{item.answer}}</p>
            </li>
        </ul>
        <div class="title0">
            <span>大家都在看</span>
        </div>
        <Products :goodsList="goodsList"/>
        <van-sku
            ref="sku"
            v-model="isSkuShow"
            :sku="sku"
            :goods="goods"
            :hide-stock="sku.hide_stock"
        />
        <AppGoodActive @addToCart="addToCart" :goodsCount="goodsCount"/>

    </div>
</template>

<script>
import {GetGoodsDetailData, GetGoodsRelatedData, GetGoodsCount, AddProductToCart} from "@/request/api"
import Tips from "@/components/Tips"
import Products from "@/components/Products"
import AppGoodActive from "@/components/AppGoodActive"
export default {
    data () {
        return {
            // sku相关数据：
            isSkuShow:false,
            sku:{
                tree:[],
                hide_stock:false,
                price: '0', 
                stock_num: 0,
            },
            goods:{
                picture: ""
            },
            // ---------------------------
            // 轮播图数据
            gallery:[],
            // 商品信息
            info:{},
            // 商品参数
            attribute:[],
            // 商品信息(大量图片信息)
            goods_desc:"",
            // 常见问题
            issue:[],
            // 相关产品列表
            goodsList:[],
            // 购物车产品数量
            goodsCount:0,
            // productList数据
            productList:[]
        }
    },
    components:{
        Tips,AppGoodActive,Products
    },
    created(){
        // console.log(this.$route);
        // 发送请求， 请求这个商品的详情数据
        GetGoodsDetailData({
            id:this.$route.query.id
        }).then(res=>{
            console.log(res.data);
            // this.gallery = res.data.gallery
            let {gallery, info, attribute, issue, productList} = res.data
            this.gallery = gallery
            this.info = info
            this.attribute = attribute
            this.goods_desc = info.goods_desc
            this.issue = issue
            // sku数据：
            this.goods.picture = info.list_pic_url
            this.sku.price = info.retail_price
            this.sku.stock_num = info.goods_number
            // productList数据
            this.productList = productList
        })

        // 发送请求获取相关产品数据(大家都在看模块)
        GetGoodsRelatedData({
            id:this.$route.query.id
        }).then(res=>{
            console.log(res.data);
            this.goodsList = res.data.goodsList
        })

        // 获取购物车产品数量
        GetGoodsCount().then(res=>{
            if(res.errno==0){
                // console.log(res);
                this.goodsCount = res.data.cartTotal.goodsCount
            }
        })
    },
    methods:{
        addToCart(){
            // 如果sku没有展示的情况下，点击购物车按钮， 展示sku
            // 如果sku已经在展示的状态，点击购物车按钮， 加入购物车,跳转到购物车页面
            if(this.isSkuShow){
                // 加入购物车
                console.log("执行加入购物车的操作");

                // 获取要添加的商品的数量
                // this.$refs.sku.getSkuData().selectedNum

                // 发起加入购物车请求
                AddProductToCart({
                    goodsId:this.$route.query.id,
                    productId:this.productList[0].id,
                    number:this.$refs.sku.getSkuData().selectedNum
                }).then(res=>{
                    if(res.errno==0){
                        console.log(res);
                        // 添加到购物车后做两件事情
                        // 1、更新购物车数量
                        this.goodsCount = res.data.cartTotal.goodsCount
                        // 2、跳转到购物车页面
                        this.$toast.success("加入购物车成功");
                        setTimeout(()=>{
                            this.$router.push("/cart")
                        },1500)
                    }
                })


            }else{
                this.isSkuShow=true
            }
        }
    }
}
</script>
 
<style lang = "less" scoped>
.product-detail{margin-bottom: .5rem;}
    .info{
        background-color: #fff;
        text-align: center;
        line-height: .4rem;
        padding: .10rem 0;
        border-bottom: 1px solid #ccc;
        .title{
            font-size:.2rem;
        }
        .retail_price{
            color:darkred;
        }
    }
    .attribute{
        background-color: #fff;
        margin-top: .2rem;
        padding: .1rem .168rem;
        h3{
            font-size:0.1638rem;
            line-height: .5rem;
        }
        li{
            height: .40rem;
            line-height: .40rem;
            background-color: #efefef;
            display: flex;
            margin-bottom: .10rem;
            border-radius:.05rem;
            .l{
                width: 30%;
                text-align: right;
                margin-right: .1rem;
                font-size:.12rem;
            }
            .r{
                flex:1;
                font-size:.168rem;
            }

        }
    }
    /* 深度样式写法，穿透ui组件的样式，直接添加在标签上 */
    /deep/.goods_desc{
        img{
            display: block;
            width: 100%;
        }
    }
.title0 {
  width: 100%;
  background: #fff;
  height: 0.5rem;
  position: relative;
  &::before {
    content: "";
    width: 50%;
    height: 2px;
    background: #ccc;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 50%;
    margin-left: -25%;
  }
  span {
    width: 30%;
    position: relative;
    background: #fff;
    display: block;
    text-align: center;
    margin: 0 auto;
    height: 0.5rem;
    line-height: 0.5rem;
  }
}
.issue {
  padding: 0 4%;
  background: #fff;
  li {
    h3 {
      height: 0.3rem;
      line-height: 0.3rem;
      padding-left: 0.2rem;
      position: relative;
      font-weight: normal;
      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }
    p {
      font-size: 0.12rem;
      line-height: 0.2rem;
      padding-left: 0.2rem;
    }
  }
}
</style>