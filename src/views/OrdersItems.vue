<script setup>
import ItemOrders from '@/components/ItemOrders.vue';
</script>
<template>
    <div class="order">
        <div class="container">
            <h1>Заказы</h1>
            <div class="orders">
                <ItemOrders />
            </div>
        </div>
    </div>
    <router-link to="/"><div class="back-button1">На главную</div></router-link>

</template>
<style>
.back-button1{
    position: fixed;
    right: 20px;
    bottom: 30px;
    color: #5d5d5d;
    background-color: rgb(217, 217, 217);
    padding: 20px;
    font-family: 'Courier New', Courier, monospace, sans-serif;
    font-size: 25px;
    border-radius: 10px;
    transition: 0.2s;
    &:hover{
        transition: 0.2s;
        scale: 1.1;
    }

}
.order{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    height: 88vh;
    .container{
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 100%;
        align-items: center;
        h1{
            background-color: rgb(217, 217, 217);
            font-family: 'Courier New', Courier, monospace, sans-serif;
            font-weight: 400;
            color: #5d5d5d;
            padding: 10px 20px;
            font-size: 35px;
            border-radius: 10px 10px 0 0;
        }
        .orders{
            padding: 20px;
            background-color: rgb(217, 217, 217);
            border-radius: 10px 10px 10px 10px;
            width: 100%;
        }
    }
}
</style>