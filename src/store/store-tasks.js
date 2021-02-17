import Vue from "vue";
import { uid } from "quasar";
const state = {
    tasks: {
        'ID1': {
            name: "Go to shop",
            dueDate: "2021/02/17",
            dueTime: "18:20",
            completed: false,
        },
        'ID2': {
            name: "Get bananas",
            dueDate: "2021/02/18",
            dueTime: "18:30",
            completed: false,
        },
        'ID3': {
            name: "Get apples",
            dueDate: "2021/02/19",
            dueTime: "18:40",
            completed: false,
        }
    },
    search: '',
    sort: 'name'
};

const mutations = {
    updateTask(state, payload) {
        console.log({ payload })
        Object.assign(state.tasks[payload.id], payload.updates)
    },
    deleteTask(state, id) {
        console.log({ id });
        Vue.delete(state.tasks, id)
    },
    addTask(state, payload) {
        Vue.set(state.tasks, payload.id, payload.task)
    },
    setSearch(state, val) {
        state.search = val
    },
    setSort(state, value) {
        console.log("val", value)
        state.sort = value
    }
};

const actions = {
    updateTask({ commit }, payload) {
        commit('updateTask', payload);
    },
    deleteTask({ commit }, id) {
        commit('deleteTask', id);
    },
    addTask({ commit }, task) {
        const taskId = uid();
        const payload = {
            id: taskId,
            task
        }
        commit('addTask', payload);
    },
    setSearch({ commit }, val) {
        commit('setSearch', val)
    },
    setSort({ commit }, value) {
        commit("setSort", value);
    }
};

const getters = {
    tasksSorted: (state) => {
        let tasksSorted = {};

        const keysOrdered = Object.keys(state.tasks);
        keysOrdered.sort((a, b) => {
            const taskAProp = state.tasks[a][state.sort].toLowerCase();
            const taskBProp = state.tasks[b][state.sort].toLowerCase();
            if (taskAProp > taskBProp) return 1;
            if (taskAProp < taskBProp) return -1;
            return 0;
        });

        keysOrdered.forEach(key => tasksSorted[key] = state.tasks[key]);
        return tasksSorted;
    },
    tasksFiltered: (state, getters) => {
        const tasksSorted = getters.tasksSorted;
        let tasksFiltered = {};

        if (state.search) {
            Object.keys(tasksSorted).forEach(key => {
                if (tasksSorted[key].name.toLowerCase().includes(state.search.toLowerCase())) {
                    tasksFiltered[key] = tasksSorted[key];
                }
            })
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
    },

};

export default {
    namespaced: true,
    state, mutations, actions, getters
}