<template>
  <div class="add-product-wrapper">
    <div class="add-product-inner">
      <div class="row">
        <div class="col-6">
          <img height="500" width="500" v-if="previewImage" :src="previewImage" class="uploading-image" />
          <input type="file" accept="image/jpeg" @change=uploadImage>
        </div>
        <div class="col-6">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Product Name</span>
            </div>
            <input type="text" v-model="product.product_name" class="form-control" aria-label="Amount (to the nearest dollar)">
          </div>
          <hr>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Category</span>
            </div>
            <select class="form-control" v-model="product.category">
              <option value="">Choose category</option>
              <option value="ABC">ABC</option>
              <option value="DEF">DEF</option>
              <option value="category">category</option>
            </select>
          </div>
          <hr>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Sub Category</span>
            </div>
            <select class="form-control" v-model="product.sub_category">
              <option value="">Choose sub_category</option>
              <option value="ABC">ABC</option>
              <option value="DEF">DEF</option>
              <option value="sub_category">sub_category</option>
            </select>
          </div>

          <hr>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">description</span>
            </div>
            <textarea v-model="product.description" class="form-control" aria-label="With textarea"></textarea>
          </div>
          <hr>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Qty</span>
            </div>
            <input type="number" v-model="product.qty" class="form-control" aria-label="Amount (to the nearest dollar)">
          </div>
          <hr>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">$</span>
            </div>
            <input type="number" v-model="product.price" class="form-control" aria-label="Amount (to the nearest dollar)">
            <div class="input-group-append">
              <span class="input-group-text">.00</span>
            </div>
          </div>
          <hr>
              <div class="input-group-prepend">
              <span class="input-group-text">Product status</span>
            </div>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input type="radio" v-model="product.status" :checked="product.status" id="true" name="status" value="true">
              </div>
            </div>
            <label for="true"> True </label><br>
          </div>

          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input type="radio" v-model="product.status" :checked="!product.status" id="false" name="status" value="false">
              </div>
            </div>
            <label for="false"> False</label><br>
          </div>

        </div>
      </div>
<div class="set-buttons">
  <button class="btn btn-primary btn-block" @click="handleSave()">  Save</button>
</div>
</div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name:'AddProduct',
  methods:{
    async handleSave(){
      await axios.post(`add-edit-product`, JSON.parse(JSON.stringify(this.product))
      ).then((res) => {
        console.log(res.data.data)
        this.product = res.data.data
        this.$router.push({path : '/'})
      }).catch(() => {
      })
    },
    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.previewImage = e.target.result;
        this.product.image = this.previewImage
      };
    }
  },
  data() {
    return{
      name:null,
      product: {
        product_name: '',
        category: '',
        sub_category: '',
        description: '',
        status: 1,
        price: 0,
        qty: 0,
        image: ''
      },
      previewImage:null
    }
  },
}
</script>
<style>
.set-buttons{
  width: 15%;
  margin: auto;
  margin-top: 10px;
}
.add-product-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.add-product-inner{
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
  padding: 10px;
}
</style>