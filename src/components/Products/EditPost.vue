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
        <b-button class="mt-3" @click="saveEdit">Save</b-button>
      </div>
    </div>
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
    }
  },
  methods: {
    saveEdit() {
      if (this.editedTitle !== "" && this.editedDescription !== "") {
        this.$store.dispatch("updatePost", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.post.id
        });
      }
    },
  }
};
</script>
