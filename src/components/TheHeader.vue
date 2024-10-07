<script setup>
import { useUserStore } from '@/stores/useCounterStores';

const store = useUserStore();
const logout = () => {
    store.logoutUser();
}

</script>
<template>
    <header>
        <div class="header__top">
            <div class="header__top-content">
                <h1><router-link to="/">Просто купить</router-link></h1>
                <span v-if="store.token === null"><router-link to="/register">Регистрация</router-link>/<router-link to="/login">Вход</router-link></span>
                <div v-else class="profile">
                    <span>{{ store.email }}</span>
                    <button @click="logout()">Выход</button>
                </div>
            </div>
        </div>
        <div class="header__bottom">
            <div class="header__bottom-content">
                <router-link to="/" >Каталог</router-link>
                <router-link to="/basket" v-if="store.token">Корзина {{ store.count }}</router-link>
                <router-link to="/orders" v-if="store.token">Заказы</router-link>
            </div>
        </div>
    </header>
</template>
<style>
    @import url(../style/header/header.scss);
</style>