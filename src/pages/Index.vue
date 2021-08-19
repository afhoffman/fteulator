<template>
  <!-- <div class="column justify-evenly q-pa-md"> -->
  <div class="q-pa-md">
    <div class="row justify-around">
      <q-card class="col col-lg-4 q-mr-sm">
        <div class="text-h6 text-center q-mb-sm">FTEUlator</div>
        <q-separator class="q-mb-md" />
        <q-card-section>
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
  <!-- </div> -->
</template>


<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
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
    format: (i: number) => `${(Math.round(i * 1000) / 1000).toFixed(3)}`,
  },
];

type DurationOption = {
  label: string;
  numHours: number;
};

const durationOptions: DurationOption[] = [
  { label: 'year(s)', numHours: 2080 },
  { label: 'month(s)', numHours: 2080 / 12 },
  { label: 'week(s)', numHours: 2080 / 52 },
  { label: 'sprint(s)', numHours: 2080 / (52 / 2) },
];

export default defineComponent({
  name: 'PageIndex',
  setup() {
    const $q = useQuasar();
    const items = ref<Task[]>([]);

    const taskDurationMeta = ref(durationOptions[0]);
    const taskDuration = ref(1);
    const totalTaskDuration = computed(() => {
      return taskDurationMeta.value.numHours * taskDuration.value;
    });

    // const

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
          case 'sprint':
            fteSubtotal *= 26;
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

    const totalFTEOverPoP = computed(() => {
      const interm =
        (parseFloat(totalFTE.value) * totalTaskDuration.value) / 2080;
      return (Math.round(interm * 1000) / 1000).toFixed(3);
    });

    const addTaskDialog = () => {
      $q.dialog({ component: AddTask }).onOk((newTask: Task) => {
        items.value.push(newTask);
        console.log('from indec', newTask);
      });
    };

    watch(
      () => {
        return [taskDurationMeta.value, taskDuration.value];
      },
      () => {
        resultItems.value.map((i) => {
          console.log(i.fteSubtotal);
        });
        // console.log('bingo');
      }
    );

    return {
      items,
      listColumns,
      addTaskDialog,
      resultItems,
      totalFTE,
      durationOptions,
      taskDurationMeta,
      taskDuration,
      totalFTEOverPoP,
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