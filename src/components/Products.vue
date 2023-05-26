<template>
  <div>
    <div v-for="product in products" :key="product.id">
      <img :src="product.image" :alt="product.name" class="image"/>
      <h3>商品名稱: {{ product.name }}</h3>
      <p>價格: {{ product.price }}</p>
      <button v-if="product.status" @click="purchaseItem(product.id)">購買</button>
      <button v-else disabled>不可購買</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Products',
  data () {
    return {
      products: []
    }
  },
  mounted () {
    // 模擬從 API 取得商品資料的過程
    this.fetchProducts()
  },
  methods: {
    async fetchProducts () {
      axios.get('http://localhost:9432/api/v1/products')
        .then(response => {
          console.log(response.data.data)
          this.products = response.data.data
        }).catch(error => {
          // 處理錯誤
          console.error(error)
        })
    },
    purchaseItem (id) {
      this.getMerchantDataAndConnectVisa(id)
      // postBackendSql(id)
    },
    async getMerchantDataAndConnectVisa (id) {
      const data = { id }
      console.log('connectVisa data = ', data)
      try {
        // this.connectVisa(merchantData)
        this.$router.push({path: '/product', query: { orderId: id }})
      } catch (error) {
        // 處理錯誤
        console.log(error)
      }
    }
    // async connectVisa (merchantData) {
    //   try {
    //     await axios.post('https://ccore.newebpay.com/MPG/mpg_gateway', merchantData, {
    //       headers: {
    //         // remove headers
    //         'Content-Type': 'multipart/form-data'
    //       }
    //     })
    //     // 處理第二個 POST 請求的回應
    //   } catch (error) {
    //     // 處理錯誤
    //     console.log(error)
    //   }
    // },
    // postBackendSql (id) {
    //   const data = { id }
    //   console.log('postBackendSql data = ', data)
    //   axios.post('http://localhost:9432/api/v1/purchase', data)
    //     .then(response => {
    //       console.log(response.data.data)
    //     }).catch(error => {
    //       // 處理錯誤
    //       console.error(error)
    //     })

    //   // 重新整理
    //   window.location.href = '/'
    // }
  }
}
</script>

<style scoped>
.image {
  width: 200px; /* 設定寬度 */
  height: auto; /* 保持原始高度比例 */
}
</style>
