<template>
  <div id="app">
    <div class="container mt-5">
      <navbar @toggle="slider" :cart="cart" :totalQty="totalQty" :totalPrice="totalPrice" @deleteItem="del"></navbar>
      <h1>IDShop</h1>
      <div class="container" :style="{ 'margin-top': '70px' }">
        <price-slider :slider="sliderStatus" :maximum.sync="maximum"></price-slider>
        <product-list :products="products" :maximum="maximum" @add="addItem"></product-list>
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue';
import PriceSlider from './components/PriceSlider.vue';
import ProductList from './components/ProductList.vue';

export default {
  name: 'App',
  data: function () {
    return {
      maximum: 50,
      products: [],
      cart: [],
      sliderStatus: true
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
    ProductList,
    PriceSlider,
    Navbar
  },
  computed: {
    slide: function () {
      this.sliderStatus = !this.sliderStatus;
    },
    totalQty: function () {
      let properties = 0;
      for (const key in this.cart) {
        properties += this.cart[key].qty;
      }
      return properties;
    },
    totalPrice: function () {
      let price = 0;
      for (const key in this.cart) {
        price += this.cart[key].product.price * this.cart[key].qty;
      }
      return price;
    }
  },
  methods: {
    addItem: function (item) {
      let indexItem;
      let indicator = this.cart.filter(function (items, index) {
        if (items.product.id === item.id) {
          indexItem = index;
          return true;
        } else {
          return false;
        }
      });
      if (indicator.length) {
        this.cart[indexItem].qty++;
      } else {
        this.cart.push({
          product: item,
          qty: 1
        });
      }
    },
    slider: function () {
      return this.sliderStatus = !this.sliderStatus;
    },
    del: function (index) {
      if (this.cart[index].qty > 1) {
        return this.cart[index].qty--;
      } else {
        return this.cart.splice(index, 1);
      }
    }
  }
}
</script>