<template>
  <div>
    <div class="container">
      <h1 class="main title">Posts</h1>
      <div class="card" v-for="(post, i) in posts" :key="i">
        <header class="card-header">
          <p class="card-header-title">{{ post.title }}</p>
          <a href="#" class="card-header-icon" aria-label="more options">
            <span class="icon">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </header>
        <div class="card-content">
          <div class="content">
            {{ post.description }}
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Clap</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
  }
};
</script>

<style scoped>
  .main {
    margin-top: 60px;
  }
</style>