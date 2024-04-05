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
        }
    },
    methods: {
        addItem: function (product) {
            return this.cart.push(product);
        },
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
        }
    }
})