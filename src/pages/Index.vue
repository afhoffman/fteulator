<template>
  <!-- <div class="column justify-evenly q-pa-md"> -->
  <div class="q-pa-md">
    <!-- <div class="row justify-around q-pb-sm">
      <q-card>
        <q-card-section>hi</q-card-section>
      </q-card>
    </div> -->
    <div class="row justify-around">
      <q-card class="col q-mr-sm">
        <q-card-section>
          <div class="text-h6 text-center q-mb-sm">Task List</div>
          <q-separator class="q-mb-sm" />
          <q-table
            :rows="items"
            :columns="columns"
            hide-bottom
            row-key="name"
            class="q-pb-none"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click="addTaskDialog" icon="add" flat round color="primary" />
        </q-card-actions>
      </q-card>
      <q-card class="col q-ml-sm">
        <q-card-section>
          <div class="text-h6 text-center">FTE Totals</div></q-card-section
        >
      </q-card>
    </div>
  </div>
  <!-- </div> -->
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Task } from 'src/models/task';
import AddTask from 'src/components/dialogs/AddTask.vue';
import { useQuasar } from 'quasar';

const columns = [
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
    sortable: true,
  },
  {
    name: 'hrs',
    label: 'Time (hr)',
    field: 'hrs',
    sortable: true,
  },
  {
    name: 'repeats',
    align: 'right',
    label: 'Frequency',
    field: 'repeatFrequency',
    sortable: true,
  },
];

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $q = useQuasar();
    const items = ref<Task[]>([
      { name: 'Test 1', repeatFrequency: 'day', hrs: 0.5 },
      { name: 'Test 2', repeatFrequency: 'week', hrs: 3 },
    ]);

    const addTaskDialog = () => {
      $q.dialog({ component: AddTask }).onOk((newTask: Task) => {
        items.value.push(newTask);
        console.log('from indec', newTask);
      });
    };

    return {
      items,
      columns,
      addTaskDialog,
    };
  },
});
</script>

<style lang="scss">
.q-card {
  background-color: $grey-1;
  color: $grey-8;
}
</style>