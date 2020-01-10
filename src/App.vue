<template>
  <div id="app">
    <ul> <li> <router-link to="/">Home</router-link></li>
    <li v-if="!authenticated"> <router-link to="/signIn">Sign in as Admin</router-link></li>
     <li> <router-link v-if="authenticated" to="/admin">Settings</router-link></li>
    <li> <router-link v-if="authenticated" to="/" @click.native="setAuthenticate(false)">Sign out</router-link></li></ul>
    <img alt="Icon" src="./assets/icon.png"   style="width: 10%;
         height: auto;" >
    <router-view @authenticated="setAuthenticate"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      authenticated: false
  }},
  methods: {
    setAuthenticate(status){
      this.authenticated = status;
    }
  }
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

.error {
  color: red;
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
