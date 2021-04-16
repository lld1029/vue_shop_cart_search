<template>
    <div>
        <van-row @click="openModal">
            <van-col span="6">
                <img :src="avatarSrc" alt />
            </van-col>
            <van-col span="15">{{nickname}}</van-col>
            <van-col span="3">
                <van-icon name="arrow" />
            </van-col>
        </van-row>
        <van-grid :column-num="3" square>
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
        <transition name="van-fade">
            <div class="login-modal" v-show="isShowModal">
                <div class="close-modal" @click="isShowModal=!isShowModal"></div>
                <van-form @submit="onSubmit" class="login-form">
                    <van-field
                        v-model="username"
                        name="用户名"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">
                        提交
                        </van-button>
                    </div>
                </van-form>
            </div>
        </transition>
    </div>
</template>

<script>
import {GoLogin} from "@/request/api"
export default {
    data () {
        return {
            avatarSrc:require("../assets/avatar.png"),
            username: '',
            password: '',
            isShowModal:false,
            nickname:"用户登录"
        }
    },
    created(){
        // 组件刚创建的时候需要判断用户有没有登录，获取localStorage有没有token值，
        // 如果有token，就表示登录，就应该填上用户信息
        let token = localStorage.getItem("token");
        if(token){
            // 表示已经有登录状态，就要网页面上渲染用户信息
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.nickname = userInfo.nickname
            this.avatarSrc = userInfo.avatar
        }

    },
    methods:{
        onSubmit(values) {
            // console.log('username', values["用户名"]);
            // console.log('pwd', values["密码"]);

            let username = values["用户名"]
            let pwd = values["密码"]
            GoLogin({username,pwd})
            .then(res=>{
                // let _this = this
                if(res.errno == 0){
                    console.log(res.data);
                    // 登录成功了
                    // 登录的业务逻辑
                    // 1、提示框提示登录成功
                    this.$toast.success('登录成功');
                    // 2、把token保存到本地存储
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
                    // 3、1s后关闭模态窗口
                    setTimeout(()=>{
                        this.isShowModal = !this.isShowModal
                        // 4、把拿到的userInfo用户信息，填写到页面上
                        this.nickname = res.data.userInfo.nickname
                        this.avatarSrc = res.data.userInfo.avatar
                    },1000)
                    
                }
            })
        },
        openModal(){
            // 判断用户是否登录，如果登录直接就return，没有登录就isShowModal取反
            let token = localStorage.getItem("token")
            if(token){
                return
            }
            this.isShowModal = !this.isShowModal
        }
    }
}
</script>
 
<style lang = "less" scoped>
.login-modal{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99; 
    .login-form{
        width: 90%;
        background-color: #fff;
        padding-bottom: .2rem;
        position: absolute;
        left: 50%;
        top: 35%;
        margin-left: -45%;
    } 
    .close-modal{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
    } 
}
.van-row {
  padding: 0.2rem 4%;
  background: #333;
  color: #fff;
  .van-col {
    line-height: 0.7rem;
    font-size: 0.18rem;
    img {
      width: 0.7rem;
      border-radius: 50%;
      display: block;
    }
    &:last-child {
      text-align: right;
    }
  }
}
</style>