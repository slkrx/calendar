<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet elevation="10">
          <CalendarNavigator
            @timeTravelPrev="$refs.calendar.prev()"
            @timeTravelNext="$refs.calendar.next()"
          />
          <v-sheet
            height="70vh"
            style="position: relative;"
          >
            <v-calendar
              ref="calendar"
              v-bind:type="calendarType"
              v-bind:events="events"
              v-bind:value="selectedDate"
              @input="updateSelectedDate($event)"
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
                v-bind="selectedEvent"
                v-bind:selectedOpen.sync="selectedOpen"
              />
            </v-menu>
            <v-btn
              id="addTaskButton"
              @click="showModal = true"
              fab
              absolute
              bottom
              right
              color="teal"
              dark
              elevation="5"
              large
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-sheet>
        </v-sheet>
      </v-col>
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
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    CalendarNavigator,
    NewTaskWindow,
    CalendarEventShow
  },
  data: function() {
    return {
      showModal: false,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false
    }
  },
  computed: {
    ...mapState([
      'events',
      'selectedDate',
      'calendarType'
    ])
  },
  methods: {
    getEventColor(event) {
      if (event.completed) {
        const rgb = parseInt(event.color.substring(1), 16)
        const r = (rgb >> 16) & 0xFF
        const g = (rgb >> 8) & 0xFF
        const b = (rgb >> 0) & 0xFF
        return `rgba(${r}, ${g}, ${b}, 0.5)`
      } else {
        return event.color
      }
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
      this.createEvent({name: name,
                        start: startDate,
                        end: endDate,
                        color: color,
                        timed: true,
                        description: '',
                        completed: false
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
    },
    ...mapMutations([
      'createEvent',
      'updateSelectedDate'
    ])
  },
  mounted: function() {
    this.$refs.calendar.scrollToTime('06:00')
  }
}
</script>
