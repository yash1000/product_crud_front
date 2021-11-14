<template>
  <div class="home-wrapper">
    <div class="home-inner" v-if="role === 'USER'">
      <div>
        <div class="set-card" v-for="data in products" :key="data">
          <a href="javascript:void(0)" @click="handleProduct(data.id)" class="nav-link ">
          <div class="row">
          <div class="col-3">
          <img height="200" width="200" :src="image(data.image)" />
          </div>
          <div class="col-9">
          <h3>{{ data.product_name }}</h3>
            <p>{{ data.description }}</p>
            <h4>${{ data.price }}</h4>
            <button class="btn btn-primary btn-block" @click.stop="handleCart(data.id)"> Add to cart </button>
          </div>
        </div>
          </a>
        </div>
      </div>
    </div>
    <div class="home-inner" v-if="role === 'SHOP'">
      <button style="float: right" class="btn btn-primary btn-block" @click="handleAddProduct">Add Product</button>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">product_name</th>
          <th scope="col">category</th>
          <th scope="col">sub_category</th>
          <th scope="col">description</th>
          <th scope="col">image</th>
          <th scope="col">price</th>
          <th scope="col">qty</th>
          <th scope="col">status</th>
          <th scope="col">action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in products" :key="data">
          <th scope="row">{{ data.id }}</th>
          <td>{{ data.product_name }}</td>
          <td>{{ data.category }}</td>
          <td>{{ data.sub_category }}</td>
          <td>{{ data.description }}</td>
          <td>
            <img height="30" width="30" :src="image(data.image)" />
          </td>
          <td>{{ data.price }}</td>
          <td>{{ data.qty }}</td>
          <td>{{ data.status }}</td>
          <td>
            <router-link :to="{name:'EditProduct', params:{id:data.id}}"><button class="btn btn-primary btn-block"> Edit</button></router-link>
            <button @click="handleDelete(data.id)" class="btn btn-primary btn-block">delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
  export default {
    name:'Home',
    data() {
      return{
        name:null,
        products: [],
        role: ''
      }
    },
    methods: {
      image(img) {
        return `http://localhost:3000/${img}`;
      },
      handleProduct(id){
        console.log(id)
        this.$router.push({name:'Product', params:{id:id}})
      },
      async handleCart(id){
        await axios.post('add-cart',{
          product_id: id,
          qty: 1
        }).then(() => {
          this.$toast.success(`Item added to cart`);
        }).catch((err) => {
          this.$toast.success(err);
        })
      },
      handleAddProduct(){
        this.$router.push({path:'/add-product'})
      },
      async handleDelete(id){
        await axios.delete(`delete-product/${id}`)
        await this.getProduct();
      },
      async getProduct(){
        const response = await axios.get('get-products',{
          headers:{
            authorization:localStorage.getItem('token')
          }
        })
        this.products = response.data.data
      }
    },
    async created() {
      const user = JSON.parse(localStorage.getItem('user'))
      this.name = user.name
      this.role = user.role
      await this.getProduct();
    }
  }
</script>
<style>
h3, h4, p {
  color: black !important;
}
.set-card{
  padding: 10px;
  margin: 10px;
  border-radius: 17px;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
}
img{
  border-radius: 10px !important;
}
.home-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.home-inner{
  width: 90%;
  margin: auto;
  background: #ffffff;
  box-shadow: 0 14px 80px rgba(34,35,58,0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
  margin-top: 100px;
}
button{
  border: 1px solid black;
  margin: 5px;
  border-radius: 5px;
}
</style>