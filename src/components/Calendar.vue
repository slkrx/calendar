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
    <v-row justify='end'>
      <v-btn
        icon
        id="addTaskButton"
        @click="showModal = true"
      >
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <NewTaskWindow
      v-if="showModal"
      @close="showModal = false"
      @addEvent="addEvent"
    />
  </v-container>
</template>

<script>
import CalendarNavigator from './CalendarNavigator'
import NewTaskWindow from './NewTaskWindow.vue'
import CalendarEventShow from './CalendarEventShow'

export default {
  components: {
    CalendarNavigator,
    NewTaskWindow,
    CalendarEventShow
  },
  data: function() {
    return {
      value: new Date().toISOString().substr(0, 10),
      events: [],
      showModal: false,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false
    }
  },
  methods: {
    getEventColor(event) {
      return event.color
    },
    addEvent(name, date, startTime, endTime, color) {
      let startDate = new Date(date + 'T00:00:00');
      let endDate =  new Date(date + 'T00:00:00');
      let [startHour, startMinute] = startTime.split(':');
      let [endHour, endMinute] = endTime.split(':');
      startDate.setHours(startHour);
      startDate.setMinutes(startMinute);
      endDate.setHours(endHour);
      endDate.setMinutes(endMinute);
      this.events.push({name: name,
                        start: startDate,
                        end: endDate,
                        color: color,
                        timed: true
                      });
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
