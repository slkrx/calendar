<template>
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
        <v-tab @click="showCalendar">
          Calendar
        </v-tab>
        <v-tab @click="showStatistics">
          Statistics
        </v-tab>
      </v-tabs>
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>
</template>

<script>
export default {
  methods: {
    showCalendar() {
      if (this.$router.currentRoute.name != 'Calendar') {
        this.$router.push({ name: 'Calendar' })
      }
    },
    showStatistics() {
      if (this.$router.currentRoute.name != 'Statistics') {
        this.$router.push({ name: 'Statistics' })
      }
    }
  }
}
</script>