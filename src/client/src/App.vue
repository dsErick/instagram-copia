<template>
  <div id="app">
    <Router-view :key="$route.name + ($route.params.user || $route.params.id || '')" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  color: #000;
}
</style>
