<template>
  <div class="container">
    <div class="order-confirm-title text-center mt-5">
      <h1>Confirm Payment for Order #{{ $route.query.orderId }}</h1>
    </div>
    <div class="order-confirm-body d-flex flex-column align-items-center mt-4"
      style="background: #ffdcdf;border-radius: 8px;">
      <ul class="order-confirm-detail list-group mt-5 mb-3 px-3">
        <li class="list-group-item">Order Number: {{ $route.query.orderId }}</li>
        <li class="list-group-item">Total Amount: {{ this.apiData.MerchantID }}</li>
        <li class="list-group-item">Shipping Address: {{ this.apiData.Version }}</li>
      </ul>
      <form name="newebpay" :action="apiData.VisaURL" method="POST">
        <input type="text" name="MerchantID" :value="apiData.MerchantID" hidden>
        <input type="text" name="TradeInfo" :value="apiData.TradeInfo" hidden>
        <input type="text" name="TradeSha" :value="apiData.TradeSha" hidden>
        <input type="text" name="Version" :value="apiData.Version" hidden>
        <a href="/" class="btn btn-outline-danger my-3 me-2">Back</a>
        <button type="submit" class="btn btn-danger my-3">Pay</button>
      </form>
    </div>

  </div>
</template>

<script>
import authApi from '@/directive/authApi'

export default {
  name: 'Product',
  data () {
    return {
      apiData: {
        TradeInfo: '0',
        Version: '0'
      },
      formData: {
        // 表单字段
      },
      isLoading: false // 控制加载状态
    }
  },
  mounted () {
    // 模擬從 API 取得商品資料的過程
    const id = this.$route.query.orderId
    this.postBackendSql(id)
  },
  methods: {
    async postBackendSql (id) {
      this.isLoading = true // 设置加载状态为 true
      const data = { id: id }
      await authApi.post('v1/visa', data)
        .then(response => {
          this.apiData = response.data.data
          this.isLoading = false // 设置加载状态为 false
          console.log('this.apiData:', this.apiData)
        })
        .catch(error => {
          console.error(error)
          this.isLoading = false // 设置加载状态为 false
        })
    }
  }
}
</script>

<style scoped>
.image {
  width: 200px; /* 設定寬度 */
  height: auto; /* 保持原始高度比例 */
}
</style>
