<template>
  <section>
    <div class="container">
      <h1 class="title">Log in</h1>
      <div class="notification">
        <b-field
          label="Email"
          v-model="email"
          name="email"
          :rules="emailRules"
        >
          <b-input maxlength="30"></b-input>
        </b-field>

        <b-field
          label="Password"
          v-model="password"
          name="password"
          :rules="passwordRules"
        >
          <b-input value="123" type="password" maxlength="30"></b-input>
        </b-field>
        <b-button
          @click="onSubmit"
          :loading="loading"
          color="primary"
          :disabled="!valid || loading"
        >Continiune</b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    valid: false,
    emailRules: [
      v => !!v || "Email is required",
    ],
    passwordRules: [
      v => !!v || "Name is required",
    ]
  }),
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.enmail,
          password: this.password
        };
        this.$store
          .dispatch("loginUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    }
  },
  created() {
    if (this.$route.query["loginError"]) {
      this.$store.dispatch("setError", "Please log in to acces this page");
    }
  }
};
</script>


<style>  

  .title {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 120px;
  }
</style>