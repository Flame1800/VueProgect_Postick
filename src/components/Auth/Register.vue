<template>
  <section>
    <div class="container">
      <h1 class="title">Create Account</h1>
      <div class="notification">
        <form ref="form" lazy-validation>
        <b-field
          label="Email"
          :type="{ 'is-danger': hasError }"
          :message="{ 'Username is not available': hasError }"
          v-model="email"
          name="email"
          :rules="emailRules"
        >
          <b-input aria-placeholder="Jonh Silver" maxlength="30"></b-input>
        </b-field>

        <b-field
          label="Password"
          :type="{ 'is-danger': hasError }"
          :message="[
                { 'Password is too short': shortError },
                { 'Password must have at least 8 characters': hasError }
            ]"
          v-model="password"
          name="password"
          :rules="passwordRules"
        >
          <b-input type="password" maxlength="30"></b-input>
        </b-field>
        <b-field
          label="Return Password"
          :type="{ 'is-danger': hasError }"
          :message="[
                { 'Password is too short': hasError },
                { 'Password must have at least 8 characters': hasError }
            ]"
          v-model="confirmPassword"
          name="confirm-password"
          :rules="confirmPasswordRules"
        >
          <b-input  type="password" maxlength="30"></b-input>
        </b-field>
        <b-button
          @click="onSubmit"
          :loading="loading"
           color="primary"
          :disabled="valid"
        >Sign Up</b-button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      shortError: false,
      hasError: false,
      email: "",
      password: "",
      confirmPassword: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => {
          hasError = true;
          return !!v || "Password is required"},
        v => (v && v.length >= 6) || "Password must be equal than 6 characters"
      ],
      confirmPasswordRules: [
        v => !!v || "Password is required",
        v => v === this.password || "Password should match"
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };

        this.$store
          .dispatch("registerUser", user)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style scoped>  

  .title {
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 30px;
    margin-top: 120px;
  }
</style>