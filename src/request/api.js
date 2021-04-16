import request from "./request"

// 首页数据的请求
export const GetHomeList = () => request.get("/index/index")

// 获取搜索弹出框的数据
export const GetSearchPopupData = () => request.get("/search/index")


// 获取实时搜索的文本提示的数据列表
// export const GetSearchTipsListData = (xxx) => request.get("/search/helper",{
//     params: xxx     // 这个xxx是一个对象，axios文档上要求的
// })

// export const GetSearchTipsListData = (params) => request.get("/search/helper",{
//     params: params
// })
export const GetSearchTipsListData = params => request.get("/search/helper",{params})

// 获取搜索商品列表的数据
export const GetGoodsListData = params => request.get("/goods/list",{params})

// 清除历史记录
export const ClearHistory = () => request.post("/search/clearhistory")


// 登录请求
export const GoLogin = params => request.post("/auth/loginByWeb",params)

// 商品详情
export const GetGoodsDetailData = params => request.get("/goods/detail",{params})
// 相关产品
export const GetGoodsRelatedData = params => request.get("/goods/related",{params})

// 获取购物车产品数量
export const GetGoodsCount = () => request.get("/cart/goodscount")

// 加入购物车
export const AddProductToCart = params => request.post("/cart/add",params)

// 获取购物车数据
export const GetCartListData = () => request.get("/cart/index")


// 点击切换商品选中状态
export const ChangeGoodChecked = params => request.post("/cart/checked",params)

// 步进器的请求
export const StepperChangeData = params => request.post("/cart/update",params)

// 删除商品
export const DeleteGood = params => request.post("/cart/delete",params)