import { LocalStorage, Loading } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
import firebase from "firebase/app";
import { Notify } from "quasar";

const state = {
  loggedIn: false
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  }
};

const actions = {
  registerUser({}, payload) {
    Loading.show();
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.info("response: ", response);
      })
      .catch(err => {
        showErrorMessage(err.message);
        console.error("error message: ", err.message);
      });
  },
  loginUser({}, payload) {
    Loading.show();

    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.info("response: ", response);
      })
      .catch(err => {
        showErrorMessage(err.message);
        console.error("error message: ", err.message);
      });
  },
  logoutUser() {
    firebaseAuth.signOut();
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide();
      if (user) {
        commit("setLoggedIn", true);
        LocalStorage.set("loggedIn", true);
        this.$router.push("/").catch(err => {});
        dispatch("tasks/fbReadData", null, { root: true });
      } else {
        commit("tasks/clearTasks", null, { root: true });
        commit("tasks/setTasksDownloaded", false, { root: true });
        commit("setLoggedIn", false);
        LocalStorage.set("loggedIn", false);
        this.$router.replace("/auth").catch(err => {});
      }
    });
  },

  async changePassword({}, payload) {
    const user = firebaseAuth.currentUser;
    console.log({ payload });
    actions
      .reAuthenticateWithCredential(payload.currentPassword)
      .then(response => {
        user
          .updatePassword(payload.newPassword)
          .then(response => {
            Notify.create("Password is changed");
          })
          .catch(err => {
            showErrorMessage(err.message);
          });
      })
      .catch(err => {
        console.error(err);
        showErrorMessage("You current password is incorrect");
      });
  },

  reAuthenticateWithCredential(currentPassword) {
    const user = firebaseAuth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return user.reauthenticateWithCredential(credential);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
