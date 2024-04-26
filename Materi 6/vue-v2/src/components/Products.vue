<template>
    <div>
        <navbar :cart="cart" :totalQty="totalQty" :totalPrice="totalPrice"></navbar>
        <h1>IDShop</h1>
        <div class="container" :style="{ 'margin-top': '70px' }">
            <price-slider :slider="sliderStatus"></price-slider>
            <product-list :products="products" :maximum="maximum"></product-list>
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
}
</script>