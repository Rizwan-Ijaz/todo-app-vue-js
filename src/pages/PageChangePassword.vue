<template>
  <q-page padding>
    <q-btn
      to="/settings"
      color="primary"
      icon="chevron_left"
      label="Back"
      flat
    />
    <h4 class="font-weight-bold">Update your password</h4>
    <form @submit.prevent="submitForm">
      <div class="row">
        <q-input
          type="password"
          class="col-12 col-md-4 offset-md-8 q-mb-md"
          label="Current Password"
          ref="currentPassword"
          :rules="[val => val || 'Please enter your current password']"
          v-model="formData.currentPassword"
          stack-label
          outlined
        />

        <q-input
          class="col-12 col-md-4 offset-md-8 q-mb-md"
          label="New Password"
          type="password"
          :rules="[
            val => val.length >= 6 || 'Please enter at least 6 characters'
          ]"
          ref="newPassword"
          v-model="formData.newPassword"
          stack-label
          outlined
          lazy-rules
        />

        <q-input
          class="col-12 col-md-4 offset-md-8 q-mb-md"
          label="Confirm New Password"
          type="password"
          :rules="[
            val => val === formData.newPassword || 'Password did not match'
          ]"
          ref="confirmPassword"
          v-model="formData.confirmPassword"
          stack-label
          outlined
          lazy-rules
        />
      </div>
      <div class="row">
        <q-space />
        <q-btn color="primary" label="Cancel" flat to="/settings" />
        <q-btn color="primary" label="Update" type="submit" />
      </div>
    </form>
  </q-page>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    submitForm() {
      const { currentPassword, newPassword, confirmPassword } = this.$refs;
      currentPassword.validate();
      newPassword.validate();
      confirmPassword.validate();

      if (
        !currentPassword.hasError &&
        !newPassword.hasError &&
        !confirmPassword.hasError
      ) {
        this.changePassword(this.formData);
      }
    },
    ...mapActions("auth", ["changePassword"])
  }
};
</script>
