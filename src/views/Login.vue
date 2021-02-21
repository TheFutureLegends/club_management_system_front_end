<template>
  <v-row justify="center" class="mt-16">
    <v-col cols="12" sm="9" md="5" lg="4" >
      <v-card>
        <v-card-title>LOGIN</v-card-title>
        <validation-observer ref="observer">
          <v-form @submit.prevent="submit">
            <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"  
            >
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Email"
                required
                outlined
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Password"
              rules="required"
            >
              <v-text-field
                v-model="password"
                :error-messages="errors"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                required
                outlined
                :type="showPass ? 'text' : 'password'"
              ></v-text-field>
            </validation-provider>
             <v-divider class="mt-4"></v-divider>
              <v-btn class="primary" type="submit" block>
                Sign In
              </v-btn>
            </v-card-text>
          </v-form>
        </validation-observer>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationProvider,
  setInteractionMode,
  ValidationObserver,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    email: '',
    password: null,
    showPass: false,
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password,
      }
    },
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate()
      if (valid) {
        localStorage.setItem('jwt', true)
        this.$router.push('/')
      }
    }
  },
}
</script>
