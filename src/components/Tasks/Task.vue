<template>
  <q-item
    @click="updateTask({ id, updates: { completed: !task.completed } })"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
    v-touch-hold:1000.mouse="showEditTaskModal"
  >
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strike': task.completed }"
        v-html="$options.filters.searchHightlight(task.name, search)"
      >
      </q-item-label>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side top>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column">
          <q-item-label class="row justify-end" caption>
            {{ task.dueDate | niceDate }}
          </q-item-label>
          <q-item-label class="row justify-end" caption>
            <small> {{ taskDueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side top>
      <div class="row">
        <q-btn
          @click.stop="showEditTaskModal"
          color="primary"
          icon="edit"
          flat
          round
          dense
        />
        <q-btn
          @click.stop="prompToDelete(id)"
          color="red"
          icon="delete"
          flat
          round
          dense
        />
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edit-task :task="task" :id="id" @close="showEditTask = false" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { date } from "quasar";
export default {
  data() {
    return {
      showEditTask: false,
    };
  },
  props: ["id", "task"],
  computed: {
    ...mapState("tasks", ["search"]),
    ...mapGetters("settings", ["settings"]),
    taskDueTime() {
      if (this.settings.show12HourTimeFormat) {
        const { dueDate, dueTime } = this.task;
        return date.formatDate(dueDate + " " + dueTime, "h:mm A");
      } else {
        return this.task.dueTime;
      }
    },
  },
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    prompToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you really like to delete this task?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteTask(id);
        });
    },
    showEditTaskModal() {
      console.log("triggered");
      this.showEditTask = true;
    },
  },
  components: {
    "edit-task": require("components/Tasks/Modals/EditTask").default,
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMM D");
    },
    searchHightlight(value, search) {
      if (search) {
        const searchRegx = new RegExp(search, "ig");
        return value.replace(searchRegx, (match) => {
          return `<span class="bg-yellow-6">${match}</span>`;
        });
      }
      return value;
    },
  },
};
</script>

<style>
</style>