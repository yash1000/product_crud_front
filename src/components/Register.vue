<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
  <form @submit.prevent="handleSubmit">
    <h3>Register</h3>

    <div class="form-group">
      <label>Name</label>
      <input class="form-control" v-model="name" placeholder="Name"/>
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" v-model="email" placeholder="Email"/>
    </div>

    <div class="form-group">
      <label>Role</label>
      <select class="form-control" v-model="role">
        <option value="">Choose role</option>
        <option value="SHOP">Shop</option>
        <option value="USER">User</option>
      </select>
    </div>
    <div class="form-group">
      <label>User Name</label>
      <input type="text" class="form-control" v-model="userName" placeholder="User Name"/>
    </div>
    <div class="form-group">
      <label>password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password"/>
    </div>
    <div class="form-group">
      <label>language</label>
      <input type="text" class="form-control" v-model="language" placeholder="language"/>
    </div>
    <div class="form-group">
      <label>currency</label>
      <input type="text" class="form-control" v-model="currency" placeholder="currency"/>
    </div>

    <button class="btn btn-primary btn-block">Login</button>
  </form>
    </div>
  </div>

</template>
<script>
import axios from 'axios'
  export default {
    name: 'Registration',
    data() {
      return {
        name: '',
        email:'',
        role:'',
        userName:'',
        password:'',
        language:'',
        currency:''
      }
    },
    methods:{
      async handleSubmit(){
        await axios.post('sign-up',{
          name: this.name,
          email: this.email,
          role: this.role,
          userName: this.userName,
          password: this.password,
          language: this.language,
          currency: this.currency
        })
        await this.$router.push('/login')
      }
    }
  }
</script>