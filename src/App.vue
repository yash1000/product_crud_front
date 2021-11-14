<template>
  <div id="app">
    <Nav />
        <router-view />
      </div>
</template>

<script>
import  Nav from './components/Nav.vue'
export default {
  name: 'App',
  components:{
    Nav
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body{
  background: #1c8EF9 !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}
body, html, #app, .auth-wrapper{
  width: 100%;
  height: 100%;
}
#app{
  text-align: center;
}
.navbar-light{
  background-color: #ffffff;
  box-shadow: 0 14px 80px rgba(34,35,58,0.2);
}
.auth-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner{
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0 14px 80px rgba(34,35,58,0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}
.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}
.auth-wrapper h3{
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}
.custom-control-label{
  font-weight: 400;
}
</style>
