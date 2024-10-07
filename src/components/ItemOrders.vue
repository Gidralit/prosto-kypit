<script setup>
import { useUserStore } from '@/stores/useCounterStores';
import { onMounted } from 'vue';

const store = useUserStore();


store.watchOrders();

onMounted(store.watchOrders);
</script>
<template>
    <div class="none-message" v-if="store.ordersProducts.length === 0">Ранее вы не делали заказов</div>
    <div class="container-items" v-for="item, index in store.ordersProducts" :key="item">
        <h1>Заказ № {{ index +1 }}</h1>
        <div class="products">
            Товары в заказе:
            <p v-for="product in store.showNames(item)" :key="product">
                {{ product.name }}
            </p>
        </div>
        <p class="price">Стоимость заказа: {{ item.order_price }}</p>
    </div>
</template>
<style>
.none-message{
    font-family: 'Courier New', Courier, monospace, sans-serif;
    font-size: 30px;
    color: #5d5d5d;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.container-items{
    width: 100%;
    font-family: 'Courier New', Courier, monospace, sans-serif;
    color: #5d5d5d; 
    border-bottom: 1px solid black;
    line-height: 50px;
    font-size: 30px;
    .price{
        font-weight: 800;
    }
}
.container-items *:not(h1){
    text-align: end;
    display: flex;
    flex-direction: column;
}

</style>