<template>
  <q-select
    label="Sort by"
    v-model="sortBy"
    :options="options"
    class="col q-select"
    map-options
    emit-value
    outlined
    stack-label
    filled
  />
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      options: [
        { label: "Name", value: "name" },
        { label: "Date", value: "dueDate" },
      ],
    };
  },
  computed: {
    ...mapState("tasks", ["sort"]),
    sortBy: {
      get() {
        return this.sort;
      },
      set(val) {
        console.log("sett");
        this.setSort(val);
      },
    },
  },
  methods: {
    ...mapActions("tasks", ["setSort"]),
  },
};
</script>

<style >
.q-select {
  flex: 0 0 112px;
}
</style>