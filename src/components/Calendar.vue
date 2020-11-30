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
              @mousedown:event="startDrag"
              @mousedown:time="startTime"
              @mousemove:time="mouseMove"
              @mouseup:time="endDrag"
              @mouseleave.native="endDrag"
              >
              <template v-slot:event="{ event, timed, eventSummary }">
                <div
                  v-html="eventSummary()"
                  style="margin-left: 4px;"
                ></div>
                <div
                  v-if="timed"
                  style="position: absolute;
                         display: block;
                         cursor: ns-resize;
                         bottom: 4px;
                         height: 6px;
                         left: 50%;
                         border-top: 1px solid white;
                         border-bottom: 1px solid white;
                         width: 16px;
                         margin-left: -8px;
                         opacity: 0.8;
                         content: '';"
                  @mousedown.stop="extendBottom(event)"
                ></div>
                <v-btn
                  @click="showEvent({ nativeEvent: $event, event: event })"
                  rounded
                  small
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-calendar>
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
      selectedOpen: false,
      dragEvent: null,
      dragStart: null,
      extendedEvent: null,
      extendedStart: null
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
    startDrag ({ event, timed }) {
        if (event && timed) {
          this.dragEvent = event
          this.dragTime = null
        }
    },
    startTime (tms) {
      const mouse = this.toTime(tms)

      if (this.dragEvent && this.dragTime === null) {
        const start = this.dragEvent.start
        this.dragTime = mouse - start
      }
    },
    extendBottom (event) {
      this.extendedStart = event.start
      this.extendedEvent = event
    },
    mouseMove (tms) {
      const mouse = this.toTime(tms)
      if (this.dragEvent && this.dragTime !== null) {
        const start = this.dragEvent.start
        const end = this.dragEvent.end
        const duration = end - start
        const newStartTime = mouse - this.dragTime
        const newStart = this.roundTime(newStartTime)
        const newEnd = newStart + duration

        this.dragEvent.start = newStart
        this.dragEvent.end = newEnd
      }
      else if (this.extendedEvent) {
        const mouseRounded = this.roundTime(mouse, false)
        const min = Math.min(mouseRounded, this.extendedStart)
        const max = Math.max(mouseRounded, this.extendedStart)
        this.extendedEvent.start = min
        this.extendedEvent.end = max
      }
    },
    endDrag () {
      this.dragTime = null
      this.dragEvent = null
      this.extendedEvent = null
      this.saveData()
    },
    roundTime (time, down = true) {
      const roundTo = 15 // minutes
      const roundDownTime = roundTo * 60 * 1000

      return down
        ? time - time % roundDownTime
        : time + (roundDownTime - (time % roundDownTime))
    },
    toTime (tms) {
      return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
    },
    ...mapMutations([
      'createEvent',
      'updateSelectedDate',
      'saveData'
    ])
  },
  mounted: function() {
    this.$refs.calendar.scrollToTime('06:00')
  }
}
</script>
