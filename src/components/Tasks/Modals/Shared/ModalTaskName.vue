<template>
  <div class="row q-mb-sm">
    <q-input
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[(val) => !!val || 'Field is required']"
      ref="name"
      class="col"
      label="Task name"
      v-select-all
      autofocus
      outlined
    >
      <template v-slot:append>
        <q-icon
          v-if="name"
          @click="$emit('update:name', '')"
          class="cursor-pointer"
          name="close"
        />
      </template>
    </q-input>
  </div>
</template>

<script>
import { selectAll } from "src/directives/directive-select-all";
export default {
  props: ["name"],
  directives: {
    selectAll,
  },
};
</script>