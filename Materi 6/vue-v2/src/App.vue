<template>
  <div id="app">
    <div class="container mt-5">
      <h2>IDShop</h2>
      <product-list :products="products" :maximum="maximum"></product-list>
    </div>
  </div>
</template>

<script>

import Price from './components/Price.vue';
import ProductList from './components/ProductList.vue';

export default {
  name: 'App',
  data: function () {
    return {
      maximum : 50,
      products : []
    }
  },
  mounted: function () {
    fetch('https://hplussport.com/api/products/order/price')
      .then(res => res.json())
      .then(res => {
        this.products = res;
      })
  },
  components: {
    Price,
    ProductList
  }
}
</script>