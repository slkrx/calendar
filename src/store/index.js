import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    selectedDate: new Date().toISOString().substr(0, 10),
    calendarType: 'week'
  },
  mutations: {
    createEvent(state, event) {
      event.id = state.events.length
      state.events.push(event)
    },
    updateSelectedDate(state, newDate) {
      state.selectedDate = newDate
    },
    updateCalendarType(state, newType) {
      state.calendarType = newType
    },
    updateEvent(state, event) {
      for (const key in event) {
        state.events[event.id][key] = event[key]
      }
    }
  }
})
