<template>
  <form @submit.prevent="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        Register to access your Todos anywhere
      </q-banner>
    </div>
    <div class="q-mb-md">
      <q-input
        class="col"
        label="Email"
        :rules="[
          val => isValidEmailAddress(val) || 'Please enter valid email address'
        ]"
        v-model="formData.email"
        stack-label
        outlined
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        class="col"
        label="Password"
        type="password"
        :rules="[
          val => val.length >= 6 || 'Please enter at least 6 characters'
        ]"
        v-model="formData.password"
        stack-label
        outlined
        lazy-rules
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" label="Register" type="submit" />
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {},
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  }
};
</script>
