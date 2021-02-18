import Vue from "vue";
import { Notify, uid } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
const state = {
  tasks: {},
  search: "",
  sort: "name",
  tasksDownloaded: false
};

const mutations = {
  updateTask(state, payload) {
    console.log({ payload });
    Object.assign(state.tasks[payload.id], payload.updates);
  },
  deleteTask(state, id) {
    console.log({ id });
    Vue.delete(state.tasks, id);
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task);
  },
  clearTasks(state) {
    state.tasks = {};
  },
  setSearch(state, val) {
    state.search = val;
  },
  setSort(state, value) {
    console.log("val", value);
    state.sort = value;
  },
  setTasksDownloaded(state, value) {
    state.tasksDownloaded = value;
  }
};

const actions = {
  updateTask({ dispatch }, payload) {
    dispatch("fbUpdateTask", payload);
  },
  deleteTask({ dispatch }, id) {
    dispatch("fbDeleteTask", id);
  },
  addTask({ dispatch }, task) {
    const taskId = uid();
    const payload = {
      id: taskId,
      task
    };
    dispatch("fbAddTask", payload);
  },

  setSearch({ commit }, val) {
    commit("setSearch", val);
  },
  setSort({ commit }, value) {
    commit("setSort", value);
  },

  fbReadData({ commit }) {
    const userId = firebaseAuth.currentUser.uid;
    const userTasks = firebaseDb.ref(`tasks/${userId}`);

    userTasks.on("child_added", snapshot => {
      const task = snapshot.val();
      const payload = {
        id: snapshot.key,
        task
      };
      commit("addTask", payload);
    });

    userTasks.once("value", snapshot => {
      commit("setTasksDownloaded", true);
    });

    userTasks.on("child_changed", snapshot => {
      const task = snapshot.val();
      const payload = {
        id: snapshot.key,
        updates: task
      };
      commit("updateTask", payload);
    });

    userTasks.on("child_removed", snapshot => {
      commit("deleteTask", snapshot.key);
    });
  },

  fbAddTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDb.ref(`tasks/${userId}/${payload.id}`);
    taskRef.set(payload.task, error => {
      if (error) {
        showErrorMessage(error?.message);
      } else {
        Notify.create("Task is added");
      }
    });
  },
  fbUpdateTask({}, payload) {
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDb.ref(`tasks/${userId}/${payload.id}`);
    taskRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error);
      } else {
        const keys = Object.keys(payload.updates);
        if (!(keys.includes("completed") && keys.length === 1))
          Notify.create("Task is updated");
      }
    });
  },
  fbDeleteTask({}, taskId) {
    const userId = firebaseAuth.currentUser.uid;
    const taskRef = firebaseDb.ref(`tasks/${userId}/${taskId}`);
    taskRef.remove(error => {
      if (error) {
        showErrorMessage(error);
      } else {
        Notify.create("Task is removed");
      }
    });
  }
};

const getters = {
  tasksSorted: state => {
    let tasksSorted = {};

    const keysOrdered = Object.keys(state.tasks);
    keysOrdered.sort((a, b) => {
      const taskAProp = state.tasks[a][state.sort].toLowerCase();
      const taskBProp = state.tasks[b][state.sort].toLowerCase();
      if (taskAProp > taskBProp) return 1;
      if (taskAProp < taskBProp) return -1;
      return 0;
    });

    keysOrdered.forEach(key => (tasksSorted[key] = state.tasks[key]));
    return tasksSorted;
  },
  tasksFiltered: (state, getters) => {
    const tasksSorted = getters.tasksSorted;
    let tasksFiltered = {};

    if (state.search) {
      Object.keys(tasksSorted).forEach(key => {
        if (
          tasksSorted[key].name
            .toLowerCase()
            .includes(state.search.toLowerCase())
        ) {
          tasksFiltered[key] = tasksSorted[key];
        }
      });
      return tasksFiltered;
    }
    return tasksSorted;
  },
  tasksTodo: (state, getters) => {
    const tasksFiltered = getters.tasksFiltered;
    let tasks = {};

    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (!task.completed) {
        tasks[key] = task;
      }
    });

    return tasks;
  },
  tasksCompleted: (state, getters) => {
    const tasksFiltered = getters.tasksFiltered;
    let tasks = {};

    Object.keys(tasksFiltered).forEach(key => {
      let task = tasksFiltered[key];
      if (task.completed) {
        tasks[key] = task;
      }
    });

    return tasks;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
