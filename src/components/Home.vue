<template>
  <div>
    <div class="container">
      <h1 class="main title">Posts</h1>
      <div class="card" v-for="(post, i) in posts" :key="i">
        <header class="card-header">
          <div class="card-header-title" v-model="title">{{ post.title }}</div>
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
          <b-button class="btn-claps" @click="post.claps++" type="is-primary">
            Claps:
            {{ post.claps }}
          </b-button>
          <a href="#" class="card-footer-item"  @click="edit" v-if="role === 'writer'">Edit</a>
          <a href="#" class="card-footer-item" v-if="role === 'writer'">Delete</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: "writer"
    };
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
  },
  methods: {
    edit() {
      this.$buefy.dialog.prompt({
        message: this.title,
        inputAttrs: {
          placeholder: "e.g. Walter",
          maxlength: 10
        },
        trapFocus: true,
        onConfirm: value => this.$buefy.toast.open(`Post is edited`)
      });
    }
  }
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
</style>