<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-tabs
          centered
          class="ml-n9"
          color="grey darken-1"
      >
        <v-tab>
          Calendar
        </v-tab>
        <v-tab>
          Statistics
        </v-tab>
      </v-tabs>
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <Calendar/>
    </v-main>
  </v-app>
</template>

<script>
import Calendar from './components/Calendar';

export default {
  name: 'App',

  components: {
    Calendar,
  },

  data: () => ({
    //
  }),
};
</script>
