<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Registration form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="email"
                  label="email"
                  name="email"
                  :rules="emailRules"
                  prepend-icon="person"
                  type="email"
                ></v-text-field>

                <v-text-field
                  label="Password"
                  name="password"
                  :rules="passwordRules"
                  v-model="password"
                  prepend-icon="lock"
                  type="password"
                  :counter="6"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm Password"
                  name="confirm-password"
                  :rules="confirmPasswordRules"
                  prepend-icon="repeat"
                  type="password"
                  :counter="6"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="onSubmit"
                :loading="loading"
                color="primary"
                :disabled="!valid || loading"
              >Create Account</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
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

        this.$store.dispatch("registerUser", user)
        .then(() => {
          this.$router.push('/')
        })  
        .catch(() => {})
      }
    }
  }
};
</script>

