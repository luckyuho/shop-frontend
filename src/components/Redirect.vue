<template>
  <div class="container m-5">

    <h3>重新導向</h3>

  </div>
</template>

<script>
export default {
  name: 'Redirect',
  mounted () {
    const url = window.location.hash
    const token = new URLSearchParams(url.split('?')[1]).get('token')
    console.log('token:', token)

    if (token) {
      // 將 token 存入 cookie
      document.cookie = `hexToken=${token}`
    }

    // 執行 URL 轉址到其他路徑
    window.location.href = '/'
  }
}
</script>
