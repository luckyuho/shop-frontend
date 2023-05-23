<template>
  <div class="container m-5">

    <form @submit.prevent="signin">
    <h3>登入</h3>

    <div class="form-group">
      <label>郵件地址</label>
      <input
      type="text"
      class="form-control form-control-lg"
      v-model="user.name"
      />
    </div>

    <div class="form-group">
      <label>密碼</label>
      <input
      type="password"
      class="form-control form-control-lg"
      v-model="user.password"
      />
    </div>

    <button type="submit" class="btn btn-dark btn-lg btn-block">登入</button>
    <button class="btn btn-dark btn-lg btn-block">
      <router-link to="/register">
      註冊
      </router-link>
    </button>
    </form>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const api = `${process.env.APIPATH}/login`
      const vm = this
      // 將 vm.user 傳送給後端
      axios.post(api, vm.user).then((response) => {
        // 如果驗證成功後端會傳來 token
        const success = response.data.data.success
        if (success === true) {
          console.log('successfully login')
          const token = response.data.data.token
          // 將 token 寫入 Cookie
          document.cookie = `hexToken=${token}`
          vm.$router.push('/')
        } else {
          console.log('wrong name or password')
        }
      })
    }
  }
}
</script>
