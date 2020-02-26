import * as fb from 'firebase'

<template>
  <section>
    <div class="container">
      <h1 class="title">Create new Post</h1>
      <div class="notification">
        <section>
          <b-field label="Title">
            <b-input v-model="title"></b-input>
          </b-field>
          <b-field label="Message">
            <b-input maxlength="200" type="textarea" v-model="description"></b-input>
          </b-field>
        </section>
        <b-button type="is-primary is-medium" @click="createPost">Create</b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    title: "",
    description: "",
  }),
  methods: {
    createPost() {

        const post = {
          title: this.title,
          description: this.description,
          claps: 0,
          createdAt: new Date()
        };

        this.$store.dispatch("createPost", post);
      
    }
  }
};
</script>

