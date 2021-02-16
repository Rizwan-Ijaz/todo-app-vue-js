import Vue from "vue";
const state = {
    tasks: {
        'ID1': {
            name: "Go to shop",
            dueDate: "17-02/2021",
            dueTime: "18:20",
            completed: false,
        },
        'ID2': {
            name: "Get bananas",
            dueDate: "17-02/2021",
            dueTime: "18:30",
            completed: false,
        },
        'ID3': {
            name: "Get apples",
            dueDate: "17-02/2021",
            dueTime: "18:40",
            completed: false,
        }
    }
    // tasks: [
    //     {
    //         id: 1,
    //         name: "Go to shop",
    //         dueDate: "17-02/2021",
    //         dueTime: "18:20",
    //         completed: false,
    //     },
    //     {
    //         id: 2,
    //         name: "Get bananas",
    //         dueDate: "17-02/2021",
    //         dueTime: "18:30",
    //         completed: false,
    //     },
    //     {
    //         id: 3,
    //         name: "Get apples",
    //         dueDate: "17-02/2021",
    //         dueTime: "18:40",
    //         completed: false,
    //     },
    // ],
};

const mutations = {
    updateTask(state, payload) {
        console.log({ payload })
        Object.assign(state.tasks[payload.id], payload.updates)
    },
    deleteTask(state, id) {
        console.log({ id });
        Vue.delete(state.tasks, id)
    }
};

const actions = {
    updateTask({ commit }, payload) {
        commit('updateTask', payload);
    },
    deleteTask({ commit }, id) {
        commit('deleteTask', id);
    }
};

const getters = {
    tasks: (state) => state.tasks
};

export default {
    namespaced: true,
    state, mutations, actions, getters
}