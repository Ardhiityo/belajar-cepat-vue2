<template>
    <div class="container">
        <table class="table" v-if="cart.length > 0">
            <thead>
                <tr class="text-center">
                    <th scope="col">Action</th>
                    <th scope="col">Products</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Sub-total</th>
                </tr>
            </thead>
            <tbody v-for="(items, index) in cart" :key="items.product.id">
                <tr class="text-center">
                    <td scope="row">
                        <div class="btn-group">
                            <button @click="$emit('delete', index)" class="btn btn-outline-danger">-</button>
                            <button @click="$emit('add-items', items.product)" class="btn btn-primary">+</button>
                        </div>
                    </td>
                    <td scope="row">{{ items.product.name }}</td>
                    <td scope="row">
                        {{ items.qty }}
                    </td>
                    <td scope="row">
                        {{ items.product.price | currencyFormat }}
                    </td>
                    <td scope="row">
                        {{ items.qty * items.product.price | currencyFormat }}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="text-center">
                    <td>
                        <router-link to="/" class="btn btn-outline-primary rounded-1">Back</router-link>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <h5>Total: <br>
                            <price :value="Number(totalPrice)"></price>
                        </h5>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>

import Price from './Price.vue';

export default {
    name: 'checkout',
    props: ['cart', 'totalPrice'],
    components: {
        Price
    },
    filters: {
        currencyFormat: function (currency) {
            return `Rp. ${Number.parseFloat((currency)).toFixed(2)}`;
        }
    },
}
</script>