<template>
  <div>
    <div class="container">
      <div class="card post">
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
          <app-edit-post :post="post"></app-edit-post>
          <a href="#" v-if="userLoggedIn" class="card-footer-item" @click="deletePost">Delete</a>
        </footer>
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
    loading() {
      return this.$store.getters.loading;
    },
    userLoggedIn() {
      return this.$store.getters.userLoggedIn;
    }
  },
  methods: {
    deletePost() {
      this.$store.dispatch("deletePost", {id: this.post.id})
      .then(() => {
          this.$router.push("/");
        })
        .catch(() => {});
    }
  },
  components: {
    appEditPost: EditPost
  }
};
</script>