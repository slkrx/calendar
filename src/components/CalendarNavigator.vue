<template>
    <v-toolbar
      flat
      color="grey lighten-5"
    >
      <template v-if="itIsToday">
        <v-btn
          @click="updateSelectedDate(new Date().toISOString().substr(0, 10))"
          outlined
          color="primary"
        >
          Today
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          @click="updateSelectedDate(new Date().toISOString().substr(0, 10))"
          color="primary"
          dark
          depressed
        >
          Today
        </v-btn>
      </template>
      <v-btn
        icon
        class="ma-2"
        @click="$emit('timeTravelPrev')"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        class="ma-2"
        @click="$emit('timeTravelNext')"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-menu
        v-model="isMenuOpen"
        transition="scale-transition"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-bind:value="formattedDate"
              readonly
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              hide-details
              single-line
            ></v-text-field>
        </template>
        <v-date-picker
            v-bind:value="selectedDate"
            @input="updateSelectedDate($event); isMenuOpen = false"
        />
      </v-menu>
      <v-spacer></v-spacer>
      <v-menu
        bottom
        right
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="grey darken-2"
            v-bind="attrs"
            v-on="on"
          >
            <span>{{ calendarType }}</span>
            <v-icon right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
          <v-list>
            <v-list-item @click="updateCalendarType('day')">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateCalendarType('week')">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="updateCalendarType('month')">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    data: function() {
        return {
            isMenuOpen: false
        }
    },
    computed: {
      formattedDate() {
        return this.$moment(this.selectedDate).format('dddd, MMMM Do YYYY')
      },
      itIsToday() {
        return this.selectedDate == new Date().toISOString().substr(0, 10)
      },
      ...mapState([
        'selectedDate',
        'calendarType'
      ])
    },
    methods: {
      ...mapMutations([
        'updateSelectedDate',
        'updateCalendarType'
      ])
    }
}
</script>