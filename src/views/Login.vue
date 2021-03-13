<template>
  <v-row justify="center" align="center">
    <div style="width:450px">
      <h1 class="text-center display-1 mb-10">RMIT Developer Club</h1>
      <v-card class="pa-6">
        <v-card-title>Account Login</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submit">
            <v-text-field
                v-model="email"
                label="Email"
                required
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            />
            <v-text-field
                v-model="password"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                required
                :error-messages="passwordErrors"
                :type="showPass ? 'text' : 'password'"
                @click:append="showPass = !showPass"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            />
            <a>Forgot password ?</a>
            <v-btn type="submit" class="mt-6" depressed block color="primary">LOGIN</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required },
  },

  data: () => ({
    email: '',
    password: null,
    showPass: false,
  }),
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if(this.$v.$error) return // prevent submit if field not valid
      localStorage.setItem('jwt', true)
      this.$router.push('/')
    },
  },
}
</script>
