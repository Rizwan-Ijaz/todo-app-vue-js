<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title> Todo App </q-toolbar-title>

        <q-btn
          v-if="!loggedIn"
          to="/auth"
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
          flat
        />
        <q-btn
          v-else
          @click="logoutUser"
          icon-right="account_circle"
          label="Logout"
          class="absolute-right"
          flat
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          :key="nav.label"
          v-for="nav in navs"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      :breakpoint="767"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header class="text-grey-8"> Navigation </q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="$q.platform.is.electron"
          @click="quitApp"
          key="Quit"
          class="text-grey-4 absolute-bottom"
          clickable
          exact
        >
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Quit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "MainLayout",
  data() {
    return {
      leftDrawerOpen: false,
      navs: [
        { label: "Todo", icon: "list", to: "/" },
        { label: "Settings", icon: "settings", to: "/settings" }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    quitApp() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Really quit want Todo app?",
          cancel: true
        })
        .onOk(() => {
          if (this.$q.platform.is.electron)
            require("electron").ipcRenderer.send("quit-app");
        });
    }
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
}
</style>
