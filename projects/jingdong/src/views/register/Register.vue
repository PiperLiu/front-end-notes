<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      >
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入密码"
        type="password"
        autocomplete="new-password"
        v-model="password"
      >
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="确认密码"
        type="password"
        autocomplete="new-password"
        v-model="ensurement"
      >
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginCLick">已有账号去登陆</div>
  </div>
  <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        pastword: data.password
      })
      // console.log(result)
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
        console.log('?')
      }
    } catch (e) {
      showToast('注册失败')
    }
  }

  const { username, password, ensurement } = toRefs(data)
  return { username, password, ensurement, handleRegister }
}

const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginCLick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginCLick }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginCLick } = useLoginEffect()
    return {
      username,
      password,
      ensurement,
      handleRegister,
      show,
      toastMessage,
      handleLoginCLick
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }
  &__input {
    // box-sizing: border-box;
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, .10);
    border-radius: 6px;
    &__content {
      line-height: .48rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__register-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    color: $bgColor;
    font-size: .16rem;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
