<template>
  <div id="app">
    <products :cart="cart" :totalQty="totalQty" :totalPrice="totalPrice" :sliderStatus="sliderStatus" :maximum.sync="maximum"
      :products="products" @toggle="slider" @deleteItem="del" @addItem="add"></products>
  </div>
</template>

<script>

import Products from './components/Products.vue';

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
    Products
  },
  computed: {
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
    slider: function () {
      this.sliderStatus = !this.sliderStatus;
    },
    add: function (item) {
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