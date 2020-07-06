<template>
  <div id="app">
    <transition name="van-slide-right" mode="out-in">
    <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
</style>
