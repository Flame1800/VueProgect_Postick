<template>
  <section>
    <div class="container">
       <div class="notification">
      <h1>There been my post in the future</h1>
       </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    myProducts() {
      return this.$store.getters.myProducts;
    }
  }
};
</script>

