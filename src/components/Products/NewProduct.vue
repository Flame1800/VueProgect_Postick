import * as fb from 'firebase'

<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Create New Product</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="title"
            label="Title"
            name="title"
            :rules="[(v) => !!v || 'Title is requied']"
            requied
            type="text"
          ></v-text-field>

          <v-text-field v-model="vendor" label="Vendor Product" name="vendor" type="text"></v-text-field>
          <v-text-field v-model="color" label="Color" name="color" type="text"></v-text-field>
          <v-text-field v-model="material" label="Material" name="material" type="text"></v-text-field>
          <v-text-field
            v-model="price"
            label="Price Product"
            :rules="[(v) => !!v || 'Price is requeiaed']"
            requied
            name="color"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="description"
            label="Description Product"
            name="description"
            type="text"
          ></v-text-field>
        </v-form>
        <v-layout class="mb-3">
          <v-flex xs12>
            <v-btn>
              Upload
              <v-icon class="ml-3" rigth dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <img src height="200px" alt />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-switch v-model="promo" :label="`Add a Promo?`"></v-switch>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn class="primary" @click="createProduct" :disabled="!valid">Create Product</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: '',
    vendor: '',
    color: '',
    material: '',
    price: 0,
    description: '',
    promo: false,
    valid: false
  }),
  methods: {
    createProduct() {
      if (this.$refs.form.validate()) {
        const product = {
          title: this.title,
          vendor: this.vendor,
          color: this.color,
          material: this.material,
          price: this.price,
          description: this.description,
          promo: this.promo,
          imageSrc: 'https://image.ibb.co/jBZOMo/ASUS_TUF_Gaming_FX504_GD.jpg'
        }

        this.$store.dispatch('createProduct', product)
      } 
    }
  }
};
</script>

