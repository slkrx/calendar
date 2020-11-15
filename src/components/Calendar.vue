<template>
  <v-container>
    <CalendarNavigator
      @timeTravelPrev="$refs.calendar.prev()"
      @timeTravelNext="$refs.calendar.next()"
      v-bind:value.sync="value"
    />
    <v-row>
      <v-col>
        <v-sheet>
          <v-calendar
            ref="calendar"
            type="week"
            v-bind:events="events"
            v-model="value"
            v-bind:event-color="getEventColor"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CalendarNavigator from './CalendarNavigator'

let start = new Date()
let end = new Date(start)
end.setHours(start.getHours() + 3)

export default {
  components: { CalendarNavigator },
  data: function() {
    return {
      value: new Date().toISOString().substr(0, 10),
      events: [
        {
          name: 'this is an event',
          start: start,
          end: end,
          color: 'orange',
          timed: true
        }
      ]
    }
  },
  methods: {
    getEventColor(event) {
      return event.color
    }
  }
}
</script>
