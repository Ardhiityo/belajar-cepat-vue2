<template>
    <nav class="navbar fixed-top">
        <div class="container d-flex justify-content-end">
            <button class="btn btn-sm btn-primary rounded-1" @click="$emit('toggle-slide')">
                <i class="fa-solid fa-dollar-sign"></i>
            </button>
            <div v-if="cart.length > 0" class="d-flex">
                <div class="dropdown mx-2">
                    <button class="btn btn-sm btn-primary rounded-1 dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="h1 badge text-bg-primary mx-1 my-auto">
                            {{ totalQty }}
                        </span>
                        <i class="fas fa-shopping-cart mx-2"></i>
                        {{ totalPrice | currencyFormat }}
                    </button>

                    <div class="dropdown-menu">
                        <div class="d-flex justify-content-center flex-column px-2">
                            <div v-for="(item, index) in cart" :key="index" class="my-2">
                                <h6 class="fw-bold m-0">
                                    <span class="badge text-bg-primary">
                                        {{ item.qty }}
                                    </span>
                                    <span class="mx-1">{{ item.product.name }}</span>
                                </h6>
                                <button class="badge text-bg-danger border-0" @click.stop="$emit('delete', index)">-</button>
                                {{ item.qty * item.product.price | currencyFormat }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
    props: ['cart', 'totalQty', 'totalPrice'],
    filters: {
        currencyFormat: function (currency) {
            return `Rp. ${Number.parseFloat((currency)).toFixed(2)}`;
        }
    },
}
</script>