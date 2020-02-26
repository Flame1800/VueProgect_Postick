<template>
  <div>
    <Navbar />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: {
    Navbar
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  }
};
</script>
