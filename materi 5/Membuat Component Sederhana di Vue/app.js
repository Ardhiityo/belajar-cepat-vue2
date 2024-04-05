Vue.component('price', {
    // data: function () {
    //     return {
    //         prefix: 'Rp',
    //         value: 34.02,
    //         precision: 2
    //     }
    // },
    props: {
        prefix: {
            type: String,
            default: 'Rp'
        },
        value: {
            type: Number
        },
        precision: {
            type: Number,
            default: 2
        }
    },
    template: '<span> {{this.prefix + Number.parseFloat(this.value).toFixed(this.precision)}} </span>'
})

Vue.component('product-list', {
    props: ['products', 'maximum'],
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
    },
    template: `<transition-group name="fade" tag="div" @beforeEnter="before" @enter="enter" @leave="leave">
    <div v-for="(items, index) in products" :data-index="index" :key="items.id"
        v-if="items.price < Number(maximum)" class="row d-none align-items-center justify-content-center">
        <div class="col-1 d-flex justify-content-end">
            <button class="btn rounded-1 btn-primary" v-on:click="addItem(items)">+</button>
        </div>
        <div class="col-5 d-flex justify-content-center">
            <img :src="items.image" alt="items.name" class="w-75">
        </div>
        <div class="col-6 d-flex align-items-start justify-content-center flex-column">
            <h2>{{items.name}}</h2>
            <p>{{items.description}}</p>
            <!-- <h3>{{items.price | currencyFormat}}</h3> -->
            <price :value="Number(items.price)" :prefix="'Rp'" :precision="Number(2)"></price>
        </div>
    </div>
</transition-group>`
})

var app = new Vue({
    el: '#app',
    data: {
        maximum: 50,
        products: null,
        cart: [],
        slider: {
            status: true
        }
    },
    mounted: function () {
        fetch('https://hplussport.com/api/products/order/price')
            .then(res => res.json())
            .then(res => {
                this.products = res;
            }).catch(err => {
                console.log(err);
            })
    },
    computed: {
        sliderState: function () {
            return this.slider.status ? 'd-flex' : 'd-none';
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
        del: function (index) {
            if (this.cart[index].qty > 1) {
                return this.cart[index].qty--;
            } else {
                return this.cart.splice(index, 1);
            }
        }
    },
    filters: {
        currencyFormat: function (currency) {
            return `Rp. ${Number.parseFloat((currency)).toFixed(2)}`;
        }
    }
})