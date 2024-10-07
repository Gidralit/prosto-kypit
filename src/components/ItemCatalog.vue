<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/useCounterStores';

const userStore = useUserStore();

userStore.loadCatalog();

onMounted(userStore.loadCatalog);

const addToCart = (product) => {

    console.log(product)
    userStore.addToCart(product);
    if(userStore.error){
        alert(userStore.error);
        userStore.error = null;
        console.log(userStore.error);
    }
}
</script>
<template>
    <div class="item" v-for="product in userStore.productsCatalog" :key="product.product_id">
        <div class="image">
            <img :src="'http://lifestealer86.ru/' + product.image" alt="image">
        </div>
        <div class="description">
            <h2 class="name">{{ product.name }}</h2>
            <p class="product_description">{{ product.description }}</p>
            <p class="price">{{ product.price }}</p>
        </div>
        <button @click="addToCart(product)">В корзину</button>
    </div>
</template>
<style>
@import url(../style/catalog/itemCatalog.scss);
</style>