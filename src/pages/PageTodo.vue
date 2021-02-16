<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <q-list separator bordered>
        <q-item-label header>Todo</q-item-label>
        <task
          v-for="(task, key) in tasks"
          :key="key"
          :task="task"
          :id="key"
        ></task>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("tasks", ["tasks"]),
  },
  components: {
    task: require("components/Tasks/Task.vue").default,
  },
};
</script>