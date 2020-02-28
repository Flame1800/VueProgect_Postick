<template>
  <section>
    <div class="container">
      <h1 class="title">Create Account</h1>
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

        <b-field label="Return Password" name="confirm-password">
          <b-input
            type="password"
            v-model="confirmPassword"
            @change="$v.password.$touch()"
            required
            minlength="6"
          ></b-input>
        </b-field>
        <div
          class="error danger"
          v-if="!$v.confirmPassword.sameAsPassword"
        >Пароли не совпадают</div>

        <b-radio v-model="role" required name="name" native-value="reader">Register as a reader</b-radio>
        <b-radio v-model="role" required name="name" native-value="writer">Register as a writer</b-radio>
        <br />
        <b-button
          class="btn"
          size="is-medium"
          @click="onSubmit"
          :loading="loading"
          color="primary"
        >Sign Up</b-button>
        <div v-if="error" class="err">{{error}}</div>
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
      confirmPassword: "",
      role: ""
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
      sameAsPassword: sameAs("password")
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    onSubmit() {
      const user = {
        email: this.email,
        password: this.password,
        role: this.role
      }

      this.$store
        .dispatch("registerUser", user)
        .then(() => {
          this.$router.push("/");
        })
        .catch(console.log());
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

.btn {
  margin-top: 30px;
}
.err {
  color: red;
}
</style>
