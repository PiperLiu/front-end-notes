<template>
<div class="wrapper">
  <div class="search">
    <div
      class="search__back iconfont"
      @click="handleBackClick"
    >&#xe677;</div>
    <div class="search__content">
      <span class="search__content__icon iconfont">&#xe671;</span>
      <input
        class="search__content__input"
        placeholder="请输入商品名称"
      >
    </div>
  </div>
  <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
  <Content :shopName="item.name" />
  <Cart />
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemdata = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  // 这里存在一个错误需要解决
  // console.log(item.value) // ObjectRefImpl{_object: Proxy, _key: "item", __v_isRef: true}
  // console.log(item.value) // Proxy{}
  // console.log(item.value.name) // undefined
  return { item, getItemdata }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { item, getItemdata } = useShopInfoEffect()
    const { handleBackClick } = useBackRouterEffect()
    getItemdata()
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  padding: 0 .18rem;
}
.search {
  display: flex;
  margin: .14rem 0 .04rem 0;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #b6b6b6;
  }
  &__content {
    display: flex;
    flex:1;
    background: $search-bgColor;
    border-radius: .16rem;
    &__icon {
      width: .44rem;
      text-align: center;
      color: $search-fontolor;
    }
    &__input {
      display: block;
      width: 100%;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      height: .32rem;
      font-size: .14rem;
      color: $content-fontcolor;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
