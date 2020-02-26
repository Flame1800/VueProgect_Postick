<template>
  <v-container>
    <section class="product mt-3 elevation-10">
      <v-layout row wrap>
        <v-flex xs12 lg6>
          <img :src="product.imageSrc" alt class="product-image" />
        </v-flex>
        <v-flex xs12 lg6>
          <div class="product-info">
            <h5 class="product-title display-1 mb-3 mt-3">{{ product.title }}</h5>
            <p class="product-category title">
              <span class="product-title">Vendor:</span>
              {{ product.vendor }}
            </p>
            <p class="product-price title">
              <span class="product-title">Price:</span> {{ product.price }}
            </p>
            <p class="product-color title">
              <span class="product-title">Color:</span>
              <span
                :title="product.color"
                :style="{ backgroundColor: product.color }"
                class="product-color-bg"
              ></span>
            </p>
            <p class="title">
              <span class="product-title">Material:</span> 
              {{ product.material }}
            </p>
            <div class="title mb-5">
              <p class="product-title" mb-2>Description:</p>
              {{ product.description }}
            </div>
            <v-btn color="primary" class="headline">Edit</v-btn>
            <v-btn color="primary" class="headline">Buy</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    product () {
      return this.$store.getters.productById(this.id)
    }
  }
};
</script>

<style scoped>
.product {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #1c77ad;
  padding: 30px;
  margin-bottom: 100px;
}

.product-image {
  width: 550px;
}

.product-info {
  margin-left: 50px;
}

.product-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1875d0;
  margin-bottom: 0;
}

.product-price {
  color: red;
}

.product-color-bg {
  display: inline-block;
  width: 50px;
  height: 20px;
  bottom: 1px solid #2b2b2b;
  border-radius: 10px;
}
</style>