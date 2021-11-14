<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <div v-if="error" class="error">
      {{error}}
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" v-model="email" placeholder="Email"/>
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password"/>
    </div>

    <button class="btn btn-primary btn-block">Login</button>
  </form>
    </div>
  </div>

</template>
<script>
  import axios from "axios";
  import {bus}  from '../main'
  export default {
    name:'Login',
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods:{
      async handleSubmit(){
        await axios.post('sign-in',{
          email: this.email,
          password: this.password,
        }).then(async (res) => {
          await localStorage.setItem('token',res.data.data.token)
          await localStorage.setItem('user', JSON.stringify(res.data.data))
          bus.$emit('loggedIn',JSON.stringify(res.data.data))
          await this.$router.push('/')
        }).catch(() => {
          this.error = 'wrong cred.'
        })
      }
    }
  }
</script>
<style>
.error{
  color: red;
  background-color: lightcoral;
  padding: 10px;
  border-radius: 3px;
  margin: 10px 0;
}
</style>