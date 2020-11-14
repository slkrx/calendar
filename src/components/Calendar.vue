<template>
  <v-row>
    <v-col>
      <v-sheet>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet>
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
</template>

<script>
let start = new Date()
let end = new Date(start)
end.setHours(start.getHours() + 3)

export default {
  data: function() {
    return {
      value: '',
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
