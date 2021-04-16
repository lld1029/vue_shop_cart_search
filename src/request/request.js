import axios from "axios"


const instance = axios.create({
    baseURL:"http://kumanxuan1.f3322.net:8001",
    timeout:5000
});
// 两种拦截的区别：
// 封装axios拦截器，拦截的是请求，一般用在需要在请求中添加请求信息(例如请求头)
// 路由拦截，拦截的是页面，可以决定用户有没有权利访问某个页面

// 拦截器     技术点
instance.interceptors.request.use(config=>{
    //什么时候执行这个函数？　　　　发请求之前执行这个函数
    // 可以判断用户有没有登录， 如果没有登录，
    // console.log("config:",config);  // 本次请求的一些信息
    let token = localStorage.getItem("token");
    if(token){
        // 携带登录凭证发起请求
        config.headers["X-Nideshop-Token"] = token
    }
    return config
},err=>{

    return Promise.reject(err)
})

instance.interceptors.response.use(res=>{
    //什么时候执行这个函数？　　　　在接收到响应之前，在执行then方法之前
   
    // console.log("res:", res);  // 本次服务器响应的一些信息

    return res.data    // 返回的这个res 被then方法的res形参接收了
},err=>{

    return Promise.reject(err)
})


export default instance