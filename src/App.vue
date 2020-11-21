<template>
  <v-app>
    <AppBar/>
    <v-main class="grey lighten-3">
      <Calendar/>
    </v-main>
  </v-app>
</template>

<script>
import Calendar from './components/Calendar';
import AppBar from './components/AppBar'

export default {
  name: 'App',

  components: {
    Calendar,
    AppBar
  },

  data: () => ({
    //
  }),
};
</script>
