<template>
  <div>
    <div class="container">
      <div class="card post">
        <app-edit-post :post="post"></app-edit-post>
      </div>
    </div>
  </div>
</template>

<script>
import EditPost from "./EditPost";
export default {
  props: ["id"],
  computed: {
    post() {
      const id = this.id;
      return this.$store.getters.postById(id);
    },
  },
  components: {
    appEditPost: EditPost
  }
};
</script>
