<script setup>
import ItemCatalog from '@/components/ItemCatalog.vue';



</script>
<template>
    <div class="catalog">
        <div class="catalog-container">
            <h1>Каталог</h1>
            <div class="catalog__items">
                <ItemCatalog />
            </div>
        </div>
    </div>
</template>
<style>
@import url(../style/catalog/productCatalog.scss);
</style>
