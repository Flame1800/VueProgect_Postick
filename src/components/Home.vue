<template>
  <div>
    <div class="container" v-if="!loading">
      <h1 class="main title">Posts</h1>
      <div class="card post" v-for="(post, i) in posts" :key="i">
        <header class="card-header">
          <div class="card-header-title">{{ post.title }}</div>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            {{ post.description }}
            <hr />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer class="card-footer">
          <b-button class="btn-claps" v-if="userLoggedIn" @click="post.claps++" type="is-primary">
            Claps:
            {{ post.claps }}
          </b-button>

          <router-link
            href="#"
            v-if="userLoggedIn"
            class="card-footer-item"
            :to="'/post/' + post.id"
          >More info</router-link>
           
        </footer>
      </div>
    </div>
    <b-loading :can-cancel="true" v-else></b-loading>
  </div>
</template>

<script>
export default {
  data() {
    return {
      writer: this.$store.getters.userRole === "writer" ? true : false,
      reader: this.$store.getters.userRole === "reader" ? true : false
    };
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    userLoggedIn() {
      return this.$store.getters.userLoggedIn;
    },
    loading () {
      return this.$store.getters.loading
    }
  },
};
</script>

<style scoped>
.main {
  margin-top: 60px;
}
.btn-claps {
  margin-top: 5px;
  margin-left: 30px;
}
.post {
  margin: 40px;
}
</style>