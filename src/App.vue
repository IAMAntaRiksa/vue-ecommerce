<script setup>
import FooterVue from "./components/Footer.vue";
import HeaderVue from "./components/Header.vue";

</script>

<template>
  <HeaderVue />
  <RouterView />
  <FooterVue />
</template>

<style>
@import '@/assets/css/styles.css';
</style>
