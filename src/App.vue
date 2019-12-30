<template>
  <div id="app">
    <ul> <li> <router-link to="/">Home</router-link></li>
    <li> <router-link to="/signup">SignUp</router-link></li>
     <li> <router-link to="/admin">Admin</router-link></li></ul>
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
}
body {
  background-color: black;
}
input, select{
  color: lightgray;
  background-color: #2d2d2d;
  border-radius: 4px;}
button{
  background-color:#2d2d2d;
  color: lightgray;
  border-radius: 4px;
  border-color: black;
}
button:hover{
  background-color:black;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
</style>
