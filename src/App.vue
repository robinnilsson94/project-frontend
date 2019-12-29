<template>
  <div id="app">
    <ul> <li> <router-link to="/">Home</router-link></li></ul>
    <ul> <li> <router-link to="/signup">SignUp</router-link></li></ul>
    <img alt="Icon" src="./assets/icon.png"   style="width: 10%;
         height: auto;" >
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
body {
  background-color: black;
}
</style>
