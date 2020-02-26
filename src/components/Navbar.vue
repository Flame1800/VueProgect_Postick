<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="'/'">
          <h1 class="pointer">Postick!</h1>
        </router-link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar" v-for="(link, i) in links" :key="i">
          <router-link class="navbar-item" :to="link.url">{{ link.title }}</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-primary" :to="'/register'">
                <strong>Sign up</strong>
              </router-link>
              <router-link class="button is-light" :to="'/login'">Log in</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    sideNav: false
  }),
  methods: {
    onLogout() {
      this.$blog.dispatch("logoutUser");
      this.$router.push("/login");
    }
  },
  computed: {
    isUserLogedIn() {
      return this.$store.getters.isUserLogedIn;
    },
    links() {
      return [
        {
          title: "New Post",
          url: "/new"
        },
        {
          title: "My Post",
          url: "/list"
        }
      ];
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
  font-size: 25px;
  font-weight: bold;
}
.buttons:not(:last-child) {
  margin-bottom: 0;
  margin-right: 10px;
  margin-top: 5px;
}
</style>

