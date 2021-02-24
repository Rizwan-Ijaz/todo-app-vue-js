<template>
  <q-card>
    <modal-header>Add Task</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <modal-task-name :name.sync="task.name" ref="modalTaskName" />

        <modal-task-duedate :dueDate.sync="task.dueDate" />

        <modal-task-duetime v-if="task.dueDate" :dueTime.sync="task.dueTime" />
      </q-card-section>
      <modal-task-buttons />
    </form>
  </q-card>
</template>

<script>
import { mapActions } from "vuex";
import mixinAddEditTask from "src/mixins/mixin-add-edit-task";

export default {
  mixins: [mixinAddEditTask],
  data() {
    return {
      task: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),
    submitTask() {
      this.addTask(this.task);
      this.$emit("close");
    }
  }
};
</script>
