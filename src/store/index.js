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
      state.events.push(event)
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    updateSelectedDate(state, newDate) {
      state.selectedDate = newDate;
    },
    updateCalendarType(state, newType) {
      state.calendarType = newType
    },
    updateEvent(state, event) {
      for (const key in event) {
        state.events[event.id][key] = event[key]
      }
    },
    deleteAll(state) {
      localStorage.removeItem('events') // this doesn't work and idk why
      state.events=null
    },
    deleteEvent() {
      localStorage.removeItem('events') // idk how to delete one event, also this doesn't work either:(
    },
    saveData(state) {
      localStorage.setItem('events', JSON.stringify(state.events));
    },
    initialiseStore(state) {
      // Fetches data stored in the browser when the app is started
      if (localStorage.getItem('events')) {
        try {
          // A really ugly regular expression for modifying the json parser to allow for Date types
          let reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
          JSON.dateParser = function (key, value) {
            if (typeof value === 'string') {
              let arr = reISO.exec(value);
              if (arr)
                return new Date(value);
            }
            return value;
          };
          state.events = JSON.parse(localStorage.getItem('events'), JSON.dateParser);
        } catch(e) {
          localStorage.removeItem('events');
          console.error("Events data failed parsing");
        }
      }
    }
  }
})
