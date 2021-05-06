<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back">&#xe677;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">
          北京理工大学国防科技园2号楼10层
        </div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">瑶妹（先生）</span>
          <span class="top__receiver__info__name">13802324145</span>
        </div>
        <div class="iconfont top__receiver__icon">&#xe677;</div>
      </div>
    </div>
    <!-- 这里开始修改 课上到 12-3 1:50秒 -->
    <div class="products">
      <div class="products__title">
        <div class="products__list">
          <div class="product">
            <div
              class="product__item"
              v-for="(item, index) in list"
              :key="index"
            >
              <img :src="item.imgUrl" class="product__item__img" />
              <div class="product__item__detail">
                <h4 class="product__item__title">{{ item.name }}</h4>
                <p class="product__item__sales">月售 {{ item.sales }} 件</p>
                <p class="product__item__price">
                  <span class="product__item__yen">&yen;</span>{{ item.price }}
                  <span class="product__item__origin"
                    >&yen;{{ item.oldPrice }}</span
                  >
                </p>
              </div>
              <div class="product__number">
                <span
                  class="product__number__minus"
                  @click="
                    () => {
                      changeCartItem(shopId, item._id, item, -1, shopName);
                    }
                  "
                  >-</span
                >
                <!-- 不要在 dom 中有过长的逻辑，因此封装 -->
                {{ getProductCartCount(shopId, item._id) }}
                <span
                  class="product__number__plus"
                  @click="
                    () => {
                      changeCartItem(shopId, item._id, item, 1, shopName);
                    }
                  "
                  >+</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirmation'
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #eee;
}
.top {
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  &__header {
    position: relative;
    padding-top: 0.26rem;
    line-height: 0.24rem;
    color: #fff;
    text-align: center;
    font-size: 0.16rem;
    &__back {
      position: absolute;
      left: 0.18rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: #fff;
    border-radius: 0.04rem;
    &__title {
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.16rem;
      color: #333;
    }
    &__address {
      line-height: 0.2rem;
      padding: 0 0.4rem 0 0.16rem;
      font-size: 0.14rem;
      color: #333a;
    }
    &__info {
      padding: 0.06rem 0 0 0.16rem;
      &__name {
        line-height: 0.18rem;
        font-size: 0.12rem;
        color: #666;
      }
    }
    &__icon {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.5rem;
      color: #666;
      font-size: 0.16rem;
    }
  }
}
</style>
