<template>
<div>aasd</div>
  <div class="home-wrapper">
    <div class="home-inner">
      <div class="row" v-if="product">
        <div class="col-6">
          <img height="500" width="500" :src="image(product.image)" />
        </div>
        <div class="col-6">
          <h4 class="set-header">{{product.product_name}}</h4>
          <h3>$ {{product.price}}</h3>
          <p>{{product.description}}</p>
          <button class="btn btn-primary btn-block" @click.stop="handleCart(product.id)"> Add to cart </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import axios from "axios";

 export default {
   name:'Product',
   props:['id'],
   data() {
     return {
       product: null
     }
   },
   created() {
     axios.get(`product/${this.id}`).then((res) => {
       this.product = Object.freeze(res.data.data)
     })
   },
   methods:{
     image(img) {
       return `http://localhost:3000/${img}`;
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
   }
 }
</script>
<style>
.set-header{
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  width: 9%;
}
</style>