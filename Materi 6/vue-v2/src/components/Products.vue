<template>
    <div class="container mt-5">
        <navbar :cart="cart" :totalQty="totalQty" :totalPrice="totalPrice" @toggle-slide="sliderState" @delete="delItem"></navbar>
        <h1>IDShop</h1>
        <div class="container" :style="{ 'margin-top': '70px' }">
            <price-slider :slider="sliderStatus" :maximum.sync="maximum"></price-slider>
            <product-list :products="products" :maximum="maximum" @add="pushItem"></product-list>
        </div>
    </div>
</template>

<script>

import Navbar from './Navbar.vue';
import PriceSlider from './PriceSlider.vue';
import ProductList from './ProductList.vue';

export default {
    name: 'products',
    props: ['cart', 'totalQty', 'totalPrice', 'sliderStatus', 'maximum', 'products'],
    components: {
        Navbar, PriceSlider, ProductList
    },
    methods: {
        sliderState: function () {
            this.$emit('toggle');
        },
        delItem: function (index) {
            this.$emit('deleteItem', index);
        },
        pushItem: function (items) {
            this.$emit('addItem', items);
        }
    }
}
</script>