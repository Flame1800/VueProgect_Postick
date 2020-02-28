import * as fb from 'firebase'
<template>
  <section>
    <div class="container">
      <div class="notification">
        <h1 class="title">Edit Post</h1>
        <section>
          <b-field label="Title">
            <b-input v-model="editedTitle" required></b-input>
          </b-field>
          <b-field label="Message">
            <b-input type="textarea" required v-model="editedDescription"></b-input>
          </b-field>
        </section>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click="saveEdit" :loading="loading">Save</a>
      <router-link href="#" class="card-footer-item" :to="'/'">Back</router-link>
      <a class="card-footer-item del-item" @click="deletePost">Delete</a>
    </footer>
  </section>
</template>
<script>
export default {
  props: ["post"],
  data() {
    return {
      editedTitle: this.post.title,
      editedDescription: this.post.description
    };
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters.userLoggedIn;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    saveEdit() {
      if (this.editedTitle !== "" && this.editedDescription !== "") {
        this.$store.dispatch("updatePost", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.post.id
        })
      }
    },
    deletePost() {
      this.$store
        .dispatch("deletePost", { id: this.post.id })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {});
    }
  }
};
</script>


<style scoped>
.container {
  margin-top: 50px;
}
.del-item {
  background-color: rgb(233, 108, 108);
  color: black;
}
</style>
