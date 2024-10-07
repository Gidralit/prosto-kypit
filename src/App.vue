<script setup>
import TheHeader from './components/TheHeader.vue';

</script>
<template>
  <TheHeader />
  <main>
    <router-view />
  </main>
</template>
<style>
*{
  margin: 0;
  padding: 0; 
  box-sizing: border-box;
}
</style>