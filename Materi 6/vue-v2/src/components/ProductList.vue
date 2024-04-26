<template>
    <transition-group name="fade" tag="div" @beforeEnter="before" @enter="enter" @leave="leave">
        <div v-for="(items, index) in showItem" :data-index="index" :key="items.id"
            class="row align-items-center justify-content-center">
            <div class="col-1 d-flex justify-content-end">
                <button class="btn rounded-1 btn-primary" @click="$parent.$emit('add-items', items)">+</button>
            </div>
            <div class="col-5 d-flex justify-content-center">
                <img :src="items.image" alt="items.name" class="w-75">
            </div>
            <div class="col-6 d-flex align-items-start justify-content-center flex-column">
                <h2>{{ items.name }}</h2>
                <p>{{ items.description }}</p>
                <price :value="Number(items.price)"></price>
            </div>
        </div>
    </transition-group>
</template>

<script>

import Price from './Price.vue';

export default {
    name: 'product-list',
    components: {
        Price
    },
    props: ['products', 'maximum'],
    computed: {
        showItem: function () {
            let max = this.maximum;
            return this.products.filter(function(item) {
				return Math.trunc(item.price) <= max;
			});
        }
    },
    methods: {
        before: function (el) {
            el.className = 'd-none';
        },
        enter: function (el) {
            let delay = el.dataset.index * 100;
            setTimeout(() => {
                el.className = 'row d-flex align-items-center justify-content-center animate__animated animate__slideInRight';
            }, delay);
        },
        leave: function (el) {
            let delay = el.dataset.index * 100;
            setTimeout(() => {
                el.className = 'row d-flex align-items-center justify-content-center animate__animated animate__slideOutRight';
            }, delay);
        },
    }
}
</script>