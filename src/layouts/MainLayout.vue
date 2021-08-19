<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <!-- <q-toolbar class="bg-grey-8">
        <q-toolbar-title> FTEUlator </q-toolbar-title>
      </q-toolbar> -->
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',
});
</script>
