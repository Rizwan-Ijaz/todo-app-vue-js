<template>
  <q-layout class="bg-blue-grey-1">
    <q-page class="column justify-center items-center">
      <div class="row items-center">
        <img
          src="../icon/AppIcon.png"
          class="q-mr-md"
          style="height:50px; width:50px"
        />
        <h3>Todo</h3>
      </div>

      <q-card class="auth-tabs">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <login-register :tab="tab" />
          </q-tab-panel>

          <q-tab-panel name="register">
            <login-register :tab="tab" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-page>
  </q-layout>
</template>
<script>
export default {
  data() {
    return {
      tab: "login"
    };
  },
  components: {
    "login-register": require("components/Auth/LoginRegister").default
  }
};
</script>

<style>
.auth-tabs {
  max-width: 500px;
}
</style>
