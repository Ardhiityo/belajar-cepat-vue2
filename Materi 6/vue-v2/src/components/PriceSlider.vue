<template>
    <div class="mb-2" style="margin-top: 70px;">
        <transition name="fade">
            <div v-if="slider">
                <form class="flex-column justify-content-center align-items-center" :class=sliderState>
                    <div class="d-flex mb-3 align-items-center justify-content-center">
                        <label for="max" class="form-label" :style="{ 'font-weight': 'bold' }">Max</label>
                        <input type="number" id="max" v-model="maxAmount" @change="$emit('update:maximum', maxAmount)"
                            class="form-control d-inline-block mx-2 w-25">
                            <input type="range" minlength="5" maxlength="200" v-model="maxAmount" class="w-100"
                            @input="$emit('update:maximum', maxAmount)">
                        </div>
                </form>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'price-slider',
    data: function () {
        return {
            maxAmount: 50
        }
    },
    props: ['slider', 'maximum'],
    computed: {
        sliderState: function () {
            this.slider ? 'd-flex' : 'd-none';
        }
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}
</style>