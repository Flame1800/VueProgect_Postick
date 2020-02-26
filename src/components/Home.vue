<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs-12>
          <v-carousel>
            <v-carousel-item
              v-for="(item,i) in promoProducts"
              :key="i"
              :src="item.imageSrc"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs-12 sm5 md4
        v-for="(item,i) in products"
        :key="i"
       >
        <router-link
        :aria-label="item.title"
        :to="'/product/'+ item.id"
        >
          <v-img
              class="white--text align-end"
              height="350px"
              :src="item.imageSrc"
            > </v-img>
        </router-link>
          <v-card class="mx-auto" max-width="400">
          
              <v-card-title>{{ item.title }}</v-card-title>
           

            

            <v-card-text class="text--primary">
              <div>Price: {{ item.price }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text>Share</v-btn>

              <v-btn color="orange" text>Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoProducts () {
      return this.$store.getters.promoProducts
    },
    products () {
      return this.$store.getters.products
    }
  }
};
</script>

