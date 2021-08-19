<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="q-pb-none">
        <div class="text-h6">New task</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form>
          <q-input v-model="newTask.name" label="Name" />
          <div class="row justify-between">
            <q-input v-model="hrs" type="number" label="hours" />
            <q-input v-model="mins" type="number" label="minutes" />
          </div>
          <q-select
            label="per"
            :options="dateOptions"
            v-model="newTask.repeatFrequency"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { Task } from 'src/models/task';

const dateOptions = ['day', 'week', 'month', 'year', 'sprint'];

export default defineComponent({
  props: {
    // ...your custom props
  },

  emits: [
    // REQUIRED; need to specify some events that your
    // component will emit through useDialogPluginComponent()
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    const newTask = ref<Partial<Task>>({ repeatFrequency: 'day' });
    const hrs = ref<string>('0');
    const mins = ref<string>('0');

    // REQUIRED; must be called inside of setup()
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();
    // dialogRef      - Vue ref to be applied to QDialog
    // onDialogHide   - Function to be used as handler for @hide on QDialog
    // onDialogOK     - Function to call to settle dialog with "ok" outcome
    //                    example: onDialogOK() - no payload
    //                    example: onDialogOK({ /*.../* }) - with payload
    // onDialogCancel - Function to call to settle dialog with "cancel" outcome

    return {
      // This is REQUIRED;
      // Need to inject these (from useDialogPluginComponent() call)
      // into the vue scope for the vue html template
      dialogRef,
      onDialogHide,

      // other methods that we used in our vue html template;
      // these are part of our example (so not required)
      onOKClick() {
        newTask.value.hrs = parseFloat(hrs.value) + parseFloat(mins.value) / 60;
        newTask.value.hrs = parseFloat(newTask.value.hrs.toPrecision(3));
        console.log(newTask.value);
        // on OK, it is REQUIRED to
        // call onDialogOK (with optional payload)
        onDialogOK(newTask.value);
        // or with payload: onDialogOK({ ... })
        // ...and it will also hide the dialog automatically
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
      newTask,
      dateOptions,
      hrs,
      mins,
    };
  },
});
</script>