<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">Product</router-link>
      <div class="">
        <ul class="navbar-nav ml-auto" v-if="!name">

          <li class="'nav-item">
            <router-link to="/login" class="nav-link ">login</router-link>
          </li>
          <li class="'nav-item">
            <router-link to="/registration" class="nav-link ">sign up</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto" v-if="name">
          <li class="'nav-item">
            <router-link to="/cart" class="nav-link" v-if="user.role === 'USER'">Cart</router-link>
          </li>
        <li class="'nav-item">
          <a href="javascript:void(0)" @click="handleLogout" class="nav-link ">logout</a>
        </li>
        </ul>
      </div>
    </div>
  </nav>

</template>
<script>
import {bus}  from '../main'
export default {
  name: 'Nav',
  data() {
    return{
      user: null,
      name: ''
    }
  },
  created() {
    bus.$on('loggedIn', (data) => {
      if(data && JSON.parse(data).name) {
        this.name = JSON.parse(data).name
        this.user = JSON.parse(data)
      }
    })
    if(!this.name){
      if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).name) {
        this.user = JSON.parse(localStorage.getItem('user'))
        this.name = JSON.parse(localStorage.getItem('user')).name
      }
    }
  },
  methods:{
    handleLogout(){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
      this.name = ''
      this.user = null
    }
  },
}
</script>