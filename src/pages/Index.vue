<template>
  <!-- <div class="column justify-evenly q-pa-md"> -->
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <q-card data-cy="index-main-card" class="col col-lg-6">
        <div class="text-h6 text-center q-mb-sm" data-cy="main-card-title">
          FTE-ulator
        </div>
        <q-separator class="q-mb-md" />
        <q-card-section class="q-mt-none q-pt-none">
          <q-input
            label="Project Title"
            data-cy="index-project-title"
            v-model="projectTitle"
          />
          <div class="row items-center">
            <div class="col q-mr-sm">
              <q-input
                label="Project Duration"
                data-cy="index-project-duration"
                type="number"
                hide-bottom-space
                v-model="taskDuration"
              />
            </div>
            <div class="col q-ml-sm">
              <q-select
                label-slot
                data-cy="index-project-meta-select"
                :options="durationOptions"
                v-model="taskDurationMeta"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section v-if="items.length">
          <div class="row items-center justify-center">
            <div class="col text-center">
              <div class="text-h5">FTE</div>
              <div class="text-h6" data-cy="index-total-fte-over-pop">
                {{ formattedTotalFTEOverPoP() }}
              </div>
            </div>
            <div class="col text-center">
              <div class="text-h5">Max FTE</div>
              <div class="text-h6" data-cy="index-max-fte-over-pop">
                {{ formattedMaxFTEOverPoP() }}
              </div>
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
              @row-click="handleRowClick"
              data-cy="index-result-table"
            />
          </q-card-section>
        </q-card-section>
        <q-card-actions align="center" class="justify-center">
          <q-btn
            v-if="showReset"
            @click="handleReset"
            data-cy="index-reset-button"
            flat
            color="negative"
            label="Reset"
          />
          <q-btn
            @click="addTaskDialog"
            data-cy="add-task-button"
            label="Add Task"
            flat
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>


<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { RepFreq, TaskItem } from 'src/models/task';
import AddTask from 'src/components/dialogs/AddTask.vue';
import { useQuasar } from 'quasar';

const filterLowNumber = (i: number) => {
  const interm = (Math.round(i * 1000) / 1000).toFixed(3);
  if (parseFloat(interm)) {
    return interm;
  } else {
    return '< 0.1%';
  }
};
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
    format: filterLowNumber,
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
    label: 'FTE - 1yr',
    sortable: true,
    field: 'totFTE',
    format: filterLowNumber,
  },
  {
    name: 'FTE',
    label: 'FTE',
    sortable: true,
    field: 'totFTEOverPoP',
    format: filterLowNumber,
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
      $q.dialog({ component: AddTask }).onOk(
        ({ newTask }: { newTask: TaskItem }) => {
          // Need to set current PoP when a new task is added, defaults to 1 year
          newTask.PoP = totalTaskDuration.value;
          items.value.push(newTask);
        }
      );
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

    const handleRowClick = (evt: unknown, row: TaskItem) => {
      $q.dialog({ component: AddTask, componentProps: { taskItem: row } }).onOk(
        (res: { deleteTask: boolean }) => {
          if (res.deleteTask) {
            items.value = items.value.filter((item) => {
              return item.id !== row.id;
            });
          }
        }
      );
    };

    const handleReset = () => {
      $q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to reset the FTEUlator?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        taskDuration.value = 1;
        taskDurationMeta.value = durationOptions[0];
        projectTitle.value = '';
        items.value = [];
      });
    };

    const showReset = computed(() => {
      return (
        items.value.length !== 0 ||
        projectTitle.value !== '' ||
        taskDuration.value !== 1 ||
        taskDurationMeta.value.tag !== durationOptions[0].tag
      );
    });

    return {
      items,
      listColumns,
      addTaskDialog,
      formattedTotalFTE() {
        return filterLowNumber(totalFTE.value);
      },
      formattedTotalFTEOverPoP() {
        return filterLowNumber(totalFTEOverPoP.value);
      },
      formattedMaxFTEOverPoP() {
        return filterLowNumber(totalTaskDuration.value / 2080);
      },
      durationOptions,
      taskDurationMeta,
      taskDuration,
      projectTitle,
      handleRowClick,
      handleReset,
      showReset,
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