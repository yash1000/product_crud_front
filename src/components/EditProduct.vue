<template>
  <div class="edit-product-wrapper">
    <div class="edit-product-inner" v-if="product">
      <div class="row">
        <div class="col-6">
          <img height="500" width="500" v-if="previewImage" :src="previewImage" class="uploading-image" />
          <img height="500"  v-if="!previewImage" width="500" :src="image(product.image)" />
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
  <button class="btn btn-primary btn-block" @click="handleCancel()"> Cancel</button>
  <button class="btn btn-primary btn-block" @click="handleSave()">  Save</button>
</div>
</div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name:'EditProduct',
  props: ['id'],
  async mounted() {
  await this.getProduct()
  },
  methods:{
    image(img) {
      return `http://localhost:3000/${img}`;
    },
    async getProduct(){
      await axios.get(`product/${this.id}`,).then((res) => {
        this.product = res.data.data
        console.log(res.data.data)
      }).catch(() => {
      })
    },
    async handleSave(){
      const product = JSON.parse(JSON.stringify(this.product))
      if(!this.previewImage){
        delete product.image
      }
      await axios.post(`add-edit-product`, product).then((res) => {
        console.log(res.data.data)
        this.product = res.data.data
        this.$router.push({path : '/'})
      }).catch(() => {
      })
    },
    async handleCancel(){
      await this.getProduct()
      this.previewImage = ''
      await this.$router.push({path: '/'})
    },
    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.previewImage = e.target.result;
        console.log(this.previewImage);
        this.product.image = this.previewImage
      };
    }
  },
  data() {
    return{
      name:null,
      product:null,
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
.edit-product-wrapper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.edit-product-inner{
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