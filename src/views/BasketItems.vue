<script setup>
import ItemBasket from '@/components/ItemBasket.vue';
import { useUserStore } from '@/stores/useCounterStores';

const store = useUserStore();
</script>
<template>
    <div class="basket">
        <div class="basket-container">
            <h1>Корзина товаров</h1>
            <div class="baskets">
                <ItemBasket /> 
            </div>
        </div>
    </div>
    <router-link to="/"><div class="back-button">На главную</div></router-link>
    <button class="getOrder" @click="store.getOrder()">Оформить заказ</button>
    
</template>
<style>
@import url(../style/basket/basketItems.scss);
</style>