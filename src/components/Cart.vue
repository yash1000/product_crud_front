<template>
<div>aasd</div>
  <div class="home-wrapper">
    <div class="home-inner" v-if="cart">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">image</th>
          <th scope="col">product_name</th>
          <th scope="col">description</th>
          <th scope="col">price</th>
          <th scope="col">qty</th>
          <th scope="col">action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in cart" :key="data">
          <td class="set-text">
            <img height="30" width="30" :src="image(data.product.image)" />
          </td>
          <td class="set-text">{{ data.product.product_name }}</td>
          <td class="set-text">{{ data.product.description }}</td>
          <td class="set-text">{{ data.product.price }}</td>
          <td><button class="plus-minus" @click="handleAdd(data.product.id, data.qty)">+</button>{{ data.qty }}<button class="plus-minus" @click="handleRemove(data.product.id, data.qty)">-</button></td>
          <td>
            <button @click="handleDelete(data.id)" class="btn btn-primary btn-block">delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="set-btn">
        <button @click="handleHome()" class="btn btn-danger btn-block">Continue shopping</button>
      </div>
      <div v-if="cart.length>0" class="set-totals">
        <h4>Sub Total: <strong>{{total}}</strong></h4>
        <h4>Total: <strong>{{total}}</strong></h4>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
 export default {
   name:'Cart',
   data() {
     return {
       cart: null,
       total: 0
     }
   },
   created() {
     this.getCart()
   },
   methods: {
     handleHome() {
       this.$router.push('/');
     },
     image(img) {
       return `http://localhost:3000/${img}`;
     },
     getTotal(){
       if(this.cart.length > 0) {
         for (let data of this.cart) {
           console.log(data)
           this.total += data.qty * data.product.price
         }
       }
     },
     async handleAdd(id, qty) {
       await axios.post('add-cart',{
         product_id: id,
         qty: qty+1
       }).then((res) => {
         if(res.data.meta.code === 0){
           this.$toast.error(`Product qty exceeded`);
         } else {
           this.getCart();
         }
       })
     },
     async handleRemove(id, qty) {
       await axios.post('add-cart',{
         product_id: id,
         qty: qty-1
       }).then(() => {
         this.getCart();
       })
     },
     async getCart() {
       await axios.get('get-cart').then((res) => {
         this.cart = Object.freeze(res.data.data)
         this.total = 0
         this.getTotal()
       })
     },
     async handleDelete(id){
       await axios.post('delete-cart',{
          ids:[id]
       }).then(() => {
         this.getCart();
       })
     }
   }
 }
</script>
<style>
.plus-minus{
  background-color: white;
  border: none;
  font-weight: bold;
}
.set-totals{
  margin: 10px;
  padding: 10px;
  float: right;
}
.set-btn{
  float: left;
  margin: 20px;
}
.set-text{
  vertical-align: middle;
  text-align: center;
}
</style>