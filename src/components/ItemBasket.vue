<script setup>
import { useUserStore } from '@/stores/useCounterStores';
import { onMounted } from 'vue';

const store = useUserStore();
store.showCart();

onMounted(store.showCart);
</script>
<template>
    <div class="none" v-if="store.products.length === 0" >Корзина пуста</div>
    <div class="itemBasket" v-for="item in store.uniqueProducts" :key="item.product_id">
        <div class="description">
            <h2>{{ item.name }}</h2>
            {{ item.description }}
            <h3>Стоимость: {{ item.price }} руб</h3>
        </div>
        <div class="control">
            <div class="control-top">
                <button class="minus znak" @click="store.deleteFromCart(item)">-</button>
                <div class="count">
                    {{ item.count }}
                </div>
                <button class="plus znak" @click="store.addToCart(item)">+</button>
            </div>
            <button class="control-bottom" @click="store.deleteAllItems(item)">
                <img class="trash" src="../assets/trash.png" alt="">
            </button>
        </div>
    </div>
</template>
<style>
@import url(../style/basket/itemBasket.scss);
</style>