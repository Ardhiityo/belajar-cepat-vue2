var app = new Vue({
    el: '#app',
    data: {
        maximum: 50,
        products: null,
        cart: []
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
    methods: {
        addItem: function (product) {
            return this.cart.push(product);
        }
    }
})