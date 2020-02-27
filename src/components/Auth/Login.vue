<template>
  <section>
    <div class="container">
      <h1 class="title">Log in</h1>
      <div class="notification">
        <b-field label="Email" :class="{ 'error-input': $v.email.$error }">
          <b-input
            required
            pattern="[^ @]*@[^ @]*"
            placeholder="Enter your email"
            v-model="email"
            @change="$v.email.$touch()"
          ></b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            v-model="password"
            required
            @change="$v.password.$touch()"
            type="password"
            minlength="6"
          ></b-input>
        </b-field>
        <b-button @click="onSubmit" :loading="loading" color="primary">Continiune</b-button>
        <div v-if="error" class="err">{{error}}</div>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return { email: "", password: ""};
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error () {
      return this.$store.getters.error
    }
  },
  validations: {
    email: {
      required,
      email, 
    },
    password: {
      required,
      minLength: minLength(4)
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("loginUser", user)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {});
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

.error {
  margin-top: 0;
}

.danger {
  color: rgb(231, 25, 25);
  font-size: 12px;
}

.err {
  color: red;
}
</style>