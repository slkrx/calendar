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
            v-on:click:event="showEvent"
          ></v-calendar>
          <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
          >
            <CalendarEventShow
              v-bind.sync="selectedEvent"
              v-bind:selectedOpen.sync="selectedOpen"
            />
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CalendarNavigator from './CalendarNavigator'
import CalendarEventShow from './CalendarEventShow'

let start = new Date()
start.setHours(1)
let end = new Date(start)
end.setHours(start.getHours() + 3)

export default {
  components: {
    CalendarNavigator,
    CalendarEventShow
  },
  data: function() {
    return {
      value: new Date().toISOString().substr(0, 10),
      events: [
        {
          name: 'event',
          start: start,
          end: end,
          color: 'orange',
          timed: true,
          description: 'this is an event'
        },
        {
          name: 'Walk the dog',
          start: new Date("November 17, 2020 2:00:00"),
          end: new Date("November 17, 2020 3:00:00"),
          color: 'blue',
          timed: true,
          description: 'After you feed her you need to take her out.'
        }
      ],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false
    }
  },
  methods: {
    getEventColor(event) {
      return event.color
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    }
  }
}
</script>
