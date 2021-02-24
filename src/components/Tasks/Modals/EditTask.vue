<template>
  <q-card>
    <modal-header>Edit Task</modal-header>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <modal-task-name :name.sync="taskToSubmit.name" ref="modalTaskName" />

        <modal-task-duedate :dueDate.sync="taskToSubmit.dueDate" />

        <modal-task-duetime
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
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
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  props: ["task", "id"],
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitTask() {
      this.updateTask({ id: this.id, updates: this.taskToSubmit });
      this.$emit("close");
    }
  },

  created() {
    this.taskToSubmit = Object.assign({}, this.task);
  }
};
</script>
