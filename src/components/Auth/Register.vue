<template>
  <section>
    <div class="container">
      <h1 class="title">Create Account</h1>
      <div class="notification">
        <b-field label="Email" :class="{ 'error-input': $v.email.$error }">
          <b-input v-model="email" @change="$v.email.$touch()"></b-input>
        </b-field>
        <div class="error danger" v-if="!$v.email.required">Field is required</div>
        <div class="error danger" v-if="!$v.email.email">Email is invalid</div>

        <b-field label="Password">
          <b-input v-model="password" @change="$v.password.$touch()" type="password" maxlength="30"></b-input>
        </b-field>
        <div class="error danger" v-if="!$v.password.required">Field is required</div>
        <div class="error danger" v-if="!$v.password.minLength">Password to short, min length 4 symbols</div>

        <b-field label="Return Password" name="confirm-password">
          <b-input type="password"  v-model="confirmPassword"  @change="$v.password.$touch()" maxlength="30"></b-input>
        </b-field>
        <div class="error danger" v-if="!$v.confirmPassword.required">Field is required</div>
        <div class="error danger" v-if="!$v.confirmPassword.sameAsPassword">Passwords must be identical </div>

        <b-button @click="onSubmit" :loading="loading" color="primary">Sign Up</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(4)
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSubmit() {
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
};
</script>

<style scoped>
.title {
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 120px;
}

.error {
  margin-top: 0;
}

.danger {
  color: rgb(231, 25, 25);
  font-size: 12px;
}
</style>
