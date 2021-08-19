<template>
  <!-- <div class="column justify-evenly q-pa-md"> -->
  <div class="q-pa-md">
    <div class="row justify-around">
      <q-card class="col col-lg-4 q-mr-sm">
        <q-card-section>
          <div class="text-h6 text-center q-mb-sm">FTEUlator</div>
          <q-separator class="q-mb-md" />
          <q-card-section class="q-pa-none q-ma-none" v-if="resultItems.length">
            <q-table
              :rows="resultItems"
              :columns="listColumns"
              hide-bottom
              row-key="name"
              class="q-pb-none"
            />
          </q-card-section>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn @click="addTaskDialog" label="Add Task" flat color="primary" />
        </q-card-actions>
        <q-card-section v-if="resultItems.length">
          <div class="row items-center justify-center">
            <div class="text-h5">Total FTE:</div>
            <div class="text-h6 q-ml-md">{{ totalFTE }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <!-- </div> -->
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { Task, ResultTask } from 'src/models/task';
import AddTask from 'src/components/dialogs/AddTask.vue';
import { useQuasar } from 'quasar';

const listColumns = [
  {
    name: 'name',
    align: 'left',
    label: 'Task',
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
  {
    name: 'FTE',
    label: 'FTE',
    sortable: true,
    field: 'fteSubtotal',
    format: (i: number) => `${(Math.round(i * 100) / 100).toFixed(3)}`,
  },
];

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $q = useQuasar();
    const items = ref<Task[]>([
      // { name: 'Test 1', repeatFrequency: 'day', hrs: 4 },
      // { name: 'Test 2', repeatFrequency: 'week', hrs: 3 },
    ]);

    const resultItems = computed<ResultTask[]>(() => {
      const r: ResultTask[] = [];
      items.value.forEach((i) => {
        let fteSubtotal = i.hrs;

        switch (i.repeatFrequency) {
          case 'day':
            fteSubtotal *= 5 * 52;
            break;
          case 'week':
            fteSubtotal *= 52;
            break;
          case 'month':
            fteSubtotal *= 12;
            break;
          default:
            break;
        }

        fteSubtotal /= 2080;
        fteSubtotal = parseFloat(
          (Math.round(fteSubtotal * 100) / 100).toFixed(2)
        );
        r.push({ ...i, fteSubtotal });
      });
      return r;
    });

    const totalFTE = computed(() => {
      let total = 0;
      resultItems.value.forEach((i) => {
        total += i.fteSubtotal;
      });

      return (Math.round(total * 100) / 100).toFixed(3);
    });

    const addTaskDialog = () => {
      $q.dialog({ component: AddTask }).onOk((newTask: Task) => {
        items.value.push(newTask);
        console.log('from indec', newTask);
      });
    };

    return {
      items,
      listColumns,
      addTaskDialog,
      resultItems,
      totalFTE,
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