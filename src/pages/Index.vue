<template>
  <!-- <div class="column justify-evenly q-pa-md"> -->
  <div class="q-pa-md">
    <div class="row justify-around">
      <q-card class="col col-lg-4 q-mr-sm">
        <div class="text-h6 text-center q-mb-sm">FTEUlator</div>
        <q-separator class="q-mb-md" />
        <q-card-section>
          <q-input label="Project/duty Title" v-model="projectTitle" />
          <div class="row items-center">
            <div class="col">
              <q-input
                label="Task Duration"
                type="number"
                v-model="taskDuration"
              />
            </div>
            <div class="col">
              <q-select :options="durationOptions" v-model="taskDurationMeta" />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-section class="q-pa-none q-ma-none" v-if="items.length">
            <q-table
              :rows="items"
              :columns="listColumns"
              hide-bottom
              row-key="id"
              class="q-pb-none"
            />
          </q-card-section>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn @click="addTaskDialog" label="Add Task" flat color="primary" />
        </q-card-actions>
        <q-card-section v-if="items.length">
          <div class="row items-center justify-evenly">
            <div class="row">
              <div class="text-h5">Total FTE:</div>
              <div class="text-h6 q-ml-md">{{ totalFTE }}</div>
            </div>
            <div class="row">
              <div class="text-h5">FTE over PoP:</div>
              <div class="text-h6 q-ml-md">{{ totalFTEOverPoP }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { RepFreq, TaskItem } from 'src/models/task';
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
    field: 'totFTE',
    format: (i: number) => `${(Math.round(i * 1000) / 1000).toFixed(3)}`,
  },
  {
    name: 'FTE - PoP',
    label: 'FTE - PoP',
    sortable: true,
    field: 'totFTEOverPoP',
    format: (i: number) => `${(Math.round(i * 1000) / 1000).toFixed(3)}`,
  },
];

type DurationOption = {
  tag: RepFreq;
  label: string;
  numHours: number;
};

const durationOptions: DurationOption[] = [
  { tag: 'year', label: 'year(s)', numHours: 2080 },
  { tag: 'month', label: 'month(s)', numHours: 2080 / 12 },
  { tag: 'week', label: 'week(s)', numHours: 2080 / 52 },
  { tag: 'sprint', label: 'sprint(s)', numHours: 2080 / (52 / 2) },
  { tag: 'day', label: 'day(s)', numHours: 8 },
];

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $q = useQuasar();
    const items = ref<TaskItem[]>([]);
    const projectTitle = ref('');

    // Accept task duration params, calc total task duration in hours
    const taskDurationMeta = ref(durationOptions[0]);
    const taskDuration = ref(1);

    const totalTaskDuration = computed(() => {
      return taskDurationMeta.value.numHours * taskDuration.value;
    });

    // Iterate over the list of objects and sum up the totalFTE and FTEOverPoP
    const totalFTE = computed(() => {
      return items.value.reduce((acc, current) => acc + current.totFTE, 0);
    });

    const totalFTEOverPoP = computed(() => {
      return items.value.reduce(
        (acc, current) => acc + current.totFTEOverPoP,
        0
      );
    });

    const addTaskDialog = () => {
      $q.dialog({ component: AddTask }).onOk((newTask: TaskItem) => {
        // Need to set current PoP when a new task is added, defaults to 1 year
        newTask.PoP = totalTaskDuration.value;
        items.value.push(newTask);
      });
    };

    // Update the PoP on all the items when PoP changes
    watch(
      () => {
        return [taskDurationMeta.value, taskDuration.value];
      },
      () => {
        items.value.map((i) => {
          i.PoP = totalTaskDuration.value;
        });
      }
    );

    return {
      items,
      listColumns,
      addTaskDialog,
      totalFTE,
      totalFTEOverPoP,
      durationOptions,
      taskDurationMeta,
      taskDuration,
      projectTitle,
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